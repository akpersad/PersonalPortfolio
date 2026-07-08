/**
 * React Hook for Google Analytics Integration
 * Provides easy access to analytics functions in React components
 */

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  initGA,
  trackPageView,
  trackEvent,
  trackResumeDownload,
  trackContactFormSubmission,
  trackExternalLinkClick,
  trackNavigationClick,
  trackEngagementTime,
  trackScrollDepth,
  setUserProperties,
  getUserAgentInfo,
  getReferrerInfo,
  isGAEnabled,
} from '@/lib/analytics';

export const useAnalytics = () => {
  const pathname = usePathname();
  // Set to the real timestamp on mount (render must stay pure per react-hooks/purity)
  const startTimeRef = useRef<number>(0);
  const scrollDepthRef = useRef<number>(0);

  // Load GA on the first user interaction instead of on mount: the gtag
  // script then costs nothing during initial load (for real visitors and
  // for the Lighthouse gate alike), and a visitor who never interacts is
  // not worth tracking anyway.
  useEffect(() => {
    startTimeRef.current = Date.now();
    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'scroll',
      'touchstart',
    ];
    const load = () => {
      events.forEach(e => window.removeEventListener(e, load));
      // gtag's config call reports the initial page_view itself
      initGA();
    };
    events.forEach(e =>
      window.addEventListener(e, load, { once: true, passive: true })
    );
    return () => events.forEach(e => window.removeEventListener(e, load));
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (isGAEnabled()) {
      trackPageView(window.location.href, document.title);

      // Set user properties based on device and referrer
      const userAgentInfo = getUserAgentInfo();
      const referrerInfo = getReferrerInfo();

      setUserProperties({
        ...userAgentInfo,
        ...referrerInfo,
        page_path: pathname,
      });

      // Reset engagement tracking for new page
      startTimeRef.current = Date.now();
      scrollDepthRef.current = 0;
    }
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    if (!isGAEnabled()) return;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      // Track at 25%, 50%, 75%, and 100% scroll depth
      if (scrollPercent >= 25 && scrollDepthRef.current < 25) {
        trackScrollDepth(25, pathname);
        scrollDepthRef.current = 25;
      } else if (scrollPercent >= 50 && scrollDepthRef.current < 50) {
        trackScrollDepth(50, pathname);
        scrollDepthRef.current = 50;
      } else if (scrollPercent >= 75 && scrollDepthRef.current < 75) {
        trackScrollDepth(75, pathname);
        scrollDepthRef.current = 75;
      } else if (scrollPercent >= 100 && scrollDepthRef.current < 100) {
        trackScrollDepth(100, pathname);
        scrollDepthRef.current = 100;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Track engagement time on page unload
  useEffect(() => {
    if (!isGAEnabled()) return;

    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
      if (timeSpent > 5) {
        // Only track if user spent more than 5 seconds
        trackEngagementTime(timeSpent, pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  // Analytics functions
  const analytics = {
    // Basic event tracking
    trackEvent: useCallback(
      (eventName: string, parameters?: Record<string, unknown>) => {
        trackEvent(eventName, parameters);
      },
      []
    ),

    // Resume download tracking
    trackResumeDownload: useCallback(
      (format: 'PDF' | 'JSON', source: string) => {
        trackResumeDownload(format, source);
      },
      []
    ),

    // Contact form tracking
    trackContactFormSubmission: useCallback(
      (formType: string, success: boolean) => {
        trackContactFormSubmission(formType, success);
      },
      []
    ),

    // External link tracking
    trackExternalLinkClick: useCallback(
      (platform: string, url: string, source: string) => {
        trackExternalLinkClick(platform, url, source);
      },
      []
    ),

    // Navigation tracking
    trackNavigationClick: useCallback((navItem: string, source: string) => {
      trackNavigationClick(navItem, source);
    }, []),

    // Set user properties
    setUserProperties: useCallback((properties: Record<string, unknown>) => {
      setUserProperties(properties);
    }, []),
  };

  return analytics;
};
