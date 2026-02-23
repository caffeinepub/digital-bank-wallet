import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import WithdrawForm from '../components/WithdrawForm';

export default function WithdrawPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/' })}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Withdraw Funds</h1>
          <p className="text-muted-foreground">Remove money from your wallet</p>
        </div>
        <WithdrawForm />
      </div>
    </div>
  );
}
