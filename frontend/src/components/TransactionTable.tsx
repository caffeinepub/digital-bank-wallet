import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction } from '../backend';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, formatTransactionType } from '../utils/formatters';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpCircle className="w-4 h-4 text-red-600" />;
      case 'transfer':
        return <ArrowRightCircle className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getAmountColor = (type: string) => {
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

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>No transactions found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.transactionType)}
                      <Badge variant="outline">
                        {formatTransactionType(transaction.transactionType)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {transaction.description || 'No description'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(transaction.timestamp)}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${getAmountColor(transaction.transactionType)}`}>
                    {transaction.transactionType === 'withdrawal' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
