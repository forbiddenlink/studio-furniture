import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateName,
  validateMessage,
  validatePhone,
  validateContactForm,
  validateSearchQuery,
  validateQuantity,
  sanitizeInput,
} from './validation';

describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('user@example.com').isValid).toBe(true);
    expect(validateEmail('test.user@domain.co.uk').isValid).toBe(true);
  });

  it('should reject invalid email addresses', () => {
    expect(validateEmail('').isValid).toBe(false);
    expect(validateEmail('invalid').isValid).toBe(false);
    expect(validateEmail('@example.com').isValid).toBe(false);
    expect(validateEmail('user@').isValid).toBe(false);
  });

  it('should reject emails that are too long', () => {
    const longEmail = 'a'.repeat(300) + '@example.com';
    expect(validateEmail(longEmail).isValid).toBe(false);
  });
});

describe('validateName', () => {
  it('should validate correct names', () => {
    expect(validateName('John').isValid).toBe(true);
    expect(validateName('John Doe').isValid).toBe(true);
  });

  it('should reject names that are too short', () => {
    expect(validateName('J').isValid).toBe(false);
  });

  it('should reject names that are too long', () => {
    const longName = 'a'.repeat(101);
    expect(validateName(longName).isValid).toBe(false);
  });

  it('should reject empty names', () => {
    expect(validateName('').isValid).toBe(false);
    expect(validateName('   ').isValid).toBe(false);
  });
});

describe('validateMessage', () => {
  it('should validate correct messages', () => {
    expect(validateMessage('Hello, this is a test message.').isValid).toBe(true);
  });

  it('should reject messages that are too short', () => {
    expect(validateMessage('Hello').isValid).toBe(false);
  });

  it('should reject messages that are too long', () => {
    const longMessage = 'a'.repeat(1001);
    expect(validateMessage(longMessage).isValid).toBe(false);
  });

  it('should reject empty messages', () => {
    expect(validateMessage('').isValid).toBe(false);
  });
});

describe('validatePhone', () => {
  it('should validate correct phone numbers', () => {
    expect(validatePhone('+1 (555) 123-4567').isValid).toBe(true);
    expect(validatePhone('555-123-4567').isValid).toBe(true);
    expect(validatePhone('5551234567').isValid).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    expect(validatePhone('').isValid).toBe(false);
    expect(validatePhone('abc').isValid).toBe(false);
  });
});

describe('validateContactForm', () => {
  it('should validate a complete and correct form', () => {
    const result = validateContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      message: 'This is a test message with enough characters.',
    });

    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('should return errors for invalid fields', () => {
    const result = validateContactForm({
      name: 'J',
      email: 'invalid-email',
      message: 'Short',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it('should allow phone to be optional', () => {
    const result = validateContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid message with enough characters.',
    });

    expect(result.isValid).toBe(true);
  });
});

describe('validateSearchQuery', () => {
  it('should accept valid search queries', () => {
    expect(() => validateSearchQuery('modern chair')).not.toThrow();
  });

  it('should throw for empty queries', () => {
    expect(() => validateSearchQuery('')).toThrow('Search query cannot be empty');
  });

  it('should throw for queries that are too long', () => {
    const longQuery = 'a'.repeat(201);
    expect(() => validateSearchQuery(longQuery)).toThrow('Search query is too long');
  });
});

describe('validateQuantity', () => {
  it('should accept valid quantities', () => {
    expect(() => validateQuantity(1)).not.toThrow();
    expect(() => validateQuantity(5)).not.toThrow();
    expect(() => validateQuantity(10)).not.toThrow();
  });

  it('should throw for non-integer quantities', () => {
    expect(() => validateQuantity(1.5)).toThrow('Quantity must be a whole number');
  });

  it('should throw for quantities less than 1', () => {
    expect(() => validateQuantity(0)).toThrow('Quantity must be at least 1');
    expect(() => validateQuantity(-1)).toThrow('Quantity must be at least 1');
  });

  it('should throw for quantities greater than 10', () => {
    expect(() => validateQuantity(11)).toThrow('Quantity cannot exceed 10');
  });
});

describe('sanitizeInput', () => {
  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should remove HTML tags', () => {
    expect(sanitizeInput('hello<script>alert("xss")</script>world')).toBe(
      'helloscriptalert("xss")/scriptworld'
    );
  });

  it('should limit length', () => {
    const longInput = 'a'.repeat(1500);
    expect(sanitizeInput(longInput).length).toBe(1000);
  });
});
