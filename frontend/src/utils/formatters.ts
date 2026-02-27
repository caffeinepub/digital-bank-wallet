import type { TransactionKind } from '../hooks/useTransactions';

export function formatCurrency(amount: bigint | number): string {
  const cents = typeof amount === 'bigint' ? Number(amount) : amount;
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}

export function formatDate(timestamp: bigint | number): string {
  // Backend timestamps are in nanoseconds
  const ms = typeof timestamp === 'bigint'
    ? Number(timestamp / BigInt(1_000_000))
    : timestamp;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
}

export function formatRelativeDate(timestamp: bigint | number): string {
  const ms = typeof timestamp === 'bigint'
    ? Number(timestamp / BigInt(1_000_000))
    : timestamp;
  const now = Date.now();
  const diff = now - ms;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return formatDate(timestamp);
}

export function getTransactionTypeLabel(type: TransactionKind): string {
  switch (type) {
    case 'deposit': return 'Deposit';
    case 'withdrawal': return 'Withdrawal';
    case 'transfer': return 'Transfer';
    default: return 'Transaction';
  }
}
