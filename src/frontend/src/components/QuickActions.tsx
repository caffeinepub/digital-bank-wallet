import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Deposit',
      icon: ArrowDownCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900',
      path: '/deposit',
    },
    {
      label: 'Withdraw',
      icon: ArrowUpCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900',
      path: '/withdraw',
    },
    {
      label: 'Transfer',
      icon: ArrowRightCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900',
      path: '/transfer',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className={`w-full justify-start gap-3 h-auto py-4 ${action.bgColor} border-0`}
            onClick={() => navigate({ to: action.path })}
          >
            <action.icon className={`w-5 h-5 ${action.color}`} />
            <span className="font-medium">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
