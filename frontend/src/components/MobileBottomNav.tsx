import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Home, CreditCard, Send, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'home' | 'accounts' | 'pay' | 'more';

interface MobileBottomNavProps {
  activeTab: Tab | string;
  onTabChange?: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'accounts', label: 'Accounts', icon: CreditCard },
  { id: 'pay', label: 'Pay', icon: Send },
  { id: 'more', label: 'More', icon: MoreHorizontal },
];

export default function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  const navigate = useNavigate();

  const handleTab = (tab: Tab) => {
    if (tab === 'home') {
      navigate({ to: '/' });
    } else if (tab === 'accounts') {
      navigate({ to: '/accounts' });
    } else {
      toast.info('Coming Soon', { description: 'This feature will be available shortly.' });
    }
    onTabChange?.(tab);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-chase-border z-30 safe-area-bottom">
      <div className="flex items-stretch">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                isActive
                  ? 'text-chase-navy border-t-2 border-chase-navy'
                  : 'text-chase-muted hover:text-chase-navy'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-chase-navy' : 'text-chase-muted'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
