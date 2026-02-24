import { useGetBalance } from '../hooks/useBalance';
import { useGetTransactions } from '../hooks/useTransactions';
import { useInitializeAccount } from '../hooks/useQueries';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';
import MobileTopBar from '../components/MobileTopBar';
import MobileBalanceCard from '../components/MobileBalanceCard';
import MobileQuickActions from '../components/MobileQuickActions';
import MobileRecentTransactions from '../components/MobileRecentTransactions';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Dashboard() {
  const { isLoading: balanceLoading, error: balanceError } = useGetBalance();
  const { isLoading: _transactionsLoading } = useGetTransactions();
  const initializeAccount = useInitializeAccount();

  const needsInitialization = balanceError?.message?.includes('Account not found');

  useEffect(() => {
    if (needsInitialization && !initializeAccount.isPending) {
      initializeAccount.mutate();
    }
  }, [needsInitialization]);

  if (balanceLoading || initializeAccount.isPending) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'oklch(0.22 0.08 240)' }}
      >
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-white" />
          <p className="text-white/70 font-medium">
            {initializeAccount.isPending ? 'Setting up your account...' : 'Loading your dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  if (balanceError && !needsInitialization) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load your account. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'oklch(0.96 0.008 240)' }}
    >
      {/* Centered mobile-width container */}
      <div className="flex-1 mx-auto w-full max-w-md flex flex-col">

        {/* Blue header section */}
        <div
          className="flex-shrink-0"
          style={{
            background: 'linear-gradient(160deg, oklch(0.22 0.09 240) 0%, oklch(0.32 0.10 230) 100%)',
          }}
        >
          <MobileTopBar notificationCount={2} />
          <MobileBalanceCard />
          <MobileQuickActions />
        </div>

        {/* White content section with rounded top corners */}
        <div
          className="flex-1 rounded-t-3xl shadow-navy pb-28"
          style={{ background: 'oklch(0.98 0.004 240)' }}
        >
          <MobileRecentTransactions />
        </div>
      </div>

      {/* Fixed bottom nav */}
      <MobileBottomNav activeTab="home" />
    </div>
  );
}
