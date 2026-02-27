import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
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

const queryClient = new QueryClient();

// Auth context
const TEMP_EMAIL = 'adelekejoshua436@gmail.com';
const TEMP_PASSWORD = 'Adeleke@24';
const SESSION_KEY = 'bluestone_session';

function getSession(): boolean {
  return localStorage.getItem(SESSION_KEY) === 'true';
}

function setSession(val: boolean) {
  if (val) localStorage.setItem(SESSION_KEY, 'true');
  else localStorage.removeItem(SESSION_KEY);
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AppRoot,
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
  depositRoute,
  withdrawRoute,
  transferRoute,
  transactionsRoute,
  accountsRoute,
]);

const router = createRouter({ routeTree });

function AppRoot() {
  const [isAuthenticated, setIsAuthenticated] = useState(getSession());
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    await new Promise(r => setTimeout(r, 600));
    if (email === TEMP_EMAIL && password === TEMP_PASSWORD) {
      setSession(true);
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    setSession(false);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  if (!isAuthenticated) {
    return (
      <LoginPage
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
      />
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

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
