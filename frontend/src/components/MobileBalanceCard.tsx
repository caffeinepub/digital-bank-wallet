import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useGetBalance } from '../hooks/useBalance';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { formatCurrency } from '../utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export default function MobileBalanceCard() {
  const { data: balance, isLoading: balanceLoading } = useGetBalance();
  const { data: userProfile } = useGetCallerUserProfile();
  const [showBalance, setShowBalance] = useState(true);

  const userName = userProfile?.name ?? 'there';

  return (
    <div className="mx-5 mb-2 rounded-2xl px-5 py-3" style={{ background: 'oklch(1 0 0 / 0.12)' }}>
      {/* Greeting */}
      <p className="text-white/80 text-sm font-medium mb-2 text-center">
        Hello, <span className="text-white font-bold">{userName}</span>
      </p>

      {/* Balance */}
      <div className="text-center">
        <p className="text-white/70 text-xs mb-1 tracking-wide">Your Balance</p>
        {balanceLoading ? (
          <Skeleton className="h-8 w-36 mx-auto rounded-lg" style={{ background: 'oklch(1 0 0 / 0.15)' }} />
        ) : (
          <div className="flex items-center justify-center gap-2">
            <p className="text-3xl font-bold text-white tracking-tight">
              {showBalance ? formatCurrency(balance ?? BigInt(0)) : '••••••'}
            </p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: 'oklch(1 0 0 / 0.15)',
                border: '1px solid oklch(1 0 0 / 0.2)',
              }}
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? (
                <EyeOff className="w-3.5 h-3.5 text-white/80" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-white/80" />
              )}
            </button>
          </div>
        )}
        <p className="text-white/60 text-xs mt-1 tracking-wide">Available Balance</p>
      </div>
    </div>
  );
}
