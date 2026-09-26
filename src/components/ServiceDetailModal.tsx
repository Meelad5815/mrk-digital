import React from 'react';
import { X, CheckCircle, Cpu, Clock, Users, ArrowRight, HelpCircle, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceItem } from '../data/servicesData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onOpenQuote }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#dce5ee] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#07182e] to-[#0c315c] text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-block px-3 py-1 rounded-full bg-[#28d5c6]/20 border border-[#28d5c6]/30 text-[#28d5c6] text-xs font-bold uppercase tracking-wider mb-3">
            {service.area}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            {service.title}
          </h2>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
            {service.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-white">
              Starting from {service.startingBudgetPkr}
            </span>
            <span className="text-xs text-blue-200">
              • Scope verified before commitments
            </span>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto grow text-[#0a1d35]">

          {/* Problem & Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f7f9fc] p-5 rounded-xl border border-[#dce5ee]">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
                The Practical Problem
              </h3>
              <p className="text-sm text-[#52657a] leading-relaxed">
                {service.problem}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1168c8] mb-2 flex items-center gap-1.5">
                MRK's Technical Approach
              </h3>
              <p className="text-sm text-[#52657a] leading-relaxed">
                {service.approach}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              What Is Included / Deliverables
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#52657a] bg-white p-2.5 rounded-lg border border-[#dce5ee]">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Stack */}
          <div>
            <h3 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#1168c8]" />
              Technologies &amp; Tools Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-blue-50 text-[#1168c8] font-semibold text-xs border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <h3 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1168c8]" />
              Execution Process
            </h3>
            <ol className="space-y-2.5">
              {service.process.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#52657a]">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1168c8] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Suitable For */}
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-700" />
              Target Audience &amp; Suitable Requirements
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {service.suitableFor}
            </p>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#1168c8]" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border border-[#dce5ee] bg-[#f7f9fc]">
                    <h5 className="font-bold text-sm text-[#0a1d35] mb-1">{faq.question}</h5>
                    <p className="text-xs text-[#52657a] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#f7f9fc] border-t border-[#dce5ee] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-[#52657a] block">Need this service for your project?</span>
            <span className="text-sm font-extrabold text-[#0a1d35]">
              Starting at {service.startingBudgetPkr}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#52657a] hover:text-[#0a1d35] rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(service.title);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Request Quote for {service.title}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
