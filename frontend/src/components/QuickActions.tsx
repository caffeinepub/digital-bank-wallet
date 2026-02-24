import { useNavigate } from '@tanstack/react-router';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle, Zap, Receipt } from 'lucide-react';
import { toast } from 'sonner';

interface QuickAction {
  label: string;
  icon: React.ElementType;
  iconColor: string;
  bgGradient: string;
  path?: string;
  comingSoon?: boolean;
}

export default function QuickActions() {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      label: 'Transfer',
      icon: ArrowRightCircle,
      iconColor: 'oklch(0.78 0.14 75)',
      bgGradient: 'linear-gradient(135deg, oklch(0.20 0.08 240) 0%, oklch(0.30 0.07 240) 100%)',
      path: '/transfer',
    },
    {
      label: 'Deposit',
      icon: ArrowDownCircle,
      iconColor: 'oklch(0.70 0.18 145)',
      bgGradient: 'linear-gradient(135deg, oklch(0.22 0.07 160) 0%, oklch(0.30 0.06 155) 100%)',
      path: '/deposit',
    },
    {
      label: 'Bill Pay',
      icon: Receipt,
      iconColor: 'oklch(0.75 0.15 55)',
      bgGradient: 'linear-gradient(135deg, oklch(0.28 0.07 55) 0%, oklch(0.35 0.06 50) 100%)',
      comingSoon: true,
    },
    {
      label: 'Top-up',
      icon: Zap,
      iconColor: 'oklch(0.72 0.18 300)',
      bgGradient: 'linear-gradient(135deg, oklch(0.24 0.07 290) 0%, oklch(0.32 0.06 285) 100%)',
      comingSoon: true,
    },
  ];

  const handleAction = (action: QuickAction) => {
    if (action.comingSoon) {
      toast.info(`${action.label} — Coming Soon!`, {
        description: 'This feature is currently under development.',
        duration: 3000,
      });
      return;
    }
    if (action.path) {
      navigate({ to: action.path });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-3">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleAction(action)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-navy group-active:scale-95"
              style={{
                background: action.bgGradient,
                boxShadow: '0 4px 12px rgba(15, 30, 80, 0.2)',
              }}
            >
              <action.icon className="w-6 h-6" style={{ color: action.iconColor }} />
            </div>
            <span className="text-xs font-medium text-foreground/80 text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
