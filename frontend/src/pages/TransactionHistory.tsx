import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import TransactionTable from '../components/TransactionTable';
import TransactionFilters from '../components/TransactionFilters';
import type { TransactionKind } from '../hooks/useTransactions';

const ITEMS_PER_PAGE = 10;

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { transactions, isLoading } = useTransactions();
  const [typeFilter, setTypeFilter] = useState<TransactionKind | 'all'>('all');
  const [sortOption, setSortOption] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useFilteredTransactions(transactions, typeFilter, sortOption);

  const handleTypeChange = (val: string) => {
    setTypeFilter(val as TransactionKind | 'all');
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortOption(val as 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-chase-bg">
      {/* Header */}
      <div className="bg-chase-navy px-4 pt-safe-top pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 pt-3">
          <button
            onClick={() => navigate({ to: '/' })}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Transaction History</h1>
            <p className="text-white/60 text-xs">All your transactions</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-2xl mx-auto">
        {/* Filters */}
        <div className="mb-4">
          <TransactionFilters
            typeFilter={typeFilter}
            sortOption={sortOption}
            onTypeChange={handleTypeChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <TransactionTable
            transactions={filtered}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
