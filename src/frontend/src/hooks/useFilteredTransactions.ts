import { useState, useMemo } from 'react';
import { Transaction } from '../backend';

export function useFilteredTransactions(transactions: Transaction[]) {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((t) => t.transactionType === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
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
  }, [transactions, filterType, sortBy]);

  return {
    filteredTransactions,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
  };
}
