import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils/formatters';

interface MobileBalanceCardProps {
  userName?: string;
}

export default function MobileBalanceCard({ userName }: MobileBalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const { checkingBalance, isLoading } = useBalance();

  const displayBalance = showBalance
    ? (isLoading ? '••••••' : formatCurrency(checkingBalance))
    : '••••••';

  const displayName = userName ? userName.split(' ')[0] : 'there';

  return (
    <div className="pt-2 pb-1">
      {/* Greeting */}
      <p className="text-white/70 text-sm mb-1">Good {getTimeOfDay()}, {displayName} 👋</p>

      {/* Balance Row */}
      <div className="flex items-center gap-3">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-wider mb-0.5">Total Balance</p>
          <p className="text-white text-3xl font-bold tracking-tight">
            {displayBalance}
          </p>
        </div>
        <button
          onClick={() => setShowBalance(v => !v)}
          className="ml-auto text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label={showBalance ? 'Hide balance' : 'Show balance'}
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Account hint */}
      <p className="text-white/40 text-xs mt-1">Checking ••••4821</p>
    </div>
  );
}

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
