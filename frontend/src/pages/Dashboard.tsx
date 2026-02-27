import React, { useState } from 'react';
import MobileTopBar from '../components/MobileTopBar';
import MobileBalanceCard from '../components/MobileBalanceCard';
import DebitCard from '../components/DebitCard';
import MobileQuickActions from '../components/MobileQuickActions';
import MobileRecentTransactions from '../components/MobileRecentTransactions';
import MobileBottomNav from '../components/MobileBottomNav';

interface DashboardProps {
  onLogout?: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'accounts' | 'pay' | 'more'>('home');

  return (
    <div className="min-h-screen bg-chase-bg flex flex-col max-w-md mx-auto relative">
      {/* Top Bar */}
      <MobileTopBar onLogout={onLogout} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Section - Navy gradient */}
        <div className="bg-gradient-to-b from-chase-navy to-chase-navy-dark px-4 pt-2 pb-6">
          <MobileBalanceCard />
          <div className="mt-4">
            <DebitCard />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-4 bg-white">
          <MobileQuickActions />
        </div>

        {/* Divider */}
        <div className="h-2 bg-chase-bg" />

        {/* Recent Transactions */}
        <div className="bg-white px-4 py-4">
          <MobileRecentTransactions />
        </div>
      </div>

      {/* Fixed Bottom Nav */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
