import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';
import TransferForm from '../components/TransferForm';

export default function TransferPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-chase-bg flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-chase-navy px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate({ to: '/' })}
          className="text-white/80 hover:text-white transition-colors p-1"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg flex-1">Transfer Funds</h1>
        <ArrowLeftRight size={20} className="text-chase-gold" />
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <TransferForm onSuccess={() => navigate({ to: '/' })} />
      </div>
    </div>
  );
}
