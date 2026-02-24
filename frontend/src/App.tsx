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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { useState } from 'react';

// Temporary hardcoded credentials for demo access
const TEMP_EMAIL = 'adelekejoshua436@gmail.com';
const TEMP_PASSWORD = 'Adeleke@24';

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

interface LoginPortalProps {
  onTempLogin: () => void;
}

function LoginPortal({ onTempLogin }: LoginPortalProps) {
  const { login, loginStatus } = useInternetIdentity();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [credentialError, setCredentialError] = useState('');

  const isLoggingIn = loginStatus === 'logging-in';

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialError('');
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;

    // Check hardcoded temporary credentials
    if (email === TEMP_EMAIL && password === TEMP_PASSWORD) {
      onTempLogin();
      return;
    }

    // Credentials don't match — show error
    setCredentialError('Invalid email or password. Please try again.');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.20 0.08 240) 0%, oklch(0.28 0.07 240) 50%, oklch(0.22 0.09 250) 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'oklch(0.78 0.14 75)' }} />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'oklch(0.78 0.14 75)' }} />
        <div className="absolute top-1/3 right-8 w-48 h-48 rounded-full opacity-5"
          style={{ background: 'oklch(0.78 0.14 75)' }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/bank-icon.dim_256x256.png"
              alt="BlueStone Bank"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">BlueStone Bank</h1>
              <p className="text-xs tracking-widest uppercase" style={{ color: 'oklch(0.78 0.14 75)' }}>
                Solid Foundations. Secure Futures
              </p>
            </div>
          </div>

          {/* Center content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Banking made<br />
              <span style={{ color: 'oklch(0.88 0.10 80)' }}>simple & secure</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Manage your finances with confidence. Secure, modern banking powered by blockchain technology.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Shield, text: '256-bit encryption on all transactions' },
                { icon: Lock, text: 'Decentralized & tamper-proof ledger' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'oklch(0.78 0.14 75 / 0.2)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'oklch(0.88 0.10 80)' }} />
                  </div>
                  <span className="text-white/80 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} BlueStone Bank. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <img
              src="/assets/generated/bank-icon.dim_256x256.png"
              alt="BlueStone Bank"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">BlueStone Bank</h1>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to access your account</p>
          </div>

          <div className="bg-card rounded-2xl shadow-card border border-border p-8">
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                    if (credentialError) setCredentialError('');
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={`h-11 ${emailError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  disabled={isLoggingIn}
                />
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                      if (credentialError) setCredentialError('');
                    }}
                    onBlur={(e) => validatePassword(e.target.value)}
                    className={`h-11 pr-10 ${passwordError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    disabled={isLoggingIn}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoggingIn}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              </div>

              {/* Credential error message */}
              {credentialError && (
                <div className="rounded-lg px-4 py-3 text-sm font-medium text-destructive border border-destructive/30"
                  style={{ background: 'oklch(0.97 0.02 25)' }}>
                  {credentialError}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoggingIn}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember Me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'oklch(0.28 0.07 240)' }}
                  disabled={isLoggingIn}
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold shadow-navy hover:shadow-lg transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.20 0.08 240) 0%, oklch(0.32 0.08 240) 100%)',
                  color: 'white',
                }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">
                New to BlueStone?{' '}
                <button
                  type="button"
                  onClick={() => login()}
                  className="font-semibold hover:underline transition-colors"
                  style={{ color: 'oklch(0.28 0.07 240)' }}
                  disabled={isLoggingIn}
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            🔒 Your connection is secured with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [isTempSessionActive, setIsTempSessionActive] = useState(false);

  const isAuthenticated = !!identity || isTempSessionActive;
  const showProfileSetup = !!identity && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return <LoginPortal onTempLogin={() => setIsTempSessionActive(true)} />;
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
