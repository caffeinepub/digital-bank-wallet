import React, { useState } from 'react';
import { loginWithEmailPassword, type EmailPasswordUser } from '../hooks/useEmailPasswordAuth';

interface LoginPageProps {
  onLoginSuccess: (user: EmailPasswordUser) => void;
  onGoToRegister?: () => void;
}

export default function LoginPage({ onLoginSuccess, onGoToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    // Small delay for UX
    await new Promise(r => setTimeout(r, 400));

    const result = loginWithEmailPassword(email, password);
    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setLoginError(result.error);
    }
    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-chase-bg flex flex-col">
      {/* Header */}
      <header className="bg-chase-navy py-4 px-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/bank-icon.dim_256x256.png" alt="BlueStone Bank" className="w-8 h-8 rounded" />
          <span className="text-white font-bold text-xl tracking-wide">BlueStone Bank</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-chase p-8">
            <h1 className="text-2xl font-bold text-chase-navy mb-1">Sign In</h1>
            <p className="text-chase-muted text-sm mb-6">Access your BlueStone Bank account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-chase-navy mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-chase-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-chase-navy mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-chase-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-chase-navy text-white font-semibold py-3 rounded-lg hover:bg-chase-navy-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            {/* Register link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-chase-muted">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onGoToRegister}
                  className="text-chase-navy font-semibold hover:underline focus:outline-none"
                >
                  Create Account
                </button>
              </p>
            </div>

            <p className="text-center text-xs text-chase-muted mt-4">
              Protected by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-chase-navy py-4 px-6 text-center">
        <p className="text-white/60 text-xs">
          © {new Date().getFullYear()} BlueStone Bank. Built with{' '}
          <span className="text-chase-gold">♥</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-chase-gold hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
