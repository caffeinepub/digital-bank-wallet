import { useGetBalance } from '../hooks/useBalance';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { formatCurrency } from '../utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export default function MobileBalanceCard() {
  const { data: balance, isLoading: balanceLoading } = useGetBalance();
  const { data: userProfile } = useGetCallerUserProfile();

  const userName = userProfile?.name ?? 'there';

  return (
    <div className="mx-5 mb-2 rounded-2xl p-5" style={{ background: 'oklch(1 0 0 / 0.12)' }}>
      {/* Greeting */}
      <p className="text-white/80 text-base font-medium mb-3 text-center">
        Hello, <span className="text-white font-bold">{userName}</span>
      </p>

      {/* Balance */}
      <div className="text-center">
        <p className="text-white/70 text-sm mb-1 tracking-wide">Your Balance</p>
        {balanceLoading ? (
          <Skeleton className="h-10 w-40 mx-auto rounded-lg" style={{ background: 'oklch(1 0 0 / 0.15)' }} />
        ) : (
          <p className="text-4xl font-bold text-white tracking-tight">
            {formatCurrency(balance ?? BigInt(0))}
          </p>
        )}
        <p className="text-white/60 text-sm mt-2 tracking-wide">Available Balance</p>
      </div>
    </div>
  );
}
