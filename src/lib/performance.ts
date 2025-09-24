/**
 * Performance Utilities
 * React memoization, bundle analysis, and performance monitoring
 */

import React, { memo, useMemo, useCallback, ComponentType } from 'react';

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Debounce utility for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Memoized component wrapper
export const withMemo = <P extends object>(
  Component: ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, areEqual);
};

// Performance-optimized image loading
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Bundle size monitoring
export const getBundleSize = () => {
  if (typeof window === 'undefined') return null;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const stylesheets = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  );

  const totalSize = [...scripts, ...stylesheets].reduce((total, element) => {
    const href = element.getAttribute('src') || element.getAttribute('href');
    if (href && !href.startsWith('data:')) {
      // This is a simplified calculation - in reality, you'd need to fetch the actual file sizes
      return total + href.length * 0.5; // Rough estimate
    }
    return total;
  }, 0);

  return {
    scripts: scripts.length,
    stylesheets: stylesheets.length,
    estimatedSize: totalSize,
  };
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null;
  }

  const memory = (
    performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    }
  ).memory;
  if (!memory) return null;

  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  };
};

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  const metrics = {
    // Navigation timing
    domContentLoaded:
      navigation.domContentLoadedEventEnd -
      navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,

    // Paint timing
    firstPaint:
      paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint:
      paint.find(entry => entry.name === 'first-contentful-paint')?.startTime ||
      0,

    // Resource timing
    resourceCount: performance.getEntriesByType('resource').length,

    // Memory usage
    memory: getMemoryUsage(),

    // Bundle size
    bundle: getBundleSize(),
  };

  return metrics;
};

// React performance hooks
export const usePerformanceOptimizedCallback = <
  T extends (...args: unknown[]) => unknown,
>(
  callback: T,
  deps: React.DependencyList
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps);
};

export const usePerformanceOptimizedMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
};

// Component performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  Component: ComponentType<P>,
  componentName: string
) => {
  const WrappedComponent = memo((props: P) => {
    const start = performance.now();

    const result = React.createElement(Component, props);

    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${end - start}ms`);
    }

    return result;
  });

  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName})`;
  return WrappedComponent;
};

// Lazy loading utility
export function createLazyComponent<P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = React.lazy(importFunc);

  const WrappedComponent = memo((props: P) => {
    const FallbackComponent =
      fallback || (() => React.createElement('div', null, 'Loading...'));
    return React.createElement(
      React.Suspense,
      { fallback: React.createElement(FallbackComponent) },
      React.createElement(LazyComponent, props)
    );
  });

  WrappedComponent.displayName = 'LazyComponent';
  return WrappedComponent;
}

// Performance budget monitoring
export const checkPerformanceBudget = () => {
  const metrics = collectPerformanceMetrics();
  if (!metrics) return null;

  const budget = {
    maxFirstPaint: 1000, // 1 second
    maxFirstContentfulPaint: 1500, // 1.5 seconds
    maxDomContentLoaded: 2000, // 2 seconds
    maxLoadComplete: 3000, // 3 seconds
    maxResourceCount: 50,
    maxMemoryUsage: 50 * 1024 * 1024, // 50MB
  };

  const violations = [];

  if (metrics.firstPaint > budget.maxFirstPaint) {
    violations.push(
      `First Paint exceeded budget: ${metrics.firstPaint}ms > ${budget.maxFirstPaint}ms`
    );
  }

  if (metrics.firstContentfulPaint > budget.maxFirstContentfulPaint) {
    violations.push(
      `First Contentful Paint exceeded budget: ${metrics.firstContentfulPaint}ms > ${budget.maxFirstContentfulPaint}ms`
    );
  }

  if (metrics.domContentLoaded > budget.maxDomContentLoaded) {
    violations.push(
      `DOM Content Loaded exceeded budget: ${metrics.domContentLoaded}ms > ${budget.maxDomContentLoaded}ms`
    );
  }

  if (metrics.loadComplete > budget.maxLoadComplete) {
    violations.push(
      `Load Complete exceeded budget: ${metrics.loadComplete}ms > ${budget.maxLoadComplete}ms`
    );
  }

  if (metrics.resourceCount > budget.maxResourceCount) {
    violations.push(
      `Resource count exceeded budget: ${metrics.resourceCount} > ${budget.maxResourceCount}`
    );
  }

  if (metrics.memory && metrics.memory.usedJSHeapSize > budget.maxMemoryUsage) {
    violations.push(
      `Memory usage exceeded budget: ${metrics.memory.usedJSHeapSize} > ${budget.maxMemoryUsage}`
    );
  }

  return {
    metrics,
    budget,
    violations,
    withinBudget: violations.length === 0,
  };
};
