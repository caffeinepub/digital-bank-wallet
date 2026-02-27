import React from 'react';
import { Wallet, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils/formatters';

export default function AccountsOverview() {
  const { checkingBalance, isLoading } = useBalance();

  return (
    <div className="space-y-4">
      <h2 className="text-chase-navy font-bold text-lg">Account Summary</h2>

      {/* Checking Account */}
      <div className="rounded-2xl bg-gradient-to-br from-chase-navy to-chase-navy-dark p-5 shadow-chase">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider">Checking Account</p>
            <p className="text-white/70 text-sm font-mono mt-0.5">••••4821</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Wallet size={20} className="text-white" />
          </div>
        </div>
        <div>
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Available Balance</p>
          {isLoading ? (
            <Skeleton className="h-8 w-36 bg-white/20" />
          ) : (
            <p className="text-white text-3xl font-bold">{formatCurrency(checkingBalance)}</p>
          )}
        </div>
      </div>

      {/* Info note */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info size={16} className="text-chase-navy mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-chase-navy text-xs font-medium mb-1">Account Information</p>
          <p className="text-chase-muted text-xs">
            Your balance is updated in real-time after every deposit, withdrawal, or transfer. Contact support for account inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}
