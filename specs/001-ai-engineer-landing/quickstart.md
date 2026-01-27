# Quickstart Guide: AI Engineer Portfolio Landing Page

**Feature**: 001-ai-engineer-landing
**Date**: 2026-01-26
**Purpose**: Get developers set up and productive quickly

## Prerequisites

Before starting, ensure you have:

- **Node.js**: 18.17+ or 20.0+ (LTS recommended)
- **npm**: 9.0+ (comes with Node.js) or **pnpm**: 8.0+ (optional, faster)
- **Git**: 2.40+ for version control
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

**Optional Tools**:
- **nvm** (Node Version Manager) for managing Node.js versions
- **VS Code Extensions**: Error Lens, GitLens, Import Cost

## Initial Setup

### 1. Clone and Checkout

```bash
# Clone the repository (if not already cloned)
git clone <repository-url> ai-landing
cd ai-landing

# Checkout the feature branch
git checkout 001-ai-engineer-landing

# Verify you're on the correct branch
git branch --show-current
# Should output: 001-ai-engineer-landing
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using pnpm (faster, recommended)
pnpm install
```

**What gets installed**:
- React 18.2+ & React DOM
- Next.js 14+ (framework)
- TypeScript 5.3+ (type checking)
- Tailwind CSS 3.4+ (styling)
- Framer Motion 11+ (animations)
- React Hook Form 7.5+ (forms)
- Zod (validation schemas)
- Lucide React (icons)
- Testing libraries (Vitest, RTL, Playwright)
- ESLint + Prettier (linting/formatting)

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# SendGrid Email Configuration (contact form backend)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Email Recipients
CONTACT_EMAIL=your_email@example.com

# Next.js Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Setting up SendGrid (Contact Form Backend)**:
1. Go to [SendGrid.com](https://sendgrid.com/) and create a free account
2. Generate an API key in Settings → API Keys (choose "Full Access" or "Mail Send")
3. Verify sender email address in Settings → Sender Authentication
4. Copy API key to `.env.local` as `SENDGRID_API_KEY`
5. Set `SENDGRID_FROM_EMAIL` to your verified sender email
6. Set `CONTACT_EMAIL` to where you want to receive contact form submissions

**Development Mode**: The contact form will work without SendGrid configured - it will log submissions to the console instead of sending emails.

### 4. Project Structure Overview

```text
ai-landing/
├── src/
│   ├── app/              # Next.js app directory (routes)
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── data/             # Static content (JSON)
│   └── types/            # TypeScript type definitions
├── public/               # Static assets (images, fonts)
├── tests/                # Test files (unit, integration, e2e)
├── config/               # Configuration files
├── specs/                # Feature specifications
└── .env.local            # Environment variables (not committed)
```

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
# OR
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**What happens**:
- Next.js dev server starts with hot reload
- TypeScript compilation in watch mode
- Tailwind CSS JIT compiler active
- Changes reflect instantly in browser

### 2. Code Quality Checks

**Linting** (find code issues):
```bash
npm run lint
# Automatically fixes issues when possible
npm run lint:fix
```

**Formatting** (Prettier):
```bash
npm run format
# Check formatting without fixing
npm run format:check
```

**Type Checking** (TypeScript):
```bash
npm run type-check
```

**Run all checks** (before committing):
```bash
npm run validate
# Runs: type-check → lint → format:check
```

### 3. Testing

**Unit Tests** (Vitest + React Testing Library):
```bash
# Run all unit tests
npm test

# Run in watch mode (re-runs on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage
# Coverage report in: coverage/index.html
```

**Integration Tests**:
```bash
npm run test:integration
```

**E2E Tests** (Playwright):
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run E2E tests in UI mode (interactive)
npm run test:e2e:ui

# Run specific test file
npm run test:e2e -- tests/e2e/user-journeys.spec.ts

# Run tests in specific browser
npm run test:e2e -- --project=chromium
```

**Accessibility Tests**:
```bash
# Run accessibility-specific E2E tests
npm run test:a11y
```

**Run all tests**:
```bash
npm run test:all
```

### 4. Performance Audits

**Lighthouse** (local audit):
```bash
# First, build the production version
npm run build

# Start production server
npm start

# In another terminal, run Lighthouse
npm run lighthouse
# Report saved to: lighthouse-report.html
```

**Lighthouse CI** (automated in CI/CD):
```bash
npm run lighthouse:ci
```

**Bundle Analysis** (check JavaScript bundle sizes):
```bash
npm run analyze
# Opens bundle visualization in browser
```

## Content Management

### Portfolio Projects

Edit `src/data/portfolio.json`:

```json
{
  "projects": [
    {
      "id": "project-1",
      "title": "AI-Powered Code Assistant",
      "description": "Built an intelligent code completion tool using LLMs...",
      "technologies": ["GPT-4", "TypeScript", "VS Code API"],
      "imageUrl": "/images/portfolio/code-assistant.png",
      "liveUrl": "https://example.com/demo",
      "outcomes": [
        "40% faster code writing",
        "Used by 10k+ developers"
      ],
      "featured": true
    }
  ]
}
```

Add project images to `public/images/portfolio/`.

### Technology Showcase

Edit `src/data/technologies.json`:

```json
{
  "technologies": [
    {
      "id": "tech-1",
      "name": "GPT-4",
      "category": "LLM",
      "description": "Advanced language model for natural language tasks",
      "iconUrl": "/images/tech-logos/gpt4.svg"
    }
  ]
}
```

Add tech logos to `public/images/tech-logos/`.

### Page Content

Edit `src/data/content.json` for hero headlines, section titles, and copy:

```json
{
  "hero": {
    "headline": "AI Engineer & Innovation Specialist",
    "tagline": "Building the future with cutting-edge AI technologies—no IDE, no limits",
    "ctaText": "Let's Build Something Amazing"
  },
  "about": {
    "title": "Redefining Development",
    "description": "Leveraging advanced AI tools and prompt engineering..."
  }
}
```

## Building for Production

### 1. Production Build

```bash
npm run build
```

**What happens**:
- TypeScript compilation (strict mode)
- Next.js static site generation (SSG)
- Tailwind CSS purging (removes unused styles)
- Image optimization
- Bundle minification and compression
- JavaScript splitting and tree-shaking

**Output**: `.next/` directory with optimized static files

### 2. Preview Production Build

```bash
npm start
# Opens on http://localhost:3000
```

Test the production build locally to verify:
- Performance (Lighthouse score > 90)
- All animations working
- Forms submitting correctly
- Images loading properly

### 3. Pre-Deployment Checklist

Before deploying, verify:

- [ ] All tests passing: `npm run test:all`
- [ ] Linting clean: `npm run lint`
- [ ] Type checking passes: `npm run type-check`
- [ ] Lighthouse score > 90: `npm run lighthouse`
- [ ] Environment variables configured
- [ ] Content (portfolio, technologies) up to date
- [ ] Images optimized (WebP/AVIF format)
- [ ] Contact form tested (sends emails successfully)

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel**: Built by Next.js creators, zero-config deployment, automatic performance optimization.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to link project
# Deployment URL provided automatically
```

**Configure Environment Variables**:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy for changes to take effect

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Build Settings** (netlify.toml):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: Static Export (Any Host)

For pure static hosting (AWS S3, GitHub Pages, etc.):

1. Modify `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
}
```

2. Build:
```bash
npm run build
```

3. Deploy `out/` directory to your static host

**Note**: Static export disables API routes. Use EmailJS for contact form instead of Next.js API.

## Troubleshooting

### Common Issues

**Issue: `npm install` fails**
- Solution: Clear cache: `npm cache clean --force` then `npm install`
- Or try: Delete `node_modules` and `package-lock.json`, then `npm install`

**Issue: TypeScript errors in IDE**
- Solution: Restart TypeScript server in VS Code (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
- Verify: `npm run type-check` passes

**Issue: Tailwind styles not applying**
- Solution: Restart dev server (`npm run dev`)
- Check: `tailwind.config.ts` content paths include all component files

**Issue: Images not loading**
- Solution: Verify image paths relative to `public/` directory
- Use Next.js Image component: `<Image src="/images/..." />`

**Issue: Contact form not sending emails**
- Solution: Verify `.env.local` has correct API keys
- Test EmailJS directly in their dashboard
- Check browser console for API errors

**Issue: Animations laggy/janky**
- Solution: Check browser DevTools Performance tab
- Ensure animations use GPU-accelerated properties (transform, opacity)
- Verify Framer Motion animations use hardware acceleration

**Issue: Lighthouse score low**
- Solution: Run `npm run build` then `npm start` (not dev server)
- Check bundle size: `npm run analyze`
- Optimize images: Use WebP/AVIF formats, correct dimensions

## Development Tips

### Hot Reload Not Working
- Save file to trigger reload
- Check terminal for compilation errors
- Restart dev server if persists

### Testing Strategy
1. Write tests first (TDD approach per Constitution)
2. Run `npm run test:watch` in separate terminal
3. Implement feature until tests pass
4. Run full test suite before committing

### Debugging
- Use React DevTools browser extension
- Check Next.js build errors in terminal
- Use `console.log` (removed before commit)
- Use VS Code debugger with launch.json

### Performance Optimization
- Use `next/image` for all images (automatic optimization)
- Lazy load heavy components: `dynamic(() => import('./Component'))`
- Keep bundle size < 200KB gzipped
- Monitor Web Vitals: `npm run dev` shows metrics in terminal

## Next Steps

1. **Customize Content**: Update portfolio projects, technologies, and page copy
2. **Add Images**: Replace placeholder images with real project screenshots
3. **Test Contact Form**: Send test email to verify integration works
4. **Run Tests**: Ensure 80%+ coverage maintained
5. **Deploy Preview**: Deploy to Vercel/Netlify for stakeholder review
6. **Performance Audit**: Run Lighthouse and optimize as needed

## Getting Help

- **Documentation**: See `specs/001-ai-engineer-landing/` for design docs
- **Constitution**: Review `.specify/memory/constitution.md` for quality standards
- **Issues**: Check existing issues or create new one with reproduction steps

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build

# Quality Checks
npm run lint             # Check code quality
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript validation
npm run validate         # Run all checks

# Testing
npm test                 # Unit tests
npm run test:watch       # Unit tests (watch mode)
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests (Playwright)
npm run test:a11y        # Accessibility tests
npm run test:all         # All tests

# Performance
npm run lighthouse       # Lighthouse audit
npm run analyze          # Bundle analysis

# Deployment
vercel                   # Deploy to Vercel
netlify deploy --prod    # Deploy to Netlify
```

---

**Happy building!** Remember to follow the Constitution principles: Code Quality, Testing, UX Consistency, Performance, and UI Excellence.
