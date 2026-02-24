import { useGetBalance } from '../hooks/useBalance';
import { useGetTransactions } from '../hooks/useTransactions';
import { useInitializeAccount } from '../hooks/useQueries';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import BalanceCard from '../components/BalanceCard';
import RecentTransactionsList from '../components/RecentTransactionsList';
import QuickActions from '../components/QuickActions';
import VirtualCard from '../components/VirtualCard';
import AccountsOverview from '../components/AccountsOverview';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useGetBalance();
  const { data: transactions, isLoading: transactionsLoading } = useGetTransactions();
  const { data: userProfile } = useGetCallerUserProfile();
  const initializeAccount = useInitializeAccount();

  const needsInitialization = balanceError?.message?.includes('Account not found');

  useEffect(() => {
    if (needsInitialization && !initializeAccount.isPending) {
      initializeAccount.mutate();
    }
  }, [needsInitialization]);

  if (balanceLoading || initializeAccount.isPending) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto" style={{ color: 'oklch(0.78 0.14 75)' }} />
            <p className="text-muted-foreground font-medium">
              {initializeAccount.isPending ? 'Setting up your account...' : 'Loading your dashboard...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (balanceError && !needsInitialization) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load your account. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const recentTransactions = transactions
    ? [...transactions].sort((a, b) => Number(b.timestamp - a.timestamp)).slice(0, 5)
    : [];

  const userName = userProfile?.name;

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.96 0.008 240)' }}>
      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6 animate-fade-in">

        {/* Balance Card */}
        <BalanceCard balance={balance ?? BigInt(0)} userName={userName} />

        {/* Virtual Card */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h2 className="text-lg font-bold text-foreground mb-4">My Card</h2>
          <VirtualCard
            cardholderName={userName ?? 'Account Holder'}
            lastFour="4291"
            expiry="08/28"
          />
        </div>

        {/* Accounts Overview */}
        <AccountsOverview />

        {/* Quick Actions */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <QuickActions />
        </div>

        {/* Recent Transactions */}
        <RecentTransactionsList
          transactions={recentTransactions}
          isLoading={transactionsLoading}
        />

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}
