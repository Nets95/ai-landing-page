import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { contactFormSchema } from '@/lib/validations';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 10 requests per hour per IP
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Get user agent for spam detection
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const zodError = validationResult.error;
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: zodError.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email, message, inquiryType } = validationResult.data;

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');

      // Log the submission for development
      console.log('Contact form submission:', {
        name,
        email,
        message,
        inquiryType,
        ip,
        userAgent,
        timestamp: new Date().toISOString(),
      });

      // Return success in development (skip email sending)
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Message received (development mode - email not sent)',
          submissionId: crypto.randomUUID(),
        });
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Email service not configured. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Prepare email content
    const inquiryTypeLabel = inquiryType
      ? {
          consultation: 'Consultation Request',
          project: 'Project Collaboration',
          general: 'General Inquiry',
        }[inquiryType]
      : 'General Inquiry';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(45deg, #3B82F6, #8B5CF6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #6B7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
            .value { color: #111827; font-size: 16px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #3B82F6; border-radius: 4px; margin-top: 10px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">Inquiry Type</div>
                <div class="value">${inquiryTypeLabel}</div>
              </div>

              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

              <div class="footer">
                <p><strong>Metadata</strong></p>
                <p>
                  IP Address: ${ip}<br>
                  User Agent: ${userAgent}<br>
                  Timestamp: ${new Date().toISOString()}
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission

From: ${name}
Email: ${email}
Inquiry Type: ${inquiryTypeLabel}

Message:
${message}

---
Metadata:
IP Address: ${ip}
User Agent: ${userAgent}
Timestamp: ${new Date().toISOString()}
    `;

    // Send email via SendGrid
    await sgMail.send({
      to: process.env.CONTACT_EMAIL || process.env.SENDGRID_FROM_EMAIL || '',
      from: process.env.SENDGRID_FROM_EMAIL || '',
      replyTo: email,
      subject: `New Contact: ${inquiryTypeLabel} from ${name}`,
      text: emailText,
      html: emailHtml,
    });

    // Generate submission ID
    const submissionId = crypto.randomUUID();

    // Log successful submission
    console.log('Contact form submitted successfully:', {
      submissionId,
      name,
      email,
      inquiryType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully! We'll get back to you within 24 hours.",
      submissionId,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle SendGrid-specific errors
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { body?: unknown } };
      console.error('SendGrid error details:', sgError.response?.body);
    }

    return NextResponse.json(
      {
        success: false,
        message:
          'An error occurred while sending your message. Please try again later or contact us directly via email.',
      },
      { status: 500 }
    );
  }
}
