/**
 * Rate limiting middleware for API routes
 * Prevents abuse and ensures fair usage
 */

import { AppError, RateLimitError } from './error-handler';
import { API } from './constants';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production)
const rateLimitStore: RateLimitStore = {};

/**
 * Clean up expired entries from the rate limit store
 */
function cleanup() {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}

// Run cleanup every minute
if (typeof window === 'undefined') {
  setInterval(cleanup, 60000);
}

/**
 * Get client identifier from request
 */
function getClientId(req: Request): string {
  // Try to get IP address from various headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');

  const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
  
  // For authenticated users, you could also use user ID
  // const userId = req.headers.get('x-user-id');
  // return userId || ip;

  return ip;
}

/**
 * Rate limit options
 */
export interface RateLimitOptions {
  /**
   * Maximum number of requests allowed in the time window
   * @default 100
   */
  maxRequests?: number;

  /**
   * Time window in milliseconds
   * @default 900000 (15 minutes)
   */
  windowMs?: number;

  /**
   * Unique identifier for this rate limiter
   * @default 'default'
   */
  identifier?: string;
}

/**
 * Rate limiter middleware
 * 
 * @example
 * ```ts
 * export async function POST(req: Request) {
 *   await rateLimit(req, { maxRequests: 50, windowMs: 60000 });
 *   // ... rest of handler
 * }
 * ```
 */
export async function rateLimit(
  req: Request,
  options: RateLimitOptions = {}
): Promise<void> {
  const {
    maxRequests = API.RATE_LIMIT.MAX_REQUESTS,
    windowMs = API.RATE_LIMIT.WINDOW_MS,
    identifier = 'default',
  } = options;

  const clientId = getClientId(req);
  const key = `${identifier}:${clientId}`;
  const now = Date.now();

  // Get or create rate limit entry
  let entry = rateLimitStore[key];

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired entry
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore[key] = entry;
  } else {
    // Increment count
    entry.count++;
  }

  // Check if limit exceeded
  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    
    throw new RateLimitError(
      `Rate limit exceeded. Try again in ${retryAfter} seconds.`
    );
  }
}

/**
 * Get rate limit headers for response
 */
export function getRateLimitHeaders(
  req: Request,
  options: RateLimitOptions = {}
): Record<string, string> {
  const {
    maxRequests = API.RATE_LIMIT.MAX_REQUESTS,
    identifier = 'default',
  } = options;

  const clientId = getClientId(req);
  const key = `${identifier}:${clientId}`;
  const entry = rateLimitStore[key];

  if (!entry) {
    return {
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': maxRequests.toString(),
    };
  }

  const remaining = Math.max(0, maxRequests - entry.count);
  const resetTime = Math.ceil(entry.resetTime / 1000);

  return {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': resetTime.toString(),
  };
}

/**
 * Create a rate limiter for specific routes
 */
export function createRateLimiter(options: RateLimitOptions = {}) {
  return async (req: Request) => {
    await rateLimit(req, options);
    return getRateLimitHeaders(req, options);
  };
}

/**
 * Different rate limiters for different purposes
 */
export const rateLimiters = {
  /**
   * Default rate limiter (100 requests per 15 minutes)
   */
  default: createRateLimiter(),

  /**
   * Strict rate limiter for expensive operations (10 requests per minute)
   */
  strict: createRateLimiter({
    maxRequests: 10,
    windowMs: 60000,
    identifier: 'strict',
  }),

  /**
   * AI chat rate limiter (30 messages per 5 minutes)
   */
  aiChat: createRateLimiter({
    maxRequests: 30,
    windowMs: 300000,
    identifier: 'ai-chat',
  }),

  /**
   * Search rate limiter (50 searches per 5 minutes)
   */
  search: createRateLimiter({
    maxRequests: 50,
    windowMs: 300000,
    identifier: 'search',
  }),
};
