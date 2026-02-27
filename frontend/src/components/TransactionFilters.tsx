import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TransactionFiltersProps {
  typeFilter: string;
  sortOption: string;
  onTypeChange: (val: string) => void;
  onSortChange: (val: string) => void;
}

export default function TransactionFilters({
  typeFilter,
  sortOption,
  onTypeChange,
  onSortChange,
}: TransactionFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="flex-1 rounded-xl border-chase-border text-chase-navy text-sm">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="deposit">Deposits</SelectItem>
          <SelectItem value="withdrawal">Withdrawals</SelectItem>
          <SelectItem value="transfer">Transfers</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="flex-1 rounded-xl border-chase-border text-chase-navy text-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Newest First</SelectItem>
          <SelectItem value="date-asc">Oldest First</SelectItem>
          <SelectItem value="amount-desc">Highest Amount</SelectItem>
          <SelectItem value="amount-asc">Lowest Amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
