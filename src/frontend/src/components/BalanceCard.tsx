import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface BalanceCardProps {
  balance: bigint;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-[oklch(0.35_0.08_60)] to-[oklch(0.25_0.06_45)] text-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white/90 text-sm font-medium">
          <Wallet className="w-4 h-4" />
          Current Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl md:text-5xl font-bold mb-2">
          {formatCurrency(balance)}
        </div>
        <p className="text-white/80 text-sm">Available for transactions</p>
      </CardContent>
    </Card>
  );
}
