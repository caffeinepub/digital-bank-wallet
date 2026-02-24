import { ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine, Receipt } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

const actions = [
  {
    id: 'transfer',
    label: 'Transfer',
    icon: ArrowLeftRight,
    route: '/transfer' as const,
  },
  {
    id: 'deposit',
    label: 'Deposit',
    icon: ArrowDownToLine,
    route: '/deposit' as const,
  },
  {
    id: 'withdraw',
    label: 'Withdraw',
    icon: ArrowUpFromLine,
    route: '/withdraw' as const,
  },
  {
    id: 'paybills',
    label: 'Pay Bills',
    icon: Receipt,
    route: null,
  },
];

export default function MobileQuickActions() {
  const navigate = useNavigate();

  const handleAction = (action: typeof actions[number]) => {
    if (action.route) {
      navigate({ to: action.route });
    } else {
      toast.info('Coming Soon', {
        description: `${action.label} feature is coming soon!`,
      });
    }
  };

  return (
    <div className="px-5 py-5">
      <div className="flex items-start justify-between gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className="flex flex-col items-center gap-2 flex-1 group"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-medium transition-transform group-hover:scale-105 group-active:scale-95"
                style={{ background: 'oklch(1 0 0)' }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: 'oklch(0.28 0.07 240)' }}
                />
              </div>
              <span className="text-xs font-semibold text-white/90 text-center leading-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
