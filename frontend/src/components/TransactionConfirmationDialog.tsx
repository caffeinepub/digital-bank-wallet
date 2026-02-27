import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface TransactionConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: string;
  description: string;
  recipientPrincipal?: string;
}

export default function TransactionConfirmationDialog({
  open,
  onClose,
  onConfirm,
  isLoading,
  type,
  amount,
  description,
  recipientPrincipal,
}: TransactionConfirmationDialogProps) {
  const titles = {
    deposit: 'Confirm Deposit',
    withdrawal: 'Confirm Withdrawal',
    transfer: 'Confirm Transfer',
  };

  const formattedAmount = parseFloat(amount || '0').toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <AlertDialog open={open} onOpenChange={v => !v && onClose()}>
      <AlertDialogContent className="max-w-sm mx-4 rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-chase-navy text-lg">{titles[type]}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 mt-2">
              <div className="bg-chase-bg rounded-xl p-4 space-y-2">
                <Row label="Type" value={type.charAt(0).toUpperCase() + type.slice(1)} />
                <Row label="Amount" value={formattedAmount} highlight />
                {type === 'transfer' && recipientPrincipal && (
                  <Row label="Receiver" value={`${recipientPrincipal.slice(0, 14)}...`} />
                )}
                <Row label="Description" value={description} />
              </div>
              <p className="text-xs text-chase-muted text-center">
                Please review the details above before confirming.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-xl border-chase-border"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-chase-navy hover:bg-chase-navy-dark text-white rounded-xl"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing...
              </span>
            ) : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-chase-muted text-sm">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-chase-navy text-base' : 'text-chase-navy'}`}>
        {value}
      </span>
    </div>
  );
}
