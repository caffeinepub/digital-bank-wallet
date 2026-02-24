import { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface VirtualCardProps {
  cardholderName: string;
  lastFour?: string;
  expiry?: string;
}

export default function VirtualCard({
  cardholderName,
  lastFour = '4291',
  expiry = '08/28',
}: VirtualCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card-flip-container cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
      style={{ width: '100%', maxWidth: 380, height: 220, margin: '0 auto' }}
      onClick={() => setFlipped(!flipped)}
      title="Click to flip card"
    >
      <div className="card-flip-inner" style={{ height: '100%' }}>
        {/* Front Face */}
        <div
          className="card-face"
          style={{
            background: 'linear-gradient(135deg, oklch(0.18 0.08 240) 0%, oklch(0.28 0.07 240) 55%, oklch(0.22 0.09 250) 100%)',
            boxShadow: '0 20px 60px rgba(15, 30, 80, 0.4), 0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-20 rounded-2xl"
            style={{
              backgroundImage: 'url(/assets/generated/virtual-card-bg.dim_600x380.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'oklch(0.78 0.14 75)' }} />
          <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'oklch(0.78 0.14 75)' }} />

          <div className="relative z-10 flex flex-col justify-between h-full p-6">
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/bank-icon.dim_256x256.png"
                  alt="BlueStone Bank"
                  className="w-8 h-8 object-contain opacity-90"
                />
                <span className="text-white font-bold text-sm tracking-wide">BlueStone</span>
              </div>
              {/* Chip */}
              <div
                className="w-10 h-7 rounded-md border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.78 0.14 75) 0%, oklch(0.68 0.12 70) 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                <div className="w-full h-full rounded-md grid grid-cols-2 gap-px p-1 opacity-60">
                  <div className="bg-white/30 rounded-sm" />
                  <div className="bg-white/30 rounded-sm" />
                  <div className="bg-white/30 rounded-sm" />
                  <div className="bg-white/30 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Card Number */}
            <div className="font-mono text-white text-lg tracking-widest">
              •••• &nbsp;•••• &nbsp;•••• &nbsp;{lastFour}
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Card Holder</p>
                <p className="text-white font-semibold text-sm tracking-wide uppercase">
                  {cardholderName || 'ACCOUNT HOLDER'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Expires</p>
                <p className="text-white font-semibold text-sm font-mono">{expiry}</p>
              </div>
              {/* Visa-style logo */}
              <div className="flex items-center">
                <span className="text-white font-bold text-xl italic tracking-tight opacity-90">VISA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="card-face card-face-back"
          style={{
            background: 'linear-gradient(135deg, oklch(0.16 0.07 240) 0%, oklch(0.24 0.07 240) 100%)',
            boxShadow: '0 20px 60px rgba(15, 30, 80, 0.4), 0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <div className="relative z-10 flex flex-col h-full">
            {/* Magnetic stripe */}
            <div className="w-full h-12 mt-8" style={{ background: 'oklch(0.10 0.02 240)' }} />

            {/* Signature strip + CVV */}
            <div className="px-6 mt-5 flex items-center gap-3">
              <div
                className="flex-1 h-10 rounded flex items-center px-3"
                style={{ background: 'oklch(0.95 0.005 60)' }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-5 rounded-sm opacity-30"
                      style={{
                        background: i % 2 === 0 ? 'oklch(0.30 0.05 240)' : 'oklch(0.50 0.05 240)',
                        transform: `rotate(${(i % 3) * 5 - 5}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="w-14 h-10 rounded flex items-center justify-center"
                style={{ background: 'oklch(0.95 0.005 60)' }}
              >
                <span className="text-foreground font-mono font-bold text-sm">•••</span>
              </div>
            </div>
            <p className="text-white/40 text-xs text-right px-6 mt-1">CVV</p>

            {/* Bottom info */}
            <div className="mt-auto px-6 pb-5 flex items-end justify-between">
              <div>
                <p className="text-white/40 text-xs">Customer Service</p>
                <p className="text-white/70 text-sm font-mono">1-800-BLUESTONE</p>
              </div>
              <span className="text-white font-bold text-xl italic tracking-tight opacity-70">VISA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flip hint */}
      <div className="flex items-center justify-center gap-1 mt-2">
        <CreditCard className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Tap to flip</span>
      </div>
    </div>
  );
}
