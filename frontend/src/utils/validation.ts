export function validateAmount(value: string): string {
  if (!value || value.trim() === '') return 'Amount is required.';
  const num = parseFloat(value);
  if (isNaN(num)) return 'Please enter a valid amount.';
  if (num <= 0) return 'Amount must be greater than zero.';
  if (num > 1_000_000) return 'Amount cannot exceed $1,000,000.';
  return '';
}

export function validatePrincipal(value: string): string {
  if (!value || value.trim() === '') return 'Recipient Principal ID is required.';
  // Basic format check: principal IDs contain alphanumeric chars and hyphens
  const principalRegex = /^[a-z0-9]([a-z0-9-]{0,60}[a-z0-9])?(-[a-z0-9]{2,5})*$/i;
  if (!principalRegex.test(value.trim())) return 'Invalid Principal ID format.';
  return '';
}

export function validateEmail(value: string): string {
  if (!value || value.trim() === '') return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Please enter a valid email address.';
  return '';
}
