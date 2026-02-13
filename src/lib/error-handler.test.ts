import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  RateLimitError,
  formatErrorResponse,
} from './error-handler';

describe('AppError', () => {
  it('should create an error with all properties', () => {
    const error = new AppError('Test error', 'TEST_ERROR', 400);
    
    expect(error.message).toBe('Test error');
    expect(error.code).toBe('TEST_ERROR');
    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
  });

  it('should default to status 500', () => {
    const error = new AppError('Test error', 'TEST_ERROR');
    expect(error.statusCode).toBe(500);
  });
});

describe('ValidationError', () => {
  it('should create a validation error with field', () => {
    const error = new ValidationError('Invalid email', 'email');
    
    expect(error.message).toBe('Invalid email');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
    expect(error.field).toBe('email');
  });
});

describe('NotFoundError', () => {
  it('should create a not found error', () => {
    const error = new NotFoundError();
    
    expect(error.message).toBe('Resource not found');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.statusCode).toBe(404);
  });

  it('should accept custom message', () => {
    const error = new NotFoundError('Product not found');
    expect(error.message).toBe('Product not found');
  });
});

describe('UnauthorizedError', () => {
  it('should create an unauthorized error', () => {
    const error = new UnauthorizedError();
    
    expect(error.message).toBe('Unauthorized access');
    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.statusCode).toBe(401);
  });
});

describe('RateLimitError', () => {
  it('should create a rate limit error', () => {
    const error = new RateLimitError();
    
    expect(error.message).toBe('Too many requests');
    expect(error.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(error.statusCode).toBe(429);
  });
});

describe('formatErrorResponse', () => {
  it('should format AppError correctly', () => {
    const error = new AppError('Test error', 'TEST_ERROR', 400);
    const formatted = formatErrorResponse(error);
    
    expect(formatted.error.message).toBe('Test error');
    expect(formatted.error.code).toBe('TEST_ERROR');
  });

  it('should include field for ValidationError', () => {
    const error = new ValidationError('Invalid email', 'email');
    const formatted = formatErrorResponse(error);
    
    expect(formatted.error.field).toBe('email');
  });

  it('should not expose details for non-AppError in production', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true });

    const error = new Error('Internal error');
    const formatted = formatErrorResponse(error);

    expect(formatted.error.message).toBe('An unexpected error occurred');
    expect(formatted.error.code).toBe('INTERNAL_ERROR');

    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true });
  });

  it('should include stack trace in development', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true });

    const error = new AppError('Test error', 'TEST_ERROR');
    const formatted = formatErrorResponse(error);

    expect(formatted.error.stack).toBeDefined();

    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true });
  });
});
