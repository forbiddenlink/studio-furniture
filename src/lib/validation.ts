/**
 * Input validation utilities
 */

import { VALIDATION } from './constants';
import { ValidationError } from './error-handler';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  if (email.length > VALIDATION.EMAIL.MAX_LENGTH) {
    return { 
      isValid: false, 
      error: `Email must be less than ${VALIDATION.EMAIL.MAX_LENGTH} characters` 
    };
  }

  if (!VALIDATION.EMAIL.REGEX.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
}

/**
 * Validate name (first name, last name, etc.)
 */
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.length < VALIDATION.NAME.MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `${fieldName} must be at least ${VALIDATION.NAME.MIN_LENGTH} characters` 
    };
  }

  if (name.length > VALIDATION.NAME.MAX_LENGTH) {
    return { 
      isValid: false, 
      error: `${fieldName} must be less than ${VALIDATION.NAME.MAX_LENGTH} characters` 
    };
  }

  return { isValid: true };
}

/**
 * Validate message or text content
 */
export function validateMessage(message: string): ValidationResult {
  if (!message || message.trim().length === 0) {
    return { isValid: false, error: 'Message is required' };
  }

  if (message.length < VALIDATION.MESSAGE.MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `Message must be at least ${VALIDATION.MESSAGE.MIN_LENGTH} characters` 
    };
  }

  if (message.length > VALIDATION.MESSAGE.MAX_LENGTH) {
    return { 
      isValid: false, 
      error: `Message must be less than ${VALIDATION.MESSAGE.MAX_LENGTH} characters` 
    };
  }

  return { isValid: true };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  if (!VALIDATION.PHONE.REGEX.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  return { isValid: true };
}

/**
 * Sanitize user input (prevent XSS)
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .slice(0, 1000); // Limit length
}

/**
 * Validate and sanitize contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
} {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  if (data.phone) {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error;
    }
  }

  const messageValidation = validateMessage(data.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): void {
  if (!query || query.trim().length === 0) {
    throw new ValidationError('Search query cannot be empty', 'query');
  }

  if (query.length > 200) {
    throw new ValidationError('Search query is too long', 'query');
  }
}

/**
 * Validate product quantity
 */
export function validateQuantity(quantity: number): void {
  if (!Number.isInteger(quantity)) {
    throw new ValidationError('Quantity must be a whole number', 'quantity');
  }

  if (quantity < 1) {
    throw new ValidationError('Quantity must be at least 1', 'quantity');
  }

  if (quantity > 10) {
    throw new ValidationError('Quantity cannot exceed 10', 'quantity');
  }
}
