import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransferPage from './pages/TransferPage';
import TransactionHistory from './pages/TransactionHistory';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useGetCallerUserProfile } from './hooks/useUserProfile';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const rootRoute = createRootRoute({
  component: LayoutWrapper,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const depositRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deposit',
  component: DepositPage,
});

const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/withdraw',
  component: WithdrawPage,
});

const transferRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transfer',
  component: TransferPage,
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions',
  component: TransactionHistory,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  depositRoute,
  withdrawRoute,
  transferRoute,
  transactionsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppContent() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Show login prompt when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(0.97_0.01_60)] via-background to-[oklch(0.95_0.015_45)]">
        <div className="text-center space-y-6 p-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/generated/bank-icon.dim_256x256.png" 
              alt="BlueStone Bank Icon" 
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Welcome to BlueStone Bank</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Secure, modern banking at your fingertips. Please log in to access your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      {showProfileSetup && (
        <ProfileSetupModal
          onComplete={() => {
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppContent />
      <Toaster />
    </ThemeProvider>
  );
}
