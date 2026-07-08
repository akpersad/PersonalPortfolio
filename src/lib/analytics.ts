/**
 * Google Analytics 4 Implementation
 * Honest event tracking only: page views, real interactions, and engagement.
 * No synthetic e-commerce events, no fabricated conversion values.
 */

declare global {
  interface Window {
    gtag: {
      (
        command: 'config' | 'event' | 'js' | 'set',
        targetId: string | Date,
        config?: Record<string, unknown>
      ): void;
      q?: unknown[][];
    };
  }
}

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if GA is available
export const isGAEnabled = () => {
  return typeof window !== 'undefined' && GA_MEASUREMENT_ID && window.gtag;
};

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      (window.gtag.q = window.gtag.q || []).push(args);
    };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: url,
    page_path: new URL(url).pathname,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (!isGAEnabled()) return;

  window.gtag('event', eventName, parameters);
};

// Track resume downloads
export const trackResumeDownload = (format: 'PDF' | 'JSON', source: string) => {
  trackEvent('resume_download', {
    format: format,
    source: source,
  });
};

// Track contact form submissions
export const trackContactFormSubmission = (
  formType: string,
  success: boolean
) => {
  trackEvent('contact_form_submission', {
    form_type: formType,
    success: success,
  });
};

// Track external link clicks
export const trackExternalLinkClick = (
  platform: string,
  url: string,
  source: string
) => {
  trackEvent('external_link_click', {
    platform: platform,
    url: url,
    source: source,
  });
};

// Track navigation interactions
export const trackNavigationClick = (navItem: string, source: string) => {
  trackEvent('navigation_click', {
    nav_item: navItem,
    source: source,
  });
};

// Track user properties
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (!isGAEnabled()) return;

  window.gtag('set', 'user_properties', properties);
};

// Track user engagement time
export const trackEngagementTime = (timeSpent: number, page: string) => {
  trackEvent('engagement_time', {
    time_spent: Math.round(timeSpent),
    page: page,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number, page: string) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    page: page,
  });
};

// Utility function to get user agent info
export const getUserAgentInfo = () => {
  if (typeof window === 'undefined') return {};

  const userAgent = window.navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const isTablet = /iPad|Android(?=.*Mobile)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    device_type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    is_mobile: isMobile,
    is_tablet: isTablet,
    is_desktop: isDesktop,
  };
};

// Utility function to get referrer info
export const getReferrerInfo = () => {
  if (typeof window === 'undefined') return {};

  const referrer = document.referrer;
  if (!referrer) return { referrer_type: 'direct' };

  try {
    const referrerUrl = new URL(referrer);
    const hostname = referrerUrl.hostname.toLowerCase();

    // Social media referrers
    if (hostname.includes('linkedin.com'))
      return { referrer_type: 'social', platform: 'linkedin' };
    if (hostname.includes('twitter.com') || hostname.includes('x.com'))
      return { referrer_type: 'social', platform: 'twitter' };
    if (hostname.includes('facebook.com'))
      return { referrer_type: 'social', platform: 'facebook' };
    if (hostname.includes('github.com'))
      return { referrer_type: 'social', platform: 'github' };

    // Search engines
    if (hostname.includes('google.com'))
      return { referrer_type: 'search', platform: 'google' };
    if (hostname.includes('bing.com'))
      return { referrer_type: 'search', platform: 'bing' };
    if (hostname.includes('yahoo.com'))
      return { referrer_type: 'search', platform: 'yahoo' };

    // Other websites
    return { referrer_type: 'referral', platform: hostname };
  } catch {
    return { referrer_type: 'unknown' };
  }
};
