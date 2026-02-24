import { Home, CreditCard, DollarSign, MoreHorizontal } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

type TabId = 'home' | 'accounts' | 'payments' | 'more';

interface MobileBottomNavProps {
  activeTab?: TabId;
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'accounts', label: 'Accounts', icon: CreditCard },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'more', label: 'More', icon: MoreHorizontal },
];

export default function MobileBottomNav({ activeTab = 'home' }: MobileBottomNavProps) {
  const navigate = useNavigate();

  const handleTab = (tab: typeof tabs[number]) => {
    if (tab.id === 'home') {
      navigate({ to: '/' });
    } else {
      toast.info('Coming Soon', {
        description: `${tab.label} section is coming soon!`,
      });
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 border-t"
      style={{
        background: 'oklch(0.18 0.08 240)',
        borderColor: 'oklch(1 0 0 / 0.10)',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTab(tab)}
            className="flex flex-col items-center gap-1 flex-1 py-1 transition-opacity"
          >
            <div
              className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
              style={isActive ? { background: 'oklch(1 0 0 / 0.15)' } : {}}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: isActive ? 'oklch(0.88 0.10 80)' : 'oklch(1 0 0 / 0.50)' }}
              />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: isActive ? 'oklch(0.88 0.10 80)' : 'oklch(1 0 0 / 0.50)' }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
