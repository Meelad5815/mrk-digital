import React from 'react';
import { Target, Layers, Settings, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

interface WhyUsAndProcessProps {
  onOpenQuote: () => void;
}

export const WhyUsAndProcess: React.FC<WhyUsAndProcessProps> = ({ onOpenQuote }) => {
  return (
    <>
      {/* Dark Section: Why MRK (Matches theme) */}
      <section className="py-20 bg-[#07182e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#28d5c6] mb-2">
              Why MRK Digital
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Focused on useful work, not exaggerated claims.
            </h2>
            <p className="text-base text-blue-100/80 leading-relaxed">
              We eliminate technical ambiguity before projects start. You receive practical engineering and digital craftsmanship backed by honest communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#28d5c6]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#28d5c6] flex items-center justify-center font-bold mb-5">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                Clear Scope
              </h3>
              <p className="text-sm text-blue-100/75 leading-relaxed">
                Requirements, deliverables, hardware specifications, and the right next step are analyzed and agreed before work is committed. No unexpected surprises or unverified claims.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#28d5c6]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#28d5c6] flex items-center justify-center font-bold mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                Cross-Disciplinary
              </h3>
              <p className="text-sm text-blue-100/75 leading-relaxed">
                Digital, web, and physical automation services can be considered together when your project needs both. We seamlessly bridge software logic with physical relays, PLCs, and microcontrollers.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#28d5c6]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#28d5c6] flex items-center justify-center font-bold mb-5">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                Built to Be Manageable
              </h3>
              <p className="text-sm text-blue-100/75 leading-relaxed">
                Websites and systems use clean architectures—whether WordPress, React, or standard industrial Ladder Logic—so routine content and operations remain firmly under your control.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Tint Section: How It Works (Steps 01, 02, 03) */}
      <section className="py-20 bg-[#f7f9fc] border-b border-[#dce5ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#1168c8] mb-2">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight mb-4">
              A straightforward route from idea to next step.
            </h2>
            <p className="text-base text-[#52657a] leading-relaxed">
              Every inquiry follows a transparent 3-step sequence ensuring high quality and mutual understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-7 rounded-2xl border border-[#dce5ee] shadow-sm relative">
              <span className="text-2xl font-black text-[#1168c8] block mb-3">
                01
              </span>
              <h3 className="text-lg font-bold text-[#0a1d35] mb-2">
                Share your need
              </h3>
              <p className="text-xs text-[#52657a] leading-relaxed">
                Send the problem, objectives, and any useful context through our quote form, estimator, or direct WhatsApp message.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#dce5ee] shadow-sm relative">
              <span className="text-2xl font-black text-[#1168c8] block mb-3">
                02
              </span>
              <h3 className="text-lg font-bold text-[#0a1d35] mb-2">
                Confirm the scope
              </h3>
              <p className="text-xs text-[#52657a] leading-relaxed">
                MRK reviews technical feasibility, clarifies the exact deliverables, sets transparent milestones, and confirms the communication channel.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#dce5ee] shadow-sm relative">
              <span className="text-2xl font-black text-[#1168c8] block mb-3">
                03
              </span>
              <h3 className="text-lg font-bold text-[#0a1d35] mb-2">
                Plan &amp; execute the work
              </h3>
              <p className="text-xs text-[#52657a] leading-relaxed">
                Once the scope is suitable, the project moves ahead with agreed expectations, rigorous testing, and complete handover documentation.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Your Requirements With MRK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};
