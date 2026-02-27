import React from 'react';
import MobileTopBar from '../components/MobileTopBar';
import MobileBalanceCard from '../components/MobileBalanceCard';
import MobileQuickActions from '../components/MobileQuickActions';
import MobileRecentTransactions from '../components/MobileRecentTransactions';
import MobileBottomNav from '../components/MobileBottomNav';
import DebitCard from '../components/DebitCard';
import type { EmailPasswordUser } from '../hooks/useEmailPasswordAuth';

interface DashboardProps {
  onLogout: () => void;
  currentUser?: EmailPasswordUser | null;
}

export default function Dashboard({ onLogout, currentUser }: DashboardProps) {
  return (
    <div className="min-h-screen bg-chase-bg flex flex-col">
      {/* Sticky top bar */}
      <MobileTopBar onLogout={onLogout} userName={currentUser?.name} />

      {/* Hero section */}
      <div
        className="px-4 pt-5 pb-6"
        style={{
          background: 'linear-gradient(160deg, oklch(0.18 0.08 240) 0%, oklch(0.26 0.07 240) 60%, oklch(0.20 0.09 250) 100%)',
        }}
      >
        <MobileBalanceCard userName={currentUser?.name} />

        {/* Debit card */}
        <div className="mt-5">
          <DebitCard cardholderName={currentUser?.name} />
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-4">
        <MobileQuickActions />
      </div>

      {/* Recent transactions */}
      <div className="px-4 pb-24 flex-1">
        <MobileRecentTransactions />
      </div>

      {/* Fixed bottom nav */}
      <MobileBottomNav activeTab="home" />
    </div>
  );
}
