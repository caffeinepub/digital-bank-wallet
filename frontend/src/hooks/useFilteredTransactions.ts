import { useMemo } from 'react';
import type { LocalTransaction, TransactionKind } from './useTransactions';

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export function useFilteredTransactions(
  transactions: LocalTransaction[],
  typeFilter: TransactionKind | 'all',
  sortOption: SortOption
) {
  return useMemo(() => {
    let filtered = [...transactions];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.transactionType === typeFilter);
    }

    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return Number(b.timestamp - a.timestamp);
        case 'date-asc':
          return Number(a.timestamp - b.timestamp);
        case 'amount-desc':
          return Number(b.amount - a.amount);
        case 'amount-asc':
          return Number(a.amount - b.amount);
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, typeFilter, sortOption]);
}
