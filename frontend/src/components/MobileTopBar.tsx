import { Menu, Bell } from 'lucide-react';

interface MobileTopBarProps {
  notificationCount?: number;
}

export default function MobileTopBar({ notificationCount = 2 }: MobileTopBarProps) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      {/* Hamburger Menu */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
        style={{ background: 'oklch(1 0 0 / 0.12)' }}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Brand Center */}
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-white leading-tight tracking-wide">
          Bluestone Bank
        </h1>
        <p className="text-xs font-medium tracking-wider" style={{ color: 'oklch(0.88 0.10 80)' }}>
          Solid Foundation, Secure Funds
        </p>
      </div>

      {/* Notification Bell */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-xl relative transition-colors"
        style={{ background: 'oklch(1 0 0 / 0.12)' }}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-white" />
        {notificationCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'oklch(0.55 0.22 25)' }}
          >
            {notificationCount}
          </span>
        )}
      </button>
    </div>
  );
}
