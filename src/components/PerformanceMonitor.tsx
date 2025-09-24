/**
 * Performance Monitoring Component
 * Tracks and reports performance metrics
 */

'use client';

import { useEffect } from 'react';
import {
  collectPerformanceMetrics,
  checkPerformanceBudget,
} from '@/lib/performance';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production or when explicitly enabled
    if (
      process.env.NODE_ENV !== 'production' &&
      !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING
    ) {
      return;
    }

    const reportPerformance = () => {
      const metrics = collectPerformanceMetrics();
      const budget = checkPerformanceBudget();

      if (metrics) {
        // Send to analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'performance_metrics', {
            event_category: 'Performance',
            event_label: 'Page Load',
            value: Math.round(metrics.firstContentfulPaint || 0),
            custom_map: {
              first_paint: metrics.firstPaint,
              first_contentful_paint: metrics.firstContentfulPaint,
              dom_content_loaded: metrics.domContentLoaded,
              load_complete: metrics.loadComplete,
              resource_count: metrics.resourceCount,
            },
          });

          if (budget && !budget.withinBudget) {
            window.gtag('event', 'performance_budget_violation', {
              event_category: 'Performance',
              event_label: 'Budget Violation',
              value: budget.violations.length,
              custom_map: {
                violations: budget.violations.join('; '),
              },
            });
          }
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.group('🚀 Performance Metrics');
          console.log('First Paint:', metrics.firstPaint, 'ms');
          console.log(
            'First Contentful Paint:',
            metrics.firstContentfulPaint,
            'ms'
          );
          console.log('DOM Content Loaded:', metrics.domContentLoaded, 'ms');
          console.log('Load Complete:', metrics.loadComplete, 'ms');
          console.log('Resource Count:', metrics.resourceCount);

          if (budget) {
            console.log('Within Budget:', budget.withinBudget);
            if (!budget.withinBudget) {
              console.warn('Budget Violations:', budget.violations);
            }
          }
          console.groupEnd();
        }
      }
    };

    // Report performance after page load
    if (document.readyState === 'complete') {
      reportPerformance();
    } else {
      window.addEventListener('load', reportPerformance);
    }

    // Report performance on page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        reportPerformance();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('load', reportPerformance);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
