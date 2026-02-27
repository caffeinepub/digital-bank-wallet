import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, CreditCard, TrendingUp } from 'lucide-react';
import AccountsOverview from '../components/AccountsOverview';
import MobileBottomNav from '../components/MobileBottomNav';

export default function AccountsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-chase-bg flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-chase-navy px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate({ to: '/' })}
          className="text-white/80 hover:text-white transition-colors p-1"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg flex-1">My Accounts</h1>
        <CreditCard size={20} className="text-chase-gold" />
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-4 py-4">
        <AccountsOverview />
      </div>

      {/* Bottom Nav */}
      <MobileBottomNav activeTab="accounts" onTabChange={(tab) => {
        if (tab === 'home') navigate({ to: '/' });
      }} />
    </div>
  );
}
