import { Link, useNavigate } from '@tanstack/react-router';
import LoginButton from './LoginButton';
import { Home, History, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SiFacebook, SiX, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/transactions', label: 'History', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'oklch(0.96 0.008 240)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-lg border-b border-border"
        style={{
          background: 'oklch(0.18 0.08 240 / 0.97)',
          boxShadow: '0 2px 16px rgba(15, 30, 80, 0.25)',
        }}
      >
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/assets/generated/bank-icon.dim_256x256.png"
                alt="BlueStone Bank Icon"
                className="w-9 h-9 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">BlueStone Bank</h1>
                <p className="text-xs tracking-widest uppercase" style={{ color: 'oklch(0.78 0.14 75)' }}>
                  Solid Foundations. Secure Futures
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                  activeProps={{ className: 'flex items-center gap-2 text-sm font-medium text-white' }}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden md:block">
              <LoginButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors py-2"
                  activeProps={{ className: 'flex items-center gap-2 text-sm font-medium text-white py-2' }}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <LoginButton />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="border-t border-border mt-auto"
        style={{ background: 'oklch(0.18 0.08 240)' }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/assets/generated/bank-icon.dim_256x256.png"
                  alt="BlueStone Bank Icon"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-white">BlueStone Bank</span>
              </div>
              <p className="text-sm text-white/50">
                Modern banking solutions built on the Internet Computer.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-white mb-3">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  <SiX className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  <SiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/40">
            <p className="flex items-center justify-center gap-1 flex-wrap">
              © {new Date().getFullYear()} BlueStone Bank. Built with{' '}
              <Heart className="w-3.5 h-3.5 inline" style={{ color: 'oklch(0.78 0.14 75)', fill: 'oklch(0.78 0.14 75)' }} />
              {' '}using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white hover:underline font-medium transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
