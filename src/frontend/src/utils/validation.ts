import { Principal } from '@dfinity/principal';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateAmount(amount: string): ValidationResult {
  if (!amount || amount.trim() === '') {
    return { isValid: false, error: 'Amount is required' };
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: 'Amount must be greater than zero' };
  }

  if (numAmount > 1000000000) {
    return { isValid: false, error: 'Amount is too large' };
  }

  return { isValid: true };
}

export function validatePrincipal(principalText: string): ValidationResult {
  if (!principalText || principalText.trim() === '') {
    return { isValid: false, error: 'Principal ID is required' };
  }

  try {
    Principal.fromText(principalText.trim());
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid Principal ID format' };
  }
}

export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
}
