import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Name must only contain letters, spaces, hyphens, and apostrophes'
    ),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  inquiryType: z.enum(['general', 'project', 'consultation']).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
