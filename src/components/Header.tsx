import React, { useState } from 'react';
import { Menu, X, MessageSquare, Calculator, Layers, Cpu, BookOpen, User, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, onOpenQuote, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'services', label: 'Services', badge: '36' },
    { id: 'projects', label: 'Projects' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'faq', label: 'FAQ' },
    { id: 'guides', label: 'Guides & Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#dce5ee] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1168c8] to-[#07182e] flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-[#1168c8]/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="font-extrabold text-lg text-[#0a1d35] leading-none tracking-tight flex items-center gap-1.5">
                MRK Digital
                <span className="inline-block w-2 h-2 rounded-full bg-[#28d5c6]"></span>
              </div>
              <p className="text-xs text-[#52657a] font-medium tracking-wide mt-1">
                Online Services Center
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-semibold transition-colors relative py-1 focus:outline-none flex items-center gap-1.5 ${
                  activeSection === link.id
                    ? 'text-[#1168c8]'
                    : 'text-[#0a1d35] hover:text-[#1168c8]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-[#1168c8]">
                    {link.badge}
                  </span>
                )}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1168c8] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1168c8] bg-blue-50/80 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#1168c8] animate-pulse"></span>
              <span>Ask AI Consultant</span>
            </button>

            <a
              href="https://wa.me/923270447263?text=Hello%20MRK%20Digital,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#0a1d35] bg-[#f7f9fc] hover:bg-emerald-50 hover:text-emerald-700 border border-[#dce5ee] hover:border-emerald-300 rounded-lg transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              WhatsApp MRK
            </a>

            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1168c8] hover:bg-[#0755a9] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="px-2.5 py-1.5 text-xs font-bold text-[#1168c8] bg-blue-50 border border-blue-200 rounded-lg"
            >
              AI Advisor
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#1168c8] rounded-lg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0a1d35] hover:bg-[#f7f9fc] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#dce5ee] bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                activeSection === link.id
                  ? 'bg-blue-50 text-[#1168c8]'
                  : 'text-[#0a1d35] hover:bg-[#f7f9fc]'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1168c8]">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-[#dce5ee] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#1168c8] bg-blue-50 border border-blue-200 rounded-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#1168c8] animate-pulse"></span>
              <span>Ask AI Consultant (Gemini)</span>
            </button>
            <a
              href="https://wa.me/923270447263?text=Hello%20MRK%20Digital,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#0a1d35] bg-[#f7f9fc] border border-[#dce5ee] rounded-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              WhatsApp Directly
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#1168c8] rounded-lg shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Request a Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
