/**
 * Core Web Vitals Tracking Component
 * Tracks and reports Core Web Vitals metrics to Google Analytics
 */

'use client';

import { useEffect } from 'react';
import { trackCoreWebVitals } from '@/lib/analytics';

// Core Web Vitals tracking
const reportWebVitals = (metric: {
  name: string;
  value: number;
  id: string;
  delta: number;
}) => {
  // Send to Google Analytics
  trackCoreWebVitals(metric);

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Core Web Vitals:', metric);
  }
};

// LCP (Largest Contentful Paint) tracking
const trackLCP = () => {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      reportWebVitals({
        name: 'LCP',
        value: lastEntry.startTime,
        id: (lastEntry as PerformanceEntry & { id?: string }).id || 'unknown',
        delta: lastEntry.startTime,
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.warn('LCP tracking failed:', error);
  }
};

// FID (First Input Delay) tracking
const trackFID = () => {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        reportWebVitals({
          name: 'FID',
          value:
            (entry as PerformanceEventTiming).processingStart - entry.startTime,
          id: (entry as PerformanceEntry & { id?: string }).id || 'unknown',
          delta:
            (entry as PerformanceEventTiming).processingStart - entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  } catch (error) {
    console.warn('FID tracking failed:', error);
  }
};

// CLS (Cumulative Layout Shift) tracking
const trackCLS = () => {
  if (typeof window === 'undefined') return;

  try {
    let clsValue = 0;
    const clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (
          !(entry as PerformanceEntry & { hadRecentInput?: boolean })
            .hadRecentInput
        ) {
          clsValue += (entry as PerformanceEntry & { value: number }).value;
          clsEntries.push(entry);
        }
      });

      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        id: 'cls-total',
        delta: clsValue,
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.warn('CLS tracking failed:', error);
  }
};

// FCP (First Contentful Paint) tracking
const trackFCP = () => {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        reportWebVitals({
          name: 'FCP',
          value: entry.startTime,
          id: (entry as PerformanceEntry & { id?: string }).id || 'unknown',
          delta: entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ['paint'] });
  } catch (error) {
    console.warn('FCP tracking failed:', error);
  }
};

// TTFB (Time to First Byte) tracking
const trackTTFB = () => {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'navigation') {
          const ttfb =
            (entry as PerformanceNavigationTiming).responseStart -
            (entry as PerformanceNavigationTiming).requestStart;
          reportWebVitals({
            name: 'TTFB',
            value: ttfb,
            id: 'ttfb',
            delta: ttfb,
          });
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
  } catch (error) {
    console.warn('TTFB tracking failed:', error);
  }
};

// INP (Interaction to Next Paint) tracking
const trackINP = () => {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        reportWebVitals({
          name: 'INP',
          value:
            (entry as PerformanceEventTiming).processingStart - entry.startTime,
          id: (entry as PerformanceEntry & { id?: string }).id || 'unknown',
          delta:
            (entry as PerformanceEventTiming).processingStart - entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ['event'] });
  } catch (error) {
    console.warn('INP tracking failed:', error);
  }
};

export const CoreWebVitals = () => {
  useEffect(() => {
    // Only track in production or when GA is enabled
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    ) {
      // Track all Core Web Vitals
      trackLCP();
      trackFID();
      trackCLS();
      trackFCP();
      trackTTFB();
      trackINP();
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default CoreWebVitals;
