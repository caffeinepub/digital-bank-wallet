import { useGetTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/formatters';
import { TransactionType } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, ShoppingCart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

function getRelativeDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} Days Ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function TransactionIcon({ type }: { type: TransactionType }) {
  const iconProps = { className: 'w-5 h-5' };
  if (type === TransactionType.deposit) {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.60 0.18 145 / 0.12)' }}>
        <ArrowDownToLine {...iconProps} style={{ color: 'oklch(0.50 0.18 145)' }} />
      </div>
    );
  }
  if (type === TransactionType.withdrawal) {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.55 0.22 25 / 0.12)' }}>
        <ArrowUpFromLine {...iconProps} style={{ color: 'oklch(0.50 0.20 25)' }} />
      </div>
    );
  }
  if (type === TransactionType.transfer) {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.28 0.07 240 / 0.10)' }}>
        <ArrowLeftRight {...iconProps} style={{ color: 'oklch(0.28 0.07 240)' }} />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.93 0.015 240)' }}>
      <ShoppingCart {...iconProps} style={{ color: 'oklch(0.52 0.025 240)' }} />
    </div>
  );
}

export default function MobileRecentTransactions() {
  const { data: transactions, isLoading } = useGetTransactions();

  const recentTransactions = transactions
    ? [...transactions].sort((a, b) => Number(b.timestamp - a.timestamp)).slice(0, 5)
    : [];

  const isCredit = (type: TransactionType) => type === TransactionType.deposit;

  return (
    <div className="px-5 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold" style={{ color: 'oklch(0.15 0.025 240)' }}>
          Recent Transactions
        </h2>
        <Link
          to="/transactions"
          className="text-xs font-semibold transition-colors"
          style={{ color: 'oklch(0.28 0.07 240)' }}
        >
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-32 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      ) : recentTransactions.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-10 h-10 mx-auto mb-2" style={{ color: 'oklch(0.75 0.015 240)' }} />
          <p className="text-sm" style={{ color: 'oklch(0.52 0.025 240)' }}>No transactions yet</p>
          <p className="text-xs mt-1" style={{ color: 'oklch(0.65 0.015 240)' }}>
            Your transactions will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {recentTransactions.map((tx, idx) => {
            const credit = isCredit(tx.transactionType);
            return (
              <div
                key={idx}
                className="flex items-center gap-3 py-3 border-b last:border-b-0"
                style={{ borderColor: 'oklch(0.92 0.010 240)' }}
              >
                <TransactionIcon type={tx.transactionType} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'oklch(0.18 0.04 240)' }}>
                    {tx.description || (tx.transactionType === TransactionType.deposit ? 'Deposit' : tx.transactionType === TransactionType.withdrawal ? 'Withdrawal' : 'Transfer')}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(0.55 0.020 240)' }}>
                    {getRelativeDate(tx.timestamp)}
                  </p>
                </div>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: credit ? 'oklch(0.50 0.18 145)' : 'oklch(0.50 0.20 25)' }}
                >
                  {credit ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
