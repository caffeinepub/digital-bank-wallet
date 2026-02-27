import React, { useState } from 'react';
import { DollarSign, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useDeposit } from '../hooks/useQueries';
import { validateAmount } from '../utils/validation';
import TransactionConfirmationDialog from './TransactionConfirmationDialog';

interface DepositFormProps {
  onSuccess?: () => void;
}

export default function DepositForm({ onSuccess }: DepositFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [amountError, setAmountError] = useState('');

  const { mutate: deposit, isPending } = useDeposit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateAmount(amount);
    if (err) { setAmountError(err); return; }
    setAmountError('');
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const cents = Math.round(parseFloat(amount) * 100);
    deposit(
      { amount: BigInt(cents) },
      {
        onSuccess: () => {
          toast.success('Deposit successful!', {
            description: `$${parseFloat(amount).toFixed(2)} has been added to your account.`,
          });
          setShowConfirm(false);
          setAmount('');
          setDescription('');
          onSuccess?.();
        },
        onError: (err: any) => {
          toast.error('Deposit failed', {
            description: err?.message || 'Please try again.',
          });
          setShowConfirm(false);
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
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
          {amountError && <p className="text-red-500 text-xs mt-1">{amountError}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-chase-navy mb-2">Description (optional)</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-chase-border rounded-xl px-4 py-3 text-chase-navy text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent"
            placeholder="e.g. Paycheck, Transfer from savings..."
            maxLength={100}
          />
        </div>

        {/* Quick amounts */}
        <div>
          <p className="text-xs text-chase-muted mb-2">Quick amounts</p>
          <div className="flex gap-2 flex-wrap">
            {['100', '500', '1000', '5000'].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v)}
                className="px-3 py-1.5 rounded-full border border-chase-border text-xs font-medium text-chase-navy hover:bg-chase-navy hover:text-white transition-colors"
              >
                ${v}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-chase-navy text-white font-semibold py-4 rounded-xl hover:bg-chase-navy-dark transition-colors flex items-center justify-center gap-2 text-base"
        >
          <CheckCircle size={18} />
          Review Deposit
        </button>
      </form>

      <TransactionConfirmationDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        isLoading={isPending}
        type="deposit"
        amount={amount}
        description={description || 'Deposit'}
      />
    </>
  );
}
