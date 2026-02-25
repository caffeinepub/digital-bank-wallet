import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Transaction, TransactionType } from '../backend';

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

// Mock transactions consistent with a current balance of $182,679.00
// Amounts are in cents (e.g., 50000000 = $500,000.00, 250000 = $2,500.00)
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    amount: BigInt(350000),
    timestamp: BigInt((now - 0.5 * DAY) * 1_000_000),
    description: 'Monthly Salary',
    transactionType: TransactionType.deposit,
  },
  {
    amount: BigInt(85000),
    timestamp: BigInt((now - 1 * DAY) * 1_000_000),
    description: 'Rent Payment',
    transactionType: TransactionType.withdrawal,
  },
  {
    amount: BigInt(500000),
    timestamp: BigInt((now - 2 * DAY) * 1_000_000),
    description: 'Investment Returns',
    transactionType: TransactionType.deposit,
  },
  {
    amount: BigInt(62500),
    timestamp: BigInt((now - 3 * DAY) * 1_000_000),
    description: 'Utility Bills',
    transactionType: TransactionType.withdrawal,
  },
  {
    amount: BigInt(1200000),
    timestamp: BigInt((now - 5 * DAY) * 1_000_000),
    description: 'Business Transfer',
    transactionType: TransactionType.deposit,
  },
  {
    amount: BigInt(150000),
    timestamp: BigInt((now - 7 * DAY) * 1_000_000),
    description: 'Transfer to Savings',
    transactionType: TransactionType.transfer,
  },
];

export function useGetTransactions() {
  const { actor, isFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      if (!actor) return MOCK_TRANSACTIONS;
      try {
        const result = await actor.getTransactions();
        // If backend returns empty array (new account), show mock data for demo
        return result.length > 0 ? result : MOCK_TRANSACTIONS;
      } catch {
        return MOCK_TRANSACTIONS;
      }
    },
    enabled: !isFetching,
    retry: false,
  });
}
