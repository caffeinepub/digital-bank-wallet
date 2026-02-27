import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeftRight, PlusCircle, MinusCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const actions = [
  {
    id: 'deposit',
    label: 'Deposit',
    icon: PlusCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    route: '/deposit',
  },
  {
    id: 'withdraw',
    label: 'Withdraw',
    icon: MinusCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    route: '/withdraw',
  },
  {
    id: 'transfer',
    label: 'Transfer',
    icon: ArrowLeftRight,
    color: 'text-chase-navy',
    bg: 'bg-blue-50',
    route: '/transfer',
  },
  {
    id: 'pay',
    label: 'Pay Bills',
    icon: CreditCard,
    color: 'text-chase-gold-dark',
    bg: 'bg-amber-50',
    route: null,
  },
];

export default function MobileQuickActions() {
  const navigate = useNavigate();

  const handleAction = (action: typeof actions[0]) => {
    if (action.route) {
      navigate({ to: action.route });
    } else {
      toast.info('Coming Soon', { description: 'This feature will be available shortly.' });
    }
  };

  return (
    <div>
      <h3 className="text-chase-navy font-semibold text-sm mb-3 uppercase tracking-wider">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-2">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-chase-bg transition-colors group"
            >
              <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Icon size={22} className={action.color} />
              </div>
              <span className="text-xs font-medium text-chase-navy text-center leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
