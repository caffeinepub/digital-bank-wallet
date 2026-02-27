import { useState } from 'react';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface BalanceCardProps {
  balance: bigint;
  userName?: string;
}

export default function BalanceCard({ balance, userName }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  const displayName = userName ? userName : undefined;

  return (
    <div
      className="relative rounded-3xl overflow-hidden p-6 md:p-8"
      style={{
        background: 'linear-gradient(135deg, oklch(0.18 0.08 240) 0%, oklch(0.28 0.07 240) 55%, oklch(0.22 0.09 250) 100%)',
        boxShadow: '0 8px 32px rgba(15, 30, 80, 0.3)',
        minHeight: 180,
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
        style={{ background: 'oklch(0.78 0.14 75)' }} />
      <div className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full opacity-8"
        style={{ background: 'oklch(0.78 0.14 75)' }} />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/60 text-sm font-medium tracking-wide uppercase">
              {displayName ? `Welcome, ${displayName}` : 'Total Balance'}
            </p>
            <p className="text-white/40 text-xs mt-0.5">Checking Account</p>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: 'oklch(1 0 0 / 0.12)',
              color: 'oklch(0.95 0.01 60)',
              border: '1px solid oklch(1 0 0 / 0.15)',
            }}
          >
            {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showBalance ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Balance amount */}
        <div className="mb-4">
          <div
            className={`balance-value text-4xl md:text-5xl font-bold text-white tracking-tight ${!showBalance ? 'hidden-balance' : ''}`}
          >
            {showBalance ? formatCurrency(balance) : '••••••'}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <TrendingUp className="w-3.5 h-3.5" style={{ color: 'oklch(0.78 0.14 75)' }} />
            <span className="text-xs" style={{ color: 'oklch(0.78 0.14 75)' }}>
              Available for transactions
            </span>
          </div>
        </div>

        {/* Account number hint */}
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: 'oklch(1 0 0 / 0.10)',
              color: 'oklch(0.85 0.01 60)',
              border: '1px solid oklch(1 0 0 / 0.12)',
            }}
          >
            •••• •••• 4291
          </div>
        </div>
      </div>
    </div>
  );
}
