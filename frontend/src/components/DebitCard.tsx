import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FULL_CARD_NUMBER = '1234  5678  9876  5432';
const MASKED_CARD_NUMBER = '••••  ••••  ••••  5432';

export default function DebitCard() {
  const [isCardNumberVisible, setIsCardNumberVisible] = useState(false);

  return (
    <div className="mx-5 mb-4">
      {/* Card container with aspect ratio matching a real credit card (85.6mm × 53.98mm ≈ 1.586:1) */}
      <div
        className="relative w-full rounded-2xl overflow-hidden select-none"
        style={{
          aspectRatio: '1.586 / 1',
          background: 'linear-gradient(135deg, oklch(0.22 0.09 240) 0%, oklch(0.35 0.13 225) 45%, oklch(0.28 0.11 250) 100%)',
          boxShadow: '0 8px 32px oklch(0.15 0.09 240 / 0.55), 0 2px 8px oklch(0.15 0.09 240 / 0.35)',
        }}
      >
        {/* Decorative circles for depth */}
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'oklch(0.65 0.12 220)' }}
        />
        <div
          className="absolute -bottom-10 -left-6 w-36 h-36 rounded-full opacity-15"
          style={{ background: 'oklch(0.55 0.10 240)' }}
        />
        {/* Subtle diagonal shine */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(120deg, transparent 30%, oklch(1 0 0 / 0.4) 50%, transparent 70%)',
          }}
        />

        {/* Card content */}
        <div className="relative h-full flex flex-col justify-between p-4">

          {/* Top row: Chip + Bank Name */}
          <div className="flex items-start justify-between">
            {/* EMV Chip */}
            <div
              className="w-9 h-7 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, oklch(0.82 0.12 85) 0%, oklch(0.72 0.10 80) 100%)',
                boxShadow: '0 1px 4px oklch(0 0 0 / 0.4)',
              }}
            >
              {/* Chip lines */}
              <div className="w-full h-full rounded-md overflow-hidden relative">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px p-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        background: i === 4
                          ? 'oklch(0.65 0.10 80)'
                          : 'oklch(0.78 0.11 83)',
                        border: '0.5px solid oklch(0.60 0.09 78)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bank Name — top right corner */}
            <div className="flex flex-col items-end">
              <p
                className="text-white font-bold tracking-wide leading-none"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  textShadow: '0 1px 3px oklch(0 0 0 / 0.4)',
                  fontFamily: 'Georgia, serif',
                }}
              >
                BlueStone
              </p>
              <p
                className="font-semibold tracking-widest leading-none mt-0.5"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.14em',
                  color: 'oklch(0.82 0.12 85)',
                  textShadow: '0 1px 2px oklch(0 0 0 / 0.3)',
                }}
              >
                BANK
              </p>
            </div>
          </div>

          {/* Middle: Card Number + Toggle */}
          <div className="flex items-center justify-center gap-2">
            <p
              className="text-white font-mono tracking-widest text-sm font-semibold transition-all duration-300"
              style={{ letterSpacing: '0.18em', textShadow: '0 1px 3px oklch(0 0 0 / 0.4)' }}
            >
              {isCardNumberVisible ? FULL_CARD_NUMBER : MASKED_CARD_NUMBER}
            </p>
            <button
              onClick={() => setIsCardNumberVisible((prev) => !prev)}
              aria-label={isCardNumberVisible ? 'Hide card number' : 'Show card number'}
              className="flex items-center justify-center rounded-full p-1 transition-colors duration-200 focus:outline-none"
              style={{
                background: 'oklch(1 0 0 / 0.12)',
                color: 'oklch(1 0 0 / 0.75)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'oklch(1 0 0 / 0.22)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'oklch(1 0 0 / 0.12)';
              }}
            >
              {isCardNumberVisible ? (
                <EyeOff size={13} strokeWidth={2} />
              ) : (
                <Eye size={13} strokeWidth={2} />
              )}
            </button>
          </div>

          {/* Bottom row: Valid Thru + Name + Network */}
          <div className="flex items-end justify-between">
            {/* Left: Valid Thru + Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div>
                  <p
                    className="text-white/50 uppercase font-medium"
                    style={{ fontSize: '0.45rem', letterSpacing: '0.08em' }}
                  >
                    Valid Thru
                  </p>
                  <p
                    className="text-white font-mono font-semibold"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}
                  >
                    08/29
                  </p>
                </div>
              </div>
              <p
                className="text-white font-semibold uppercase tracking-widest"
                style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textShadow: '0 1px 2px oklch(0 0 0 / 0.3)' }}
              >
                Laura Patterson
              </p>
            </div>

            {/* Right: Visa-style logo */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-0.5">
                <div
                  className="w-6 h-6 rounded-full opacity-90"
                  style={{ background: 'oklch(0.55 0.22 30)' }}
                />
                <div
                  className="w-6 h-6 rounded-full opacity-80 -ml-3"
                  style={{ background: 'oklch(0.75 0.18 65)' }}
                />
              </div>
              <p
                className="text-white/60 font-bold italic"
                style={{ fontSize: '0.5rem', letterSpacing: '0.04em', marginTop: '1px' }}
              >
                DEBIT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
