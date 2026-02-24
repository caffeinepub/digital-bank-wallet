import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTransfer } from '../hooks/useQueries';
import { validateAmount, validatePrincipal } from '../utils/validation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import TransactionConfirmationDialog from './TransactionConfirmationDialog';
import { Principal } from '@dfinity/principal';

export default function TransferForm() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const transfer = useTransfer();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const principalValidation = validatePrincipal(recipient);
    if (!principalValidation.isValid) {
      toast.error(principalValidation.error);
      return;
    }

    const amountValidation = validateAmount(amount);
    if (!amountValidation.isValid) {
      toast.error(amountValidation.error);
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      await transfer.mutateAsync({
        to: Principal.fromText(recipient.trim()),
        amount: BigInt(Math.floor(parseFloat(amount) * 100)),
        description: description.trim() || 'Transfer',
      });
      toast.success('Transfer successful!');
      setRecipient('');
      setAmount('');
      setDescription('');
      setShowConfirmation(false);
      navigate({ to: '/' });
    } catch (error: any) {
      toast.error(error.message || 'Transfer failed. Please try again.');
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Principal ID</Label>
          <Input
            id="recipient"
            type="text"
            placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxx"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={transfer.isPending}
            required
          />
          <p className="text-xs text-muted-foreground">Enter the recipient's Principal ID</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={transfer.isPending}
            required
          />
          <p className="text-xs text-muted-foreground">Enter the amount to transfer</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add a note about this transfer"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={transfer.isPending}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={transfer.isPending}>
          {transfer.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </form>

      <TransactionConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirm}
        type="transfer"
        amount={amount}
        description={description}
        recipient={recipient}
        isLoading={transfer.isPending}
      />
    </>
  );
}
