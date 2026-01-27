'use client';

import { useReportWebVitals } from 'next/web-vitals';

// Type definition for Google Analytics gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log Web Vitals metrics for monitoring
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        id: metric.id,
      });
    }

    // Send to analytics service in production
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      });
    }

    // You can also send to other analytics services:
    // - Vercel Analytics
    // - Google Analytics
    // - Custom analytics endpoint
  });

  return null;
}
