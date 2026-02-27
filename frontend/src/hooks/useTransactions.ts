// Transaction types for UI display (local only, not from backend)
export type TransactionKind = 'deposit' | 'withdrawal' | 'transfer';

export interface LocalTransaction {
  amount: bigint;
  timestamp: bigint;
  description: string;
  transactionType: TransactionKind;
}

const MOCK_TRANSACTIONS: LocalTransaction[] = [
  {
    amount: BigInt(500000),
    timestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description: 'Salary Deposit',
    transactionType: 'deposit',
  },
  {
    amount: BigInt(150000),
    timestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description: 'Rent Payment',
    transactionType: 'withdrawal',
  },
  {
    amount: BigInt(75000),
    timestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description: 'Investment Returns',
    transactionType: 'deposit',
  },
  {
    amount: BigInt(12500),
    timestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description: 'Utility Bills',
    transactionType: 'withdrawal',
  },
  {
    amount: BigInt(200000),
    timestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description: 'Business Transfer',
    transactionType: 'transfer',
  },
  {
    amount: BigInt(50000),
    timestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description: 'Savings Transfer',
    transactionType: 'transfer',
  },
];

export function useTransactions() {
  return {
    transactions: MOCK_TRANSACTIONS,
    isLoading: false,
    refetch: () => {},
  };
}
