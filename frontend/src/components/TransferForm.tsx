import React, { useState } from 'react';
import { DollarSign, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useExternalTransfer } from '../hooks/useQueries';
import { validateAmount, validatePrincipal } from '../utils/validation';
import TransactionConfirmationDialog from './TransactionConfirmationDialog';
import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils/formatters';
import { Principal } from '@dfinity/principal';

interface TransferFormProps {
  onSuccess?: () => void;
}

export default function TransferForm({ onSuccess }: TransferFormProps) {
  const [recipientPrincipal, setRecipientPrincipal] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [principalError, setPrincipalError] = useState('');

  const { checkingBalance, isLoading: balanceLoading } = useBalance();
  const { mutate: transferExternal, isPending } = useExternalTransfer();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    const amtErr = validateAmount(amount);
    if (amtErr) {
      setAmountError(amtErr);
      hasError = true;
    } else {
      const cents = Math.round(parseFloat(amount) * 100);
      if (cents > Number(checkingBalance)) {
        setAmountError(`Insufficient funds. Available: ${formatCurrency(checkingBalance)}`);
        hasError = true;
      } else {
        setAmountError('');
      }
    }

    const pErr = validatePrincipal(recipientPrincipal);
    if (pErr) {
      setPrincipalError(pErr);
      hasError = true;
    } else {
      setPrincipalError('');
    }

    if (!hasError) setShowConfirm(true);
  };

  const handleConfirm = () => {
    const cents = Math.round(parseFloat(amount) * 100);

    let toPrincipal: Principal;
    try {
      toPrincipal = Principal.fromText(recipientPrincipal.trim());
    } catch {
      toast.error('Invalid Receiver ID', {
        description: 'The Receiver ID you entered is not a valid Principal ID.',
      });
      setShowConfirm(false);
      return;
    }

    transferExternal(
      { to: toPrincipal, amount: BigInt(cents) },
      {
        onSuccess: () => {
          toast.success('Transfer successful!', {
            description: `$${parseFloat(amount).toFixed(2)} sent to ${recipientPrincipal.slice(0, 12)}...`,
          });
          setShowConfirm(false);
          setAmount('');
          setDescription('');
          setRecipientPrincipal('');
          onSuccess?.();
        },
        onError: (err: any) => {
          const msg = err?.message || '';
          const isInsufficient = msg.toLowerCase().includes('insufficient');
          toast.error('Transfer failed', {
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

        {/* Receiver ID */}
        <div>
          <label className="block text-sm font-semibold text-chase-navy mb-2">Receiver ID</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chase-muted" />
            <input
              type="text"
              value={recipientPrincipal}
              onChange={e => { setRecipientPrincipal(e.target.value); setPrincipalError(''); }}
              className="w-full border border-chase-border rounded-xl pl-9 pr-4 py-3.5 text-chase-navy text-sm focus:outline-none focus:ring-2 focus:ring-chase-navy focus:border-transparent font-mono"
              placeholder="e.g. aaaaa-aa or principal-id..."
            />
          </div>
          {principalError && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
              <p className="text-red-500 text-xs">{principalError}</p>
            </div>
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
            placeholder="e.g. Rent, Invoice payment..."
            maxLength={100}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-chase-navy text-white font-semibold py-4 rounded-xl hover:bg-chase-navy-dark transition-colors flex items-center justify-center gap-2 text-base disabled:opacity-60"
        >
          Review Transfer
        </button>
      </form>

      <TransactionConfirmationDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        isLoading={isPending}
        type="transfer"
        amount={amount}
        description={description || 'Transfer'}
        recipientPrincipal={recipientPrincipal}
      />
    </>
  );
}
