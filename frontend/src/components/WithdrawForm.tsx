import React, { useState } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useWithdraw } from '../hooks/useQueries';
import { validateAmount } from '../utils/validation';
import TransactionConfirmationDialog from './TransactionConfirmationDialog';
import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils/formatters';

interface WithdrawFormProps {
  onSuccess?: () => void;
}

export default function WithdrawForm({ onSuccess }: WithdrawFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [amountError, setAmountError] = useState('');

  const { checkingBalance, isLoading: balanceLoading } = useBalance();
  const { mutate: withdraw, isPending } = useWithdraw();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateAmount(amount);
    if (err) { setAmountError(err); return; }
    const cents = Math.round(parseFloat(amount) * 100);
    if (cents > Number(checkingBalance)) {
      setAmountError(`Insufficient funds. Available: ${formatCurrency(checkingBalance)}`);
      return;
    }
    setAmountError('');
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const cents = Math.round(parseFloat(amount) * 100);
    withdraw(
      { amount: BigInt(cents) },
      {
        onSuccess: () => {
          toast.success('Withdrawal successful!', {
            description: `$${parseFloat(amount).toFixed(2)} has been withdrawn from your account.`,
          });
          setShowConfirm(false);
          setAmount('');
          setDescription('');
          onSuccess?.();
        },
        onError: (err: any) => {
          const msg = err?.message || '';
          const isInsufficient = msg.toLowerCase().includes('insufficient');
          toast.error('Withdrawal failed', {
            description: isInsufficient
              ? 'Insufficient funds in your account.'
              : msg || 'Please try again.',
          });
          setShowConfirm(false);
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Available balance */}
        <div className="bg-chase-bg rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-chase-muted font-medium">Available Balance</span>
          {balanceLoading ? (
            <span className="text-chase-navy font-bold text-sm">Loading...</span>
          ) : (
            <span className="text-chase-navy font-bold text-lg">{formatCurrency(checkingBalance)}</span>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-chase-navy mb-2">Amount</label>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chase-muted" />
            <input
              type="number"
              value={amount}
              onChange={e => { setAmount(e.target.value); setAmountError(''); }}
              className="w-full border border-chase-border rounded-xl pl-9 pr-4 py-3.5 text-chase-navy text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent"
              placeholder="0.00"
              min="0.01"
              step="0.01"
            />
          </div>
          {amountError && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
              <p className="text-red-500 text-xs">{amountError}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-chase-navy mb-2">Description (optional)</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-chase-border rounded-xl px-4 py-3 text-chase-navy text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent"
            placeholder="e.g. ATM withdrawal, Bill payment..."
            maxLength={100}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-chase-navy text-white font-semibold py-4 rounded-xl hover:bg-chase-navy-dark transition-colors flex items-center justify-center gap-2 text-base"
        >
          Review Withdrawal
        </button>
      </form>

      <TransactionConfirmationDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        isLoading={isPending}
        type="withdrawal"
        amount={amount}
        description={description || 'Withdrawal'}
      />
    </>
  );
}
