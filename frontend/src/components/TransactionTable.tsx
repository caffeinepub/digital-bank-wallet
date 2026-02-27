import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle, Clock } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Badge } from '@/components/ui/badge';
import type { LocalTransaction, TransactionKind } from '../hooks/useTransactions';

interface TransactionTableProps {
  transactions: LocalTransaction[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

function getIcon(type: TransactionKind) {
  switch (type) {
    case 'deposit':
      return <ArrowDownCircle size={18} style={{ color: 'oklch(0.55 0.18 145)' }} />;
    case 'withdrawal':
      return <ArrowUpCircle size={18} style={{ color: 'oklch(0.55 0.22 25)' }} />;
    case 'transfer':
      return <ArrowRightCircle size={18} style={{ color: 'oklch(0.45 0.10 240)' }} />;
    default:
      return <Clock size={18} className="text-muted-foreground" />;
  }
}

function getBadgeVariant(type: TransactionKind): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'deposit': return 'default';
    case 'withdrawal': return 'destructive';
    case 'transfer': return 'secondary';
    default: return 'outline';
  }
}

function getTypeLabel(type: TransactionKind): string {
  switch (type) {
    case 'deposit': return 'Deposit';
    case 'withdrawal': return 'Withdrawal';
    case 'transfer': return 'Transfer';
    default: return 'Transaction';
  }
}

export default function TransactionTable({
  transactions,
  currentPage,
  itemsPerPage,
  onPageChange,
}: TransactionTableProps) {
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = transactions.slice(start, start + itemsPerPage);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="font-semibold text-foreground mb-1">No transactions found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or make your first transaction.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {paginated.map((tx, i) => {
          const isCredit = tx.transactionType === 'deposit';
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:bg-muted/30 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: tx.transactionType === 'deposit'
                    ? 'oklch(0.60 0.18 145 / 0.12)'
                    : tx.transactionType === 'withdrawal'
                    ? 'oklch(0.55 0.22 25 / 0.12)'
                    : 'oklch(0.28 0.07 240 / 0.12)',
                }}
              >
                {getIcon(tx.transactionType)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {tx.description || getTypeLabel(tx.transactionType)}
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(tx.timestamp)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={getBadgeVariant(tx.transactionType)} className="text-xs hidden sm:inline-flex">
                  {getTypeLabel(tx.transactionType)}
                </Badge>
                <span
                  className="text-sm font-bold"
                  style={{
                    color: isCredit ? 'oklch(0.50 0.18 145)' : 'oklch(0.55 0.22 25)',
                  }}
                >
                  {isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {start + 1}–{Math.min(start + itemsPerPage, transactions.length)} of {transactions.length}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  page === currentPage
                    ? 'bg-chase-navy text-white border-chase-navy'
                    : 'border-border text-foreground hover:bg-muted'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
