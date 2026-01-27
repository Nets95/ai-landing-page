# Deployment Guide: AI Engineer Portfolio Landing Page

This guide covers deploying the AI engineer portfolio landing page to production hosting platforms.

## Pre-Deployment Checklist

Before deploying, ensure the following:

- [ ] All tests pass: `npm run build` succeeds
- [ ] ESLint clean: `npm run lint` shows no errors
- [ ] TypeScript validated: `npx tsc --noEmit` passes
- [ ] Environment variables documented
- [ ] Content updated (portfolio projects, technologies)
- [ ] Images optimized (WebP/AVIF format, proper dimensions)
- [ ] Contact form tested locally
- [ ] README.md updated with deployment info

## Option 1: Vercel (Recommended) ⭐

**Best for**: Zero-config Next.js deployments with automatic optimizations

### Why Vercel?

- Built by the Next.js team
- Zero configuration required
- Automatic HTTPS and CDN
- Edge network for global performance
- Preview deployments for every git push
- Built-in analytics and performance monitoring
- Free tier includes:
  - Unlimited personal projects
  - 100 GB bandwidth/month
  - Serverless functions

### Quick Deploy

**Via Web UI** (Easiest):

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com/) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel auto-detects Next.js and configures everything
6. Click "Deploy"
7. Your site is live! 🎉

**Via CLI**:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to your account
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your username/team)
# - Link to existing project? No
# - What's your project's name? ai-landing
# - In which directory is your code located? ./
# - Want to override settings? No

# Deployment complete!
# You'll receive a URL like: https://ai-landing-xyz.vercel.app
```

### Environment Variables

Set environment variables in Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add each variable:
   ```
   SENDGRID_API_KEY=your_actual_api_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=your@email.com
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```
3. Select environment: Production, Preview, Development
4. Click "Save"

### Custom Domain

1. Go to project → Settings → Domains
2. Add your custom domain (e.g., `aiportfolio.com`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

### Deployment Configuration

Create `vercel.json` (optional, for advanced config):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Automatic Deployments

- **Production**: Push to `main` branch → auto-deploys to production
- **Preview**: Push to any branch → creates preview URL
- **Pull Requests**: Automatic preview deployments with comment in PR

## Option 2: Netlify

**Best for**: Alternative to Vercel with similar features

### Deploy Steps

1. **Install CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Initialize**:
   ```bash
   netlify init

   # Follow prompts:
   # - Create & configure a new site? Yes
   # - Team? (your team)
   # - Site name? ai-landing-portfolio
   # - Build command: npm run build
   # - Directory to deploy: .next
   # - Netlify functions folder: (leave empty)
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

### Configuration File

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Environment Variables

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add variables (same as Vercel list above)
3. Deploy again for changes to take effect

### Custom Domain

1. Site Settings → Domain Management
2. Add custom domain
3. Configure DNS (Netlify nameservers or CNAME)
4. SSL automatically provisioned

## Option 3: Static Export (Any Host)

**Best for**: Static hosting (AWS S3, Cloudflare Pages, GitHub Pages)

### Setup

1. **Modify `next.config.ts`**:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
     },
     // ... other config
   };
   ```

2. **Build static files**:
   ```bash
   npm run build
   # Output directory: out/
   ```

3. **Deploy `out/` directory** to your static host

### ⚠️ Limitations

- No API routes (contact form won't work)
- No server-side features
- No Image Optimization API
- No dynamic routes

### Workarounds

**Contact Form**: Use client-side email service:
- [EmailJS](https://www.emailjs.com/) (recommended for static)
- [Formspree](https://formspree.io/)
- [Form-Data](https://form-data.com/)

**Images**: Pre-optimize all images before build

## Option 4: AWS Amplify

**Best for**: AWS ecosystem integration

### Deploy Steps

1. Install Amplify CLI:
   ```bash
   npm i -g @aws-amplify/cli
   ```

2. Initialize:
   ```bash
   amplify init
   ```

3. Add hosting:
   ```bash
   amplify add hosting
   # Choose: Hosting with Amplify Console
   ```

4. Publish:
   ```bash
   amplify publish
   ```

### Environment Variables

Set in AWS Amplify Console → App Settings → Environment Variables

## Option 5: Docker + Any Host

**Best for**: Self-hosting or custom infrastructure

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SENDGRID_API_KEY=${SENDGRID_API_KEY}
      - SENDGRID_FROM_EMAIL=${SENDGRID_FROM_EMAIL}
      - CONTACT_EMAIL=${CONTACT_EMAIL}
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t ai-landing .

# Run container
docker run -p 3000:3000 --env-file .env.production ai-landing

# Or use docker-compose
docker-compose up -d
```

## Performance Optimization

### After Deployment

1. **Run Lighthouse Audit**:
   ```bash
   npx lighthouse https://your-domain.com --view
   ```
   Target: 90+ score in all categories

2. **Check Core Web Vitals**:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

3. **Monitor Bundle Size**:
   ```bash
   npm run build
   # Check output for bundle sizes
   # First Load JS should be < 200KB
   ```

### Optimization Tips

- Enable Brotli compression (Vercel/Netlify do automatically)
- Use CDN for static assets
- Configure cache headers properly
- Monitor Web Vitals with Vercel Analytics or similar
- Lazy load heavy components with `next/dynamic`

## Monitoring & Analytics

### Vercel Analytics (Built-in)

Free with Vercel deployment:
- Real user performance metrics
- Core Web Vitals tracking
- Error tracking

Enable in Vercel Dashboard → Project → Analytics

### Google Analytics

Add to `src/app/layout.tsx`:

```typescript
import Script from 'next/script';

// In layout component
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
```

### Error Tracking

**Sentry** (recommended):

```bash
npm i @sentry/nextjs
npx @sentry/wizard -i nextjs
```

Follow wizard to configure automatic error tracking.

## Continuous Deployment (CI/CD)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Secrets Configuration

Add to GitHub repository → Settings → Secrets:
- `SENDGRID_API_KEY`
- `VERCEL_TOKEN`
- Other environment variables

## Rollback Strategy

### Vercel

Instant rollback to previous deployment:
1. Go to Deployments tab
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Netlify

1. Go to Deploys tab
2. Find previous deployment
3. Click "Publish deploy"

### Manual Rollback

```bash
# Revert git commit
git revert HEAD
git push

# CI/CD will auto-deploy previous version
```

## Troubleshooting

### Build Failures

**Issue**: Build fails on deployment platform
- Check build logs in platform dashboard
- Verify Node.js version matches (18+)
- Run `npm run build` locally first
- Check for missing environment variables

**Issue**: TypeScript errors during build
- Run `npx tsc --noEmit` locally
- Fix all type errors before pushing
- Ensure `tsconfig.json` is committed

### Runtime Errors

**Issue**: Contact form not working
- Verify SendGrid API key is set correctly
- Check API key has "Mail Send" permissions
- Verify sender email is verified in SendGrid
- Check browser console for errors
- Test API route directly: `POST /api/contact`

**Issue**: Images not loading
- Verify images are in `public/` directory
- Check image paths are relative to `public/`
- For Vercel: images are automatically optimized
- For static export: images must be pre-optimized

**Issue**: Styles missing or broken
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`
- Verify Tailwind config includes all paths

### Performance Issues

**Issue**: Slow load times
- Check bundle size: Should be < 200KB
- Run Lighthouse audit
- Verify images are optimized (WebP/AVIF)
- Check for unnecessary dependencies
- Use `npm run analyze` to inspect bundle

**Issue**: Low Lighthouse score
- Run audit on production build, not dev server
- Check Core Web Vitals metrics
- Optimize images (format, dimensions, compression)
- Review JavaScript bundle size
- Implement lazy loading for heavy components

## Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files to git
   - Use platform's secret management
   - Rotate API keys regularly

2. **Headers**:
   - CSP (Content Security Policy)
   - HSTS (Strict-Transport-Security)
   - X-Frame-Options
   - X-Content-Type-Options

3. **Dependencies**:
   ```bash
   # Check for vulnerabilities
   npm audit

   # Fix automatically
   npm audit fix
   ```

4. **Rate Limiting**:
   - Contact form API already has rate limiting (10 req/hour)
   - Consider adding Cloudflare for DDoS protection

## Cost Estimates

### Free Tier Limits

**Vercel Free**:
- Unlimited personal projects
- 100 GB bandwidth/month
- 100 GB-hours serverless execution
- 100 deployments/day

**Netlify Free**:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Cloudflare Pages Free**:
- Unlimited sites
- Unlimited bandwidth
- 500 builds/month

### Paid Tiers (if needed)

**Vercel Pro** ($20/month):
- 1 TB bandwidth
- Unlimited serverless execution
- Team collaboration

**Netlify Pro** ($19/month):
- 400 GB bandwidth
- 25 team members

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Project Issues**: Check GitHub repository issues

---

**Congratulations!** Your AI Engineer Portfolio is now deployed and accessible to the world. 🚀

For questions or issues, refer to the [quickstart guide](../specs/001-ai-engineer-landing/quickstart.md) or create an issue in the repository.
