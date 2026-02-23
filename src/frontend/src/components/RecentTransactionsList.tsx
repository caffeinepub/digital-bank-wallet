import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '../backend';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle, Clock } from 'lucide-react';
import { formatCurrency, formatDate, formatTransactionType } from '../utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

interface RecentTransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function RecentTransactionsList({ transactions, isLoading }: RecentTransactionsListProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="w-5 h-5 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpCircle className="w-5 h-5 text-red-600" />;
      case 'transfer':
        return <ArrowRightCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      case 'transfer':
        return 'text-blue-600';
      default:
        return 'text-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
                <div className="h-4 bg-muted rounded w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link to="/transactions">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm mt-1">Start by making a deposit</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getTransactionIcon(transaction.transactionType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground truncate">
                      {transaction.description || 'No description'}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {formatTransactionType(transaction.transactionType)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.timestamp)}
                  </p>
                </div>
                <div className={`font-semibold ${getTransactionColor(transaction.transactionType)}`}>
                  {transaction.transactionType === 'withdrawal' ? '-' : '+'}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
