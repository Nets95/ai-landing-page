# Deployment Runbook: AI Engineer Portfolio Landing Page

**Feature**: 001-ai-engineer-landing
**Created**: 2026-01-27
**Status**: Production Ready
**Target Platforms**: Vercel (recommended), Netlify, Static Hosting

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Pre-Deployment Checklist](#pre-deployment-checklist)
4. [Deployment Methods](#deployment-methods)
   - [Vercel Deployment](#vercel-deployment-recommended)
   - [Netlify Deployment](#netlify-deployment)
   - [Static Export](#static-export-for-other-hosts)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Rollback Procedure](#rollback-procedure)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18.17+ or 20.0+ installed
- [ ] npm 9.0+ or pnpm 8.0+ installed
- [ ] Git repository access
- [ ] SendGrid account with API key (for contact form)
- [ ] Verified sender email in SendGrid
- [ ] All Phase 2 quality gates passed (T129-T137)
- [ ] Production build tested locally

**Tools Required**:
- Vercel CLI: `npm i -g vercel` (for Vercel deployment)
- Netlify CLI: `npm i -g netlify-cli` (for Netlify deployment)

---

## Environment Variables

### Required Environment Variables

Create these environment variables in your deployment platform:

```bash
# SendGrid Email Configuration (REQUIRED for contact form)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Email Recipients
CONTACT_EMAIL=your@email.com

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-deployed-domain.com
```

### SendGrid Setup Steps

1. **Create SendGrid Account**:
   - Go to [SendGrid.com](https://sendgrid.com/)
   - Sign up for free account (100 emails/day)

2. **Generate API Key**:
   - Navigate to Settings → API Keys
   - Click "Create API Key"
   - Choose "Full Access" or "Mail Send" permission
   - Copy the API key immediately (shown only once)

3. **Verify Sender Email**:
   - Navigate to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Enter your email address (SENDGRID_FROM_EMAIL)
   - Check your inbox and click verification link
   - Wait for verification confirmation

4. **Test Email Sending** (Optional but Recommended):
   - Use SendGrid's API testing tool
   - Send a test email to confirm setup
   - Verify email is received and not in spam

### Environment Variable Security

**CRITICAL**: Never commit environment variables to Git!

- ✅ `.env.local` is in `.gitignore` (local development)
- ✅ `.env.example` template provided (without secrets)
- ✅ Production secrets stored in platform's secret manager
- ❌ Never use `.env` for sensitive data
- ❌ Never log API keys in console or errors

---

## Pre-Deployment Checklist

### Code Quality & Tests

Run these commands before deploying:

```bash
# Type check
npm run type-check
# Expected: No TypeScript errors

# Linting
npm run lint
# Expected: No linting errors

# Format check
npm run format:check
# Expected: All files properly formatted

# Build production
npm run build
# Expected: Build succeeds without errors

# Test production build locally
npm start
# Expected: App runs on http://localhost:3000
```

### Quality Gates (from Phase 2)

Verify all quality gates passed:

- [ ] T129: Confetti animation implemented and tested
- [ ] T130: Keyboard navigation fully functional
- [ ] T131: Screen reader compatibility verified
- [ ] T132: Responsive design tested on all breakpoints
- [ ] T133: Lighthouse score > 90 on all categories
- [ ] T134: Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] T135: WCAG 2.1 AA compliance - 0 critical/serious violations
- [ ] T136: Contact form E2E test passed in staging
- [ ] T137: All user story acceptance scenarios passed

### Content Validation

- [ ] All portfolio projects have correct data (titles, descriptions, images)
- [ ] All technology items have correct names and categories
- [ ] Hero section content is finalized
- [ ] Contact form email recipient is correct
- [ ] All images optimized (WebP/AVIF format)
- [ ] No placeholder content remains

---

## Deployment Methods

### Vercel Deployment (Recommended)

**Why Vercel**: Built by Next.js creators, zero-config deployment, automatic performance optimization, CDN, SSL, preview deployments.

#### Initial Setup

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Link Project** (first time only):
```bash
cd /path/to/ai-landing
vercel
```
- Select "Link to existing project" or "Create new project"
- Follow prompts to configure
- Project will be linked to your Vercel account

#### Configure Environment Variables in Vercel

**Option 1: Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add each environment variable:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `SENDGRID_FROM_EMAIL`: Your verified sender email
   - `CONTACT_EMAIL`: Where to receive contact form submissions
   - `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., https://yourname.vercel.app)
5. Choose environments: Production, Preview, Development (usually Production only for secrets)
6. Click "Save"

**Option 2: Vercel CLI**
```bash
vercel env add SENDGRID_API_KEY production
# Paste your API key when prompted

vercel env add SENDGRID_FROM_EMAIL production
# Enter: noreply@yourdomain.com

vercel env add CONTACT_EMAIL production
# Enter: your@email.com

vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://yourname.vercel.app
```

#### Deploy to Production

```bash
# Deploy to production
vercel --prod

# Vercel will:
# 1. Build your application
# 2. Run optimizations
# 3. Deploy to CDN
# 4. Provide production URL
```

**Expected Output**:
```
✔ Production: https://yourname.vercel.app [1m 23s]
```

#### Automatic Deployments

Connect GitHub repository for automatic deployments:

1. Go to Vercel Dashboard → Project Settings → Git
2. Connect your GitHub repository
3. Every push to `main` branch = production deployment
4. Every pull request = preview deployment with unique URL

---

### Netlify Deployment

**Why Netlify**: Excellent static hosting, automatic builds, form handling, split testing, serverless functions support.

#### Initial Setup

1. **Install Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Initialize Project**:
```bash
cd /path/to/ai-landing
netlify init
```
- Select "Create & configure a new site"
- Choose team
- Enter site name (or leave blank for random)
- Build command: `npm run build`
- Publish directory: `.next`

#### Configure Environment Variables in Netlify

**Option 1: Netlify Dashboard**
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Navigate to Site Settings → Environment Variables
4. Click "Add a variable"
5. Add each environment variable:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `SENDGRID_FROM_EMAIL`: Your verified sender email
   - `CONTACT_EMAIL`: Where to receive contact form submissions
   - `NEXT_PUBLIC_APP_URL`: Your production URL
6. Choose scopes: Production (default)
7. Click "Save"

**Option 2: Netlify CLI**
```bash
netlify env:set SENDGRID_API_KEY "your-api-key-here"
netlify env:set SENDGRID_FROM_EMAIL "noreply@yourdomain.com"
netlify env:set CONTACT_EMAIL "your@email.com"
netlify env:set NEXT_PUBLIC_APP_URL "https://yoursite.netlify.app"
```

#### Deploy to Production

```bash
# Deploy to production
netlify deploy --prod

# Netlify will:
# 1. Build your application
# 2. Deploy to CDN
# 3. Provide production URL
```

**Expected Output**:
```
✔ Deploy is live!
   https://yoursite.netlify.app
```

#### Continuous Deployment

Connect GitHub repository:

1. Go to Netlify Dashboard → Site Settings → Build & Deploy
2. Link your GitHub repository
3. Configure build settings:
   - Branch: `main` or `001-ai-engineer-landing`
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Install `@netlify/plugin-nextjs` plugin (recommended for Next.js)

---

### Static Export (For Other Hosts)

**Use Case**: AWS S3, GitHub Pages, Cloudflare Pages, or any static hosting.

**IMPORTANT**: Static export disables Next.js API routes. Contact form will NOT work without modification.

#### Modify Configuration for Static Export

1. **Update `next.config.js`**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
```

2. **Alternative Contact Form Solution**:

Since API routes don't work in static export, use **EmailJS** or **Formspree**:

**EmailJS Setup**:
- Sign up at [EmailJS.com](https://www.emailjs.com/)
- Create email service and template
- Update ContactForm to use EmailJS SDK
- No server-side code needed

**Formspree Setup**:
- Sign up at [Formspree.io](https://formspree.io/)
- Create form endpoint
- Update form action to POST to Formspree endpoint
- Simpler but less customizable

#### Build and Export

```bash
# Build static export
npm run build

# Output directory: out/
# Deploy the contents of out/ directory to your host
```

#### Deploy to Common Static Hosts

**AWS S3 + CloudFront**:
```bash
aws s3 sync out/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**GitHub Pages**:
```bash
# Add .nojekyll file to out/ directory
touch out/.nojekyll

# Push out/ directory to gh-pages branch
git subtree push --prefix out origin gh-pages
```

**Cloudflare Pages**:
```bash
# Use Cloudflare Pages dashboard
# Connect GitHub repository
# Build command: npm run build
# Output directory: out
```

---

## Post-Deployment Verification

### Immediate Verification (< 5 minutes)

After deployment, verify the following:

1. **Site Loads**:
   - [ ] Production URL loads without errors
   - [ ] No console errors in browser DevTools
   - [ ] All sections visible (Hero, Tech Showcase, Portfolio, Contact)

2. **Images Load**:
   - [ ] Hero background image loads
   - [ ] Portfolio project screenshots load
   - [ ] Technology logos load
   - [ ] No broken image placeholders

3. **Animations Work**:
   - [ ] Hero section fade-in animation plays
   - [ ] Scroll-triggered animations work (tech showcase, portfolio)
   - [ ] Hover effects on technology cards
   - [ ] Portfolio modal opens and closes smoothly

4. **Contact Form**:
   - [ ] Form fields render correctly
   - [ ] Validation errors display on invalid input
   - [ ] Form submits successfully
   - [ ] Success message with confetti animation appears
   - [ ] Email received at CONTACT_EMAIL address

### Comprehensive Verification (< 30 minutes)

5. **Performance Check**:
```bash
# Run Lighthouse on production URL
npm run lighthouse -- --url=https://your-production-url.com
```
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

6. **Responsive Design**:
- [ ] Test on mobile device (iPhone, Android)
- [ ] Test on tablet (iPad, Android tablet)
- [ ] Test on desktop (1920x1080, 1280x800)
- [ ] No horizontal scroll on any viewport
- [ ] Text readable without zooming

7. **Accessibility**:
- [ ] Keyboard navigation works (Tab through all elements)
- [ ] Focus indicators visible
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] All images have alt text
- [ ] Form labels announced correctly

8. **Cross-Browser Testing**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if on Mac)
- [ ] Edge (latest)

### Verification Checklist

Print and complete this checklist:

```
Deployment Verification Checklist
Date: ___________  Deployed By: ___________

[ ] Site loads at production URL
[ ] No console errors
[ ] All sections visible
[ ] All images load correctly
[ ] Animations play smoothly
[ ] Contact form submits successfully
[ ] Email received from contact form
[ ] Lighthouse Performance > 90
[ ] Lighthouse Accessibility > 90
[ ] Mobile responsive design works
[ ] Keyboard navigation works
[ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

Issues Found: _______________________________
___________________________________________
___________________________________________

Deployment Status: [ ] APPROVED  [ ] ROLLBACK REQUIRED
```

---

## Monitoring & Maintenance

### Performance Monitoring

**Vercel Analytics** (if using Vercel):
- Automatically tracks Core Web Vitals
- Real user monitoring
- Performance insights dashboard
- Access: Vercel Dashboard → Your Project → Analytics

**Google Analytics** (optional):
- Add GA4 tracking code to `src/app/layout.tsx`
- Track user behavior, page views, conversions
- Monitor contact form submissions

### Error Monitoring

**Sentry** (recommended for production):
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Configure in `sentry.config.js`:
- Track runtime errors
- Monitor API errors (contact form failures)
- Get alerts on production issues

### Uptime Monitoring

**UptimeRobot** (free):
- Monitor site uptime
- Alert via email/SMS if site goes down
- Check every 5 minutes
- Setup: [UptimeRobot.com](https://uptimerobot.com/)

### Regular Maintenance Tasks

**Weekly**:
- [ ] Check contact form submissions are being received
- [ ] Review error logs (Sentry/Vercel)
- [ ] Monitor Core Web Vitals trends

**Monthly**:
- [ ] Update npm dependencies (`npm outdated`, `npm update`)
- [ ] Re-run Lighthouse audit
- [ ] Test contact form end-to-end
- [ ] Review and update portfolio projects

**Quarterly**:
- [ ] Major dependency updates (Next.js, React)
- [ ] Security audit (`npm audit`, `npm audit fix`)
- [ ] Performance optimization review
- [ ] Content refresh (portfolio, technologies)

---

## Rollback Procedure

### Vercel Rollback

**Option 1: Vercel Dashboard**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the last working deployment
3. Click "⋯" (three dots) → "Promote to Production"
4. Confirm promotion
5. Previous deployment is now live

**Option 2: Vercel CLI**
```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

**Rollback Time**: < 1 minute

### Netlify Rollback

**Netlify Dashboard**
1. Go to Netlify Dashboard → Your Site → Deploys
2. Find the last working deployment
3. Click "Publish deploy"
4. Confirm publish
5. Previous deployment is now live

**Rollback Time**: < 1 minute

### Git Rollback (for all platforms)

If deployment is broken and you need to rollback code:

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to previous commit (CAUTION: force push)
git reset --hard HEAD~1
git push origin main --force
```

**Trigger automatic re-deployment** on Vercel/Netlify (if connected to Git).

### Emergency Contact Form Disable

If contact form is broken and causing issues:

1. **Temporary Fix**: Comment out Contact section in `src/app/page.tsx`
```typescript
{/* <Contact /> */}
```

2. **Quick Deploy**: Push change to trigger re-deployment

3. **Fix Properly**: Debug contact form issue, test locally, then re-enable

---

## Troubleshooting

### Common Deployment Issues

#### Issue: Build Fails with "Type Error"

**Symptoms**: Deployment fails during build phase with TypeScript errors

**Solution**:
```bash
# Run type check locally
npm run type-check

# Fix all TypeScript errors
# Commit and push
```

#### Issue: Environment Variables Not Working

**Symptoms**: Contact form fails, errors like "SENDGRID_API_KEY is not defined"

**Solution**:
1. Verify environment variables are set in platform (Vercel/Netlify dashboard)
2. Ensure variable names match exactly (case-sensitive)
3. For `NEXT_PUBLIC_*` variables, redeploy after setting (they're embedded at build time)
4. Check `.env.example` for reference

#### Issue: Images Not Loading

**Symptoms**: Broken image placeholders, 404 errors for images

**Solution**:
1. Verify images exist in `public/images/` directory
2. Check image paths are relative to `public/` (e.g., `/images/hero/bg.jpg`)
3. Ensure images are committed to Git
4. Check Next.js image optimization domains in `next.config.js`

#### Issue: Contact Form Emails Not Received

**Symptoms**: Form submits successfully but no email arrives

**Solution**:
1. Check SendGrid API key is correct
2. Verify sender email is verified in SendGrid
3. Check recipient email (CONTACT_EMAIL) is correct
4. Look for email in spam folder
5. Check SendGrid dashboard for delivery logs
6. Test email sending with SendGrid API testing tool

#### Issue: Lighthouse Score Dropped Below 90

**Symptoms**: Performance score < 90 after deployment

**Solution**:
1. Run Lighthouse locally on production build
2. Check for new large dependencies added
3. Verify images are optimized (WebP/AVIF)
4. Check for unoptimized third-party scripts
5. Run bundle analyzer: `npm run analyze`

#### Issue: Site is Slow on Mobile

**Symptoms**: High LCP, slow loading on mobile devices

**Solution**:
1. Test on throttled 3G connection (Chrome DevTools)
2. Optimize images further (reduce sizes, use AVIF)
3. Check for large JavaScript bundles
4. Enable compression (gzip/brotli) on server
5. Consider lazy loading below-the-fold content

#### Issue: Contact Form Rate Limiting Triggered

**Symptoms**: Users see "Too many requests" error

**Solution**:
1. Current limit: 10 requests per IP per hour
2. Increase limit if legitimate traffic: Update `src/app/api/contact/route.ts`
3. Check for spam attacks in server logs
4. Consider adding CAPTCHA if spam is severe

### Debug Mode

Enable verbose logging in production:

```typescript
// src/app/api/contact/route.ts
console.log('Contact form submission:', {
  timestamp: new Date().toISOString(),
  body: data,
  ip: request.headers.get('x-forwarded-for'),
});
```

View logs:
- **Vercel**: Dashboard → Project → Logs
- **Netlify**: Dashboard → Site → Functions → contact

### Getting Help

**Documentation**:
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- SendGrid: [docs.sendgrid.com](https://docs.sendgrid.com)

**Support**:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Netlify Support: [answers.netlify.com](https://answers.netlify.com)
- SendGrid Support: [support.sendgrid.com](https://support.sendgrid.com)

**Community**:
- Next.js Discord: [nextjs.org/discord](https://nextjs.org/discord)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Stack Overflow: Tag `next.js`, `vercel`, `netlify`

---

## Deployment History Log

Keep a record of all production deployments:

| Date | Version | Deployed By | Changes | Status | Rollback? |
|------|---------|-------------|---------|--------|-----------|
| 2026-01-27 | v1.0.0 | Initial | Phase 1 + Phase 2 complete | ✅ Success | No |
| | | | | | |
| | | | | | |

---

## Conclusion

This runbook covers all deployment scenarios for the AI Engineer Portfolio Landing Page. Follow the checklists carefully, verify all quality gates, and monitor the site after deployment.

**Key Takeaways**:
- Vercel is the recommended platform for Next.js apps
- Always test locally with production build before deploying
- Verify all environment variables are set correctly
- Run full quality gate checks (T129-T137) before deployment
- Have rollback plan ready in case of issues
- Monitor site health post-deployment

**Questions or Issues?**
- Check [Troubleshooting](#troubleshooting) section
- Review deployment logs in platform dashboard
- Consult quickstart.md for local development setup
- Refer to specs/001-ai-engineer-landing/ for feature documentation

---

**Document Version**: 1.0.0
**Last Updated**: 2026-01-27
**Maintained By**: Project Team
**Review Schedule**: Monthly or after major changes
