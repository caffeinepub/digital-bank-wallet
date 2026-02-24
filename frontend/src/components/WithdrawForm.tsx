import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWithdraw } from '../hooks/useQueries';
import { validateAmount } from '../utils/validation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import TransactionConfirmationDialog from './TransactionConfirmationDialog';

export default function WithdrawForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const withdraw = useWithdraw();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateAmount(amount);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      await withdraw.mutateAsync({
        amount: BigInt(Math.floor(parseFloat(amount) * 100)),
        description: description.trim() || 'Withdrawal',
      });
      toast.success('Withdrawal successful!');
      setAmount('');
      setDescription('');
      setShowConfirmation(false);
      navigate({ to: '/' });
    } catch (error: any) {
      toast.error(error.message || 'Withdrawal failed. Please try again.');
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={withdraw.isPending}
            required
          />
          <p className="text-xs text-muted-foreground">Enter the amount you want to withdraw</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add a note about this withdrawal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={withdraw.isPending}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={withdraw.isPending}>
          {withdraw.isPending ? (
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
        type="withdrawal"
        amount={amount}
        description={description}
        isLoading={withdraw.isPending}
      />
    </>
  );
}
