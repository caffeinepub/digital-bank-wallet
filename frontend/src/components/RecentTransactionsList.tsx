import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle, Clock } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@tanstack/react-router';
import type { LocalTransaction, TransactionKind } from '../hooks/useTransactions';

interface RecentTransactionsListProps {
  transactions: LocalTransaction[];
  isLoading: boolean;
}

function getTransactionIcon(type: TransactionKind) {
  switch (type) {
    case 'deposit':
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'oklch(0.60 0.18 145 / 0.12)' }}>
          <ArrowDownCircle className="w-5 h-5" style={{ color: 'oklch(0.55 0.18 145)' }} />
        </div>
      );
    case 'withdrawal':
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'oklch(0.55 0.22 25 / 0.12)' }}>
          <ArrowUpCircle className="w-5 h-5" style={{ color: 'oklch(0.55 0.22 25)' }} />
        </div>
      );
    case 'transfer':
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'oklch(0.28 0.07 240 / 0.12)' }}>
          <ArrowRightCircle className="w-5 h-5" style={{ color: 'oklch(0.45 0.10 240)' }} />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
          <Clock className="w-5 h-5 text-muted-foreground" />
        </div>
      );
  }
}

function getAmountDisplay(type: TransactionKind, amount: bigint) {
  const formatted = formatCurrency(amount);
  if (type === 'deposit') {
    return <span className="font-semibold text-sm" style={{ color: 'oklch(0.50 0.18 145)' }}>+{formatted}</span>;
  }
  return <span className="font-semibold text-sm" style={{ color: 'oklch(0.55 0.22 25)' }}>-{formatted}</span>;
}

function getTypeLabel(type: TransactionKind): string {
  switch (type) {
    case 'deposit': return 'Deposit';
    case 'withdrawal': return 'Withdrawal';
    case 'transfer': return 'Transfer';
    default: return 'Transaction';
  }
}

export default function RecentTransactionsList({ transactions, isLoading }: RecentTransactionsListProps) {
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        <Link
          to="/transactions"
          className="text-sm font-semibold transition-colors hover:underline"
          style={{ color: 'oklch(0.28 0.07 240)' }}
        >
          View All →
        </Link>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <Clock className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">No transactions yet</p>
            <p className="text-sm text-muted-foreground">
              Your recent activity will appear here once you make your first transaction.
            </p>
          </div>
        ) : (
          <div>
            {transactions.slice(0, 5).map((tx, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-4 py-3.5 border-b border-border last:border-0 hover:bg-muted/40 transition-colors duration-150"
              >
                {getTransactionIcon(tx.transactionType)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {tx.description || getTypeLabel(tx.transactionType)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(tx.timestamp)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  {getAmountDisplay(tx.transactionType, tx.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
