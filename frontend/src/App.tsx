import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransferPage from './pages/TransferPage';
import TransactionHistory from './pages/TransactionHistory';
import AccountsPage from './pages/AccountsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {
  loadSession,
  clearSession,
  type EmailPasswordUser,
} from './hooks/useEmailPasswordAuth';

const queryClient = new QueryClient();

// ─── Route components ────────────────────────────────────────────────────────

function AppRoot() {
  const [currentUser, setCurrentUser] = useState<EmailPasswordUser | null>(() => loadSession());

  const handleLoginSuccess = (user: EmailPasswordUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    queryClient.clear();
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard onLogout={handleLogout} currentUser={currentUser} />;
}

function RegisterRoute() {
  const navigate = useNavigate();
  return (
    <RegisterPage
      onSuccess={() => navigate({ to: '/login' })}
      onGoToLogin={() => navigate({ to: '/login' })}
    />
  );
}

function LoginRoute() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<EmailPasswordUser | null>(() => loadSession());

  useEffect(() => {
    if (currentUser) {
      navigate({ to: '/' });
    }
  }, [currentUser, navigate]);

  const handleLoginSuccess = (user: EmailPasswordUser) => {
    setCurrentUser(user);
    navigate({ to: '/' });
  };

  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onGoToRegister={() => navigate({ to: '/register' })}
    />
  );
}

// ─── Router setup ─────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AppRoot,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginRoute,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterRoute,
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

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/accounts',
  component: AccountsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  depositRoute,
  withdrawRoute,
  transferRoute,
  transactionsRoute,
  accountsRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
