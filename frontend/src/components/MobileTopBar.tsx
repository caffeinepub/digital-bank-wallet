import React from 'react';
import { Bell, LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner';

interface MobileTopBarProps {
  onLogout?: () => void;
  userName?: string;
}

export default function MobileTopBar({ onLogout, userName }: MobileTopBarProps) {
  return (
    <header className="bg-chase-navy px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Menu */}
      <button
        className="text-white/80 hover:text-white transition-colors p-1"
        onClick={() => toast.info('Menu coming soon')}
        aria-label="Menu"
      >
        <Menu size={22} />
      </button>

      {/* Center: Brand */}
      <div className="flex flex-col items-center">
        <span className="text-white font-bold text-base tracking-widest uppercase">
          BlueStone <span className="text-chase-gold">Bank</span>
        </span>
        {userName ? (
          <span className="text-white/60 text-[9px] tracking-wider">Welcome, {userName}</span>
        ) : (
          <span className="text-white/50 text-[9px] tracking-wider uppercase">Solid Foundation, Secure Funds</span>
        )}
      </div>

      {/* Right: Bell + Logout */}
      <div className="flex items-center gap-2">
        <button
          className="relative text-white/80 hover:text-white transition-colors p-1"
          onClick={() => toast.info('No new notifications')}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        {onLogout && (
          <button
            className="text-white/80 hover:text-white transition-colors p-1"
            onClick={onLogout}
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
