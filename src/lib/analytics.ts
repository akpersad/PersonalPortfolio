/**
 * Google Analytics 4 Implementation
 * Comprehensive tracking for portfolio analytics
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
    console.warn('Google Analytics Measurement ID not found');
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

  window.gtag('event', eventName, {
    event_category: parameters?.category || 'engagement',
    event_label: parameters?.label,
    value: parameters?.value,
    ...parameters,
  });
};

// Track resume downloads (Enhanced E-commerce)
export const trackResumeDownload = (format: 'PDF' | 'JSON', source: string) => {
  if (!isGAEnabled()) return;

  // Track as purchase event for conversion tracking
  window.gtag('event', 'purchase', {
    transaction_id: `resume_${format.toLowerCase()}_${Date.now()}`,
    value: 1, // Resume download has value for conversion tracking
    currency: 'USD',
    items: [
      {
        item_id: `resume_${format.toLowerCase()}`,
        item_name: `Resume (${format})`,
        item_category: 'Document',
        item_category2: 'Resume',
        quantity: 1,
        price: 1,
      },
    ],
    // Custom parameters
    source: source, // Where the download was initiated from
    format: format,
  });

  // Also track as custom event for detailed analytics
  trackEvent('resume_download', {
    category: 'conversion',
    label: format,
    value: 1,
    source: source,
  });
};

// Track contact form submissions (Enhanced E-commerce)
export const trackContactFormSubmission = (
  formType: string,
  success: boolean
) => {
  if (!isGAEnabled()) return;

  // Track as lead generation event
  window.gtag('event', 'generate_lead', {
    currency: 'USD',
    value: 10, // Lead value for conversion tracking
    form_type: formType,
    success: success,
  });

  // Also track as custom event
  trackEvent('contact_form_submission', {
    category: 'conversion',
    label: formType,
    value: success ? 10 : 0,
    success: success,
  });
};

// Track project page views (Enhanced E-commerce)
export const trackProjectView = (projectName: string, projectSlug: string) => {
  if (!isGAEnabled()) return;

  // Track as view_item event
  window.gtag('event', 'view_item', {
    currency: 'USD',
    value: 5, // Project view value
    items: [
      {
        item_id: projectSlug,
        item_name: projectName,
        item_category: 'Project',
        item_category2: 'Portfolio',
        quantity: 1,
        price: 5,
      },
    ],
  });

  // Also track as custom event
  trackEvent('project_view', {
    category: 'engagement',
    label: projectName,
    value: 5,
    project_slug: projectSlug,
  });
};

// Track external link clicks
export const trackExternalLinkClick = (
  platform: string,
  url: string,
  source: string
) => {
  if (!isGAEnabled()) return;

  trackEvent('external_link_click', {
    category: 'engagement',
    label: platform,
    value: 1,
    platform: platform,
    url: url,
    source: source,
  });
};

// Track navigation interactions
export const trackNavigationClick = (navItem: string, source: string) => {
  if (!isGAEnabled()) return;

  trackEvent('navigation_click', {
    category: 'engagement',
    label: navItem,
    value: 1,
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
  if (!isGAEnabled()) return;

  trackEvent('engagement_time', {
    category: 'engagement',
    label: page,
    value: Math.round(timeSpent),
    time_spent: timeSpent,
    page: page,
  });
};

// Track Core Web Vitals
export const trackCoreWebVitals = (metric: {
  name: string;
  value: number;
  id: string;
  delta: number;
}) => {
  if (!isGAEnabled()) return;

  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ),
    non_interaction: true,
    custom_map: {
      metric_id: metric.id,
      metric_delta: metric.delta,
    },
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number, page: string) => {
  if (!isGAEnabled()) return;

  trackEvent('scroll_depth', {
    category: 'engagement',
    label: page,
    value: depth,
    scroll_depth: depth,
    page: page,
  });
};

// Track search queries (if implemented)
export const trackSearch = (query: string, results: number) => {
  if (!isGAEnabled()) return;

  trackEvent('search', {
    category: 'engagement',
    label: query,
    value: results,
    search_term: query,
    results_count: results,
  });
};

// Track errors
export const trackError = (error: string, fatal: boolean = false) => {
  if (!isGAEnabled()) return;

  trackEvent('exception', {
    category: 'error',
    label: error,
    value: fatal ? 1 : 0,
    fatal: fatal,
    error_message: error,
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
    user_agent: userAgent,
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
