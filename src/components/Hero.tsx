import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Calculator, Sparkles, MessageCircle } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenQuote, onOpenChat }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07182e] via-[#0c315c] to-[#0e497c] text-white py-16 lg:py-24">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#28d5c6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[#28d5c6] text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28d5c6] animate-pulse"></span>
              Web Development • Digital Services • Automation
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Professional Web, Digital &amp; Automation Solutions
            </h1>

            {/* Lead */}
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl font-normal">
              MRK Digital &amp; Online Services Center helps businesses and technical projects move forward with practical web development, digital services, PLC, Arduino and automation support.
            </p>

            {/* Urdu Tagline */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs max-w-xl">
              <p className="text-lg sm:text-xl font-semibold text-[#c7eef2] text-right font-serif tracking-normal" dir="rtl" lang="ur">
                آپ کی ہر آن لائن اور ٹیکنیکل ضرورت، ایک ہی جگہ!
              </p>
            </div>

            {/* Hero Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-sm shadow-lg shadow-blue-900/30 transition-all hover:scale-102 active:scale-98"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#28d5c6]/20 hover:bg-[#28d5c6]/30 text-[#28d5c6] font-bold text-sm border border-[#28d5c6]/40 transition-all hover:scale-102 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#28d5c6] animate-pulse" />
                <span>Ask AI Advisor</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all hover:scale-102 active:scale-98"
              >
                <span>View All 36 Services</span>
              </button>

              <button
                onClick={() => onNavigate('estimator')}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold text-sm border border-emerald-400/30 transition-all"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Scope Estimator</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/15">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#28d5c6] shrink-0" />
                <span className="text-xs text-blue-100 font-medium">Clear Scope Agreed First</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#28d5c6] shrink-0" />
                <span className="text-xs text-blue-100 font-medium">Verified Code &amp; Hardware</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-[#28d5c6] shrink-0" />
                <span className="text-xs text-blue-100 font-medium">Pakistan &amp; Remote Clients</span>
              </div>
            </div>

          </div>

          {/* Hero Side Panel (Right 5 cols) - Matches the Theme's starting point panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-md bg-[#28d5c6]/20 border border-[#28d5c6]/30 text-[#28d5c6] text-[11px] font-bold uppercase tracking-wider">
                  Quick Start
                </span>
              </div>

              <p className="text-xs uppercase font-extrabold tracking-widest text-[#28d5c6] mb-2">
                A Practical Starting Point
              </p>
              
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Tell us what you need to solve.
              </h2>

              <ul className="space-y-3.5 mb-6 text-sm text-blue-100">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#28d5c6]">
                    ✓
                  </div>
                  <span><strong>Business websites &amp; e-commerce</strong> built for fast mobile load and conversion.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#28d5c6]">
                    ✓
                  </div>
                  <span><strong>PLC, Arduino, and sensor automation</strong> for factory machines and water pumps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#28d5c6]">
                    ✓
                  </div>
                  <span><strong>Digital services &amp; IT troubleshooting</strong> for office documents and workstations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#28d5c6]">
                    ✓
                  </div>
                  <span><strong>Honest communication</strong>: scope and feasibility confirmed before commitments.</span>
                </li>
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-[#0a1d35] font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 text-[#1168c8]" />
                </button>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button
                    onClick={() => onNavigate('projects')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-200 hover:text-white border border-white/10 transition-colors font-medium"
                  >
                    Water Tank Project →
                  </button>
                  <button
                    onClick={() => onNavigate('guides')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-200 hover:text-white border border-white/10 transition-colors font-medium"
                  >
                    PLC vs Arduino Guide →
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
