import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { WebVitalsReporter } from '@/components/WebVitalsReporter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Engineer Portfolio | Innovation Specialist',
  description:
    'Portfolio of an AI Engineer specializing in LLM applications, machine learning, and AI-driven solutions. Explore projects, technologies, and expertise in building production-grade AI systems.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'LLM',
    'AI Development',
    'Portfolio',
  ],
  authors: [{ name: 'AI Engineer' }],
  openGraph: {
    title: 'AI Engineer Portfolio | Innovation Specialist',
    description:
      'Portfolio showcasing AI engineering projects, LLM applications, and machine learning expertise.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
