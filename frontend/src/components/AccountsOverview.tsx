import { formatCurrency } from '../utils/formatters';
import { useGetBalance } from '../hooks/useBalance';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, PiggyBank } from 'lucide-react';

const SAVINGS_BALANCE = BigInt(524750); // $5,247.50 dummy savings

export default function AccountsOverview() {
  const { data: checkingBalance, isLoading } = useGetBalance();

  const accounts = [
    {
      type: 'Checking',
      icon: Building2,
      masked: '•••• 4291',
      balance: checkingBalance ?? BigInt(0),
      isLoading,
      gradient: 'linear-gradient(135deg, oklch(0.20 0.08 240) 0%, oklch(0.30 0.07 240) 100%)',
      accentColor: 'oklch(0.78 0.14 75)',
    },
    {
      type: 'Savings',
      icon: PiggyBank,
      masked: '•••• 8847',
      balance: SAVINGS_BALANCE,
      isLoading: false,
      gradient: 'linear-gradient(135deg, oklch(0.24 0.06 240) 0%, oklch(0.34 0.05 240) 100%)',
      accentColor: 'oklch(0.70 0.18 145)',
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-3">My Accounts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <div
            key={account.type}
            className="relative rounded-2xl p-5 overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: account.gradient,
              boxShadow: '0 4px 20px rgba(15, 30, 80, 0.25)',
            }}
          >
            {/* Decorative circle */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15"
              style={{ background: account.accentColor }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${account.accentColor}30` }}
                  >
                    <account.icon className="w-4 h-4" style={{ color: account.accentColor }} />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{account.type}</span>
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: 'oklch(1 0 0 / 0.10)',
                    color: 'oklch(0.85 0.01 60)',
                    border: '1px solid oklch(1 0 0 / 0.12)',
                  }}
                >
                  {account.masked}
                </span>
              </div>

              {account.isLoading ? (
                <Skeleton className="h-8 w-32 bg-white/20" />
              ) : (
                <p className="text-white text-2xl font-bold tracking-tight">
                  {formatCurrency(account.balance)}
                </p>
              )}
              <p className="text-white/50 text-xs mt-1">Available balance</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
