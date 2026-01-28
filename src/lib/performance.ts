/**
 * Performance monitoring and optimization utilities
 */

import { logger } from './error-handler';

/**
 * Measure and log performance metrics
 */
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  const startTime = performance.now();
  
  try {
    const result = fn();
    
    // Handle async functions
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - startTime;
        logger.debug(`Performance: ${name}`, { duration: `${duration.toFixed(2)}ms` });
      });
    }
    
    const duration = performance.now() - startTime;
    logger.debug(`Performance: ${name}`, { duration: `${duration.toFixed(2)}ms` });
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    logger.error(`Performance error in ${name}`, error as Error, { duration: `${duration.toFixed(2)}ms` });
    throw error;
  }
}

/**
 * Debounce function to limit execution frequency
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution rate
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoize expensive function calls
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: { maxSize?: number; ttl?: number } = {}
): T {
  const cache = new Map<string, { value: unknown; timestamp: number }>();
  const { maxSize = 100, ttl } = options;

  return ((...args: unknown[]) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    // Check if cached value is still valid
    if (cached) {
      if (!ttl || Date.now() - cached.timestamp < ttl) {
        return cached.value;
      } else {
        cache.delete(key);
      }
    }

    // Compute and cache the result
    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });

    // Implement LRU cache by removing oldest entries
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey as string);
    }

    return result;
  }) as T;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Web Vital', metric);
  }

  // Send to analytics service
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    // Google Analytics 4
    if ('gtag' in window) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.disconnect();
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for older browsers
    img.src = src;
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Cache API responses
 */
export class APICache {
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private ttl: number;

  constructor(ttl: number = 300000) {
    // Default 5 minutes
    this.ttl = ttl;
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  }

  set(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

/**
 * Bundle size analyzer helper
 */
export function analyzeBundle() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Log loaded scripts size
    const scripts = Array.from(document.scripts);
    const sizes = scripts.map((script) => ({
      src: script.src,
      length: script.text.length,
    }));
    
    logger.debug('Bundle analysis', {
      scriptCount: scripts.length,
      totalSize: sizes.reduce((acc, s) => acc + s.length, 0),
    });
  }
}

/**
 * Optimize image loading
 */
export function getOptimizedImageUrl(
  src: string,
  options: { width?: number; quality?: number } = {}
): string {
  const { width, quality = 80 } = options;
  
  // If using Next.js Image component, this is handled automatically
  // For external images (like Unsplash), we can add optimization params
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('auto', 'format');
    return url.toString();
  }
  
  return src;
}
