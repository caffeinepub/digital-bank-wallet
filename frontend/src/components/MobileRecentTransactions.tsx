import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowDownCircle, ArrowUpCircle, ArrowLeftRight, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency, formatRelativeDate } from '../utils/formatters';

export default function MobileRecentTransactions() {
  const navigate = useNavigate();
  const { transactions, isLoading } = useTransactions();
  const recent = transactions.slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-chase-navy font-semibold text-sm uppercase tracking-wider">Recent Activity</h3>
        <button
          onClick={() => navigate({ to: '/transactions' })}
          className="text-chase-navy text-xs font-medium flex items-center gap-1 hover:text-chase-gold-dark transition-colors"
        >
          See all <ExternalLink size={12} />
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-3.5 w-32 mb-1.5" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : recent.length === 0 ? (
        <div className="text-center py-8">
          <ArrowLeftRight size={32} className="text-chase-muted mx-auto mb-2 opacity-40" />
          <p className="text-chase-muted text-sm">No transactions yet</p>
          <p className="text-chase-muted text-xs mt-1">Make a deposit to get started</p>
        </div>
      ) : (
        <div className="space-y-1">
          {recent.map((tx, i) => {
            const isCredit = tx.transactionType === 'deposit';
            const Icon = isCredit ? ArrowDownCircle : ArrowUpCircle;
            const iconColor = isCredit ? 'text-emerald-500' : 'text-red-400';
            const iconBg = isCredit ? 'bg-emerald-50' : 'bg-red-50';
            const amountColor = isCredit ? 'text-emerald-600' : 'text-red-500';
            const sign = isCredit ? '+' : '-';

            return (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-chase-border/50 last:border-0">
                <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-chase-navy text-sm font-medium truncate">{tx.description}</p>
                  <p className="text-chase-muted text-xs">{formatRelativeDate(tx.timestamp)}</p>
                </div>
                <span className={`text-sm font-semibold ${amountColor} flex-shrink-0`}>
                  {sign}{formatCurrency(tx.amount)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
