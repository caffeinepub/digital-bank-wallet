import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function DebitCard() {
  const [showNumber, setShowNumber] = useState(false);

  const maskedNumber = '•••• •••• •••• 4821';
  const fullNumber = '4532 8821 6543 4821';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-card"
      style={{
        background: 'linear-gradient(135deg, #001f4d 0%, #003580 50%, #0050b3 100%)',
        aspectRatio: '1.586',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white transform -translate-x-8 translate-y-8" />
      </div>

      <div className="relative p-5 h-full flex flex-col justify-between">
        {/* Top Row */}
        <div className="flex items-start justify-between">
          {/* Chip */}
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
            <div className="w-7 h-5 rounded-sm border border-amber-600/40 grid grid-cols-2 gap-px p-0.5">
              <div className="bg-amber-400/60 rounded-sm" />
              <div className="bg-amber-400/60 rounded-sm" />
              <div className="bg-amber-400/60 rounded-sm" />
              <div className="bg-amber-400/60 rounded-sm" />
            </div>
          </div>

          {/* Bank Name */}
          <div className="text-right">
            <p className="text-white font-bold text-sm tracking-widest uppercase leading-none">BlueStone</p>
            <p className="text-chase-gold font-bold text-sm tracking-widest uppercase leading-none">BANK</p>
          </div>
        </div>

        {/* Card Number */}
        <div className="flex items-center gap-2">
          <p className="text-white/90 text-base font-mono tracking-widest flex-1">
            {showNumber ? fullNumber : maskedNumber}
          </p>
          <button
            onClick={() => setShowNumber(v => !v)}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label={showNumber ? 'Hide card number' : 'Show card number'}
          >
            {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/50 text-[9px] uppercase tracking-wider mb-0.5">Card Holder</p>
            <p className="text-white text-sm font-semibold tracking-wide">JOSHUA ADELEKE</p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[9px] uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-white text-sm font-semibold">12/28</p>
          </div>
          {/* Visa-style logo */}
          <div className="flex items-center">
            <span className="text-white font-bold text-lg italic tracking-tight">VISA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
