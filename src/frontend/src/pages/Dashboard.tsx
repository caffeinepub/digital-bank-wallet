import { useGetBalance } from '../hooks/useBalance';
import { useGetTransactions } from '../hooks/useTransactions';
import { useInitializeAccount } from '../hooks/useQueries';
import BalanceCard from '../components/BalanceCard';
import RecentTransactionsList from '../components/RecentTransactionsList';
import QuickActions from '../components/QuickActions';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useGetBalance();
  const { data: transactions, isLoading: transactionsLoading } = useGetTransactions();
  const initializeAccount = useInitializeAccount();

  const needsInitialization = balanceError?.message?.includes('Account not found');

  useEffect(() => {
    if (needsInitialization && !initializeAccount.isPending) {
      initializeAccount.mutate();
    }
  }, [needsInitialization]);

  if (balanceLoading || initializeAccount.isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">
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

  const recentTransactions = transactions?.slice(0, 5) || [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[oklch(0.35_0.08_60)] to-[oklch(0.25_0.06_45)] text-white p-8 md:p-12"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1200x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-white/90 text-lg">Manage your finances with confidence</p>
        </div>
      </div>

      {/* Balance and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceCard balance={balance || BigInt(0)} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <RecentTransactionsList 
          transactions={recentTransactions} 
          isLoading={transactionsLoading}
        />
      </div>
    </div>
  );
}
