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
  trackProjectView,
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
  const startTimeRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<number>(0);

  // Initialize GA on mount
  useEffect(() => {
    initGA();
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

    // Project view tracking
    trackProjectView: useCallback(
      (projectName: string, projectSlug: string) => {
        trackProjectView(projectName, projectSlug);
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

// Hook for tracking specific user interactions
export const useInteractionTracking = () => {
  const analytics = useAnalytics();

  const trackButtonClick = useCallback(
    (buttonName: string, location: string) => {
      analytics.trackEvent('button_click', {
        category: 'interaction',
        label: buttonName,
        value: 1,
        button_name: buttonName,
        location: location,
      });
    },
    [analytics]
  );

  const trackFormInteraction = useCallback(
    (formName: string, action: string) => {
      analytics.trackEvent('form_interaction', {
        category: 'interaction',
        label: formName,
        value: 1,
        form_name: formName,
        action: action,
      });
    },
    [analytics]
  );

  const trackDownload = useCallback(
    (fileName: string, fileType: string, source: string) => {
      analytics.trackEvent('file_download', {
        category: 'conversion',
        label: fileName,
        value: 1,
        file_name: fileName,
        file_type: fileType,
        source: source,
      });
    },
    [analytics]
  );

  return {
    trackButtonClick,
    trackFormInteraction,
    trackDownload,
  };
};
