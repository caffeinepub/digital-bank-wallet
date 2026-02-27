import React, { useState } from 'react';
import { registerWithEmailPassword } from '../hooks/useEmailPasswordAuth';
import { toast } from 'sonner';

interface RegisterPageProps {
  onSuccess: () => void;
  onGoToLogin: () => void;
}

export default function RegisterPage({ onSuccess, onGoToLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; general?: string }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    await new Promise(r => setTimeout(r, 400));

    const result = registerWithEmailPassword(name.trim(), email.trim(), password);
    if (result.success) {
      toast.success('Account created! Please sign in.');
      onSuccess();
    } else {
      setErrors({ general: result.error });
    }
    setIsSubmitting(false);
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
            <h1 className="text-2xl font-bold text-chase-navy mb-1">Create Account</h1>
            <p className="text-chase-muted text-sm mb-6">Join BlueStone Bank today</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-chase-navy mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent ${errors.name ? 'border-red-400 bg-red-50' : 'border-chase-border'}`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-chase-navy mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent ${errors.email ? 'border-red-400 bg-red-50' : 'border-chase-border'}`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-chase-navy mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent ${errors.password ? 'border-red-400 bg-red-50' : 'border-chase-border'}`}
                  placeholder="Create a password (min. 6 characters)"
                  autoComplete="new-password"
                />
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-chase-navy mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-chase-border'}`}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* General error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-chase-navy text-white font-semibold py-3 rounded-lg hover:bg-chase-navy-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-chase-muted">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onGoToLogin}
                  className="text-chase-navy font-semibold hover:underline focus:outline-none"
                >
                  Sign In
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
