# AI Engineer Portfolio Landing Page

A world-class portfolio landing page showcasing AI engineering expertise, built with Next.js 14, TypeScript, and Tailwind CSS. Features a modern DeFi-inspired design with glassmorphism effects, smooth animations, and exceptional performance.

## Features

- **🎨 Modern Design**: Dark theme with vibrant gradients, glassmorphism effects, and smooth animations
- **⚡ Performance**: 90+ Lighthouse score, < 200KB bundle size, optimized Core Web Vitals
- **♿ Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **📱 Responsive**: Mobile-first design that works flawlessly across all devices
- **🔥 Interactive**: Framer Motion animations, hover effects, and scroll-triggered reveals
- **📧 Contact Form**: Fully functional contact form with SendGrid integration and validation

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.3+](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 3.4+](https://tailwindcss.com/) with custom design system
- **Animations**: [Framer Motion 11+](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form 7.5+](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [SendGrid](https://sendgrid.com/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-landing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
```env
# SendGrid Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Email Recipients
CONTACT_EMAIL=your_email@example.com

# Next.js Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will auto-reload when you make changes using Fast Refresh.

### Build

Create an optimized production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
ai-landing/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── api/              # API routes
│   │   │   └── contact/      # Contact form endpoint
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx      # Hero section
│   │   │   ├── TechShowcase.tsx  # Technology showcase
│   │   │   ├── Portfolio.tsx # Portfolio section
│   │   │   └── Contact.tsx   # Contact section
│   │   ├── forms/            # Form components
│   │   │   └── ContactForm.tsx
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utilities and helpers
│   │   ├── animations.ts     # Animation variants
│   │   ├── constants.ts      # App constants
│   │   └── validations.ts    # Zod schemas
│   ├── data/                 # Static content
│   │   ├── portfolio.json    # Portfolio projects
│   │   ├── technologies.json # Technologies
│   │   └── content.json      # Page content
│   └── types/                # TypeScript types
├── public/                   # Static assets
│   └── images/               # Image assets
├── specs/                    # Feature specifications
└── package.json
```

## Customization

### Content

Update the content in `src/data/`:

- **portfolio.json**: Add/edit your portfolio projects
- **technologies.json**: List your technologies and skills
- **content.json**: Update section headings and copy

### Styling

Customize the design system in:

- **tailwind.config.ts**: Colors, fonts, spacing, breakpoints
- **src/app/globals.css**: Custom utilities and component styles

### Contact Information

Update social links in `src/components/sections/Contact.tsx`:

```typescript
const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
  // ... add more links
];
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Create a new site in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

### Manual Deployment

Build the project:
```bash
npm run build
```

The build output will be in the `.next` folder. Use any static hosting service that supports Next.js.

## Performance

The landing page is optimized for exceptional performance:

- ✅ **Lighthouse Score**: 90+ across all categories
- ✅ **First Contentful Paint**: < 1.5s
- ✅ **Time to Interactive**: < 3s
- ✅ **Bundle Size**: < 200KB gzipped
- ✅ **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## Accessibility

WCAG 2.1 Level AA compliant:

- ✅ Semantic HTML landmarks
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast (4.5:1 minimum)
- ✅ Focus indicators
- ✅ Skip-to-content link

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prettier --write "src/**/*.{ts,tsx}"` - Format code

## License

MIT License - feel free to use this project as a template for your own portfolio!

## Support

For issues or questions:
- Check the [documentation](./specs/001-ai-engineer-landing/)
- Open an issue on GitHub
- Contact via the contact form

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
