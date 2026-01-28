/**
 * Centralized error handling and logging utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.field = field;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string, public service: string) {
    super(message, 'EXTERNAL_SERVICE_ERROR', 503);
    this.service = service;
  }
}

/**
 * Logger utility with different log levels
 */
export const logger = {
  error: (message: string, error?: Error | AppError, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ [ERROR]', message, {
        error: error?.message,
        stack: error?.stack,
        ...context,
      });
    }
    // In production, you would send this to a logging service like Sentry
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Sentry.captureException(error, { contexts: { custom: context } });
    }
  },

  warn: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  [WARN]', message, context);
    }
  },

  info: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.info('ℹ️  [INFO]', message, context);
    }
  },

  debug: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('🐛 [DEBUG]', message, context);
    }
  },
};

/**
 * Safe async error wrapper for API routes
 */
export function asyncHandler<T>(
  fn: (...args: unknown[]) => Promise<T>
) {
  return async (...args: unknown[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      logger.error('Unhandled error in async handler', error as Error);
      throw new AppError(
        'An unexpected error occurred',
        'INTERNAL_ERROR',
        500,
        false
      );
    }
  };
}

/**
 * Format error for API response
 */
export function formatErrorResponse(error: Error | AppError) {
  if (error instanceof AppError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        ...(error instanceof ValidationError && { field: error.field }),
      },
    };
  }

  // Don't expose internal error details in production
  if (process.env.NODE_ENV === 'production') {
    return {
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
      },
    };
  }

  return {
    error: {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      stack: error.stack,
    },
  };
}

/**
 * Client-side error boundary helper
 */
export function handleClientError(error: Error, componentName?: string) {
  logger.error(`Error in ${componentName || 'component'}`, error);
  
  // Show user-friendly toast notification
  const userMessage = error instanceof AppError 
    ? error.message 
    : 'Something went wrong. Please try again.';
  
  return userMessage;
}
