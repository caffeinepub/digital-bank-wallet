import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatCurrency } from '../utils/formatters';
import { Loader2 } from 'lucide-react';

interface TransactionConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: string;
  description: string;
  recipient?: string;
  isLoading: boolean;
}

export default function TransactionConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  type,
  amount,
  description,
  recipient,
  isLoading,
}: TransactionConfirmationDialogProps) {
  const amountInCents = BigInt(Math.floor(parseFloat(amount || '0') * 100));

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm {type.charAt(0).toUpperCase() + type.slice(1)}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 pt-2">
              <p>Please review the transaction details:</p>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground capitalize">{type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold text-foreground">{formatCurrency(amountInCents)}</span>
                </div>
                {recipient && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipient:</span>
                    <span className="font-mono text-xs text-foreground break-all">{recipient}</span>
                  </div>
                )}
                {description && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Description:</span>
                    <span className="text-foreground">{description}</span>
                  </div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
