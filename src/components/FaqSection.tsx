import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, DollarSign, Clock, 
  Search, MessageSquare, Sparkles, MessageCircle, Phone, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'pricing' | 'timeline' | 'technical' | 'general';
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  keyHighlight?: {
    label: string;
    value: string;
    icon: 'dollar' | 'clock' | 'check' | 'shield';
  };
}

const FAQ_ITEMS: FaqItem[] = [
  // --- Pricing Questions ---
  {
    id: 'pricing-structure',
    category: 'pricing',
    question: 'How does MRK Digital calculate pricing for projects?',
    shortAnswer: 'We work on transparent fixed-scope milestone quotes. You receive an itemized proposal before work begins, with zero hidden costs.',
    detailedAnswer: [
      'Every project begins with a structured feasibility review to define exact requirements, functional deliverables, and hardware/software dependencies.',
      'For software and web development, pricing is based on the number of pages, custom features, third-party API integrations, and turnaround urgency.',
      'For industrial automation and PLC programming, pricing factors in I/O point count, hardware brand (Siemens, Delta, Mitsubishi), safety interlocks, and whether physical on-site commissioning is required.',
      'For Arduino and IoT hardware, we provide a complete bill of materials (sensors, relays, enclosures) alongside the engineering firmware fee.'
    ],
    keyHighlight: {
      label: 'Pricing Model',
      value: 'Milestone & Fixed Scope',
      icon: 'dollar'
    }
  },
  {
    id: 'starting-rates',
    category: 'pricing',
    question: 'What are the typical starting prices for core services?',
    shortAnswer: 'Website development starts from PKR 25,000 (~$90 USD), WordPress themes from PKR 30,000 (~$110 USD), and PLC/automation from PKR 50,000 (~$180 USD).',
    detailedAnswer: [
      'Custom Web Development: Basic responsive sites start at PKR 25,000 (~$90 USD); dynamic full-stack portals start from PKR 65,000 (~$235 USD).',
      'WordPress & Shopify: Standard business setup from PKR 30,000 (~$110 USD); full e-commerce with Cash on Delivery (COD) and courier integration from PKR 45,000 (~$160 USD).',
      'Industrial PLC Programming: Diagnostics and code fixes start at PKR 25,000; ground-up automated machinery ladder logic starts at PKR 50,000 (~$180 USD).',
      'Automatic Water Tank Controller: Complete hardware unit with dual sensors and heavy-duty 30A opto-relay starts at PKR 18,000 (~$65 USD).'
    ],
    keyHighlight: {
      label: 'Starting Rates',
      value: 'From PKR 18,000+ ($65+)',
      icon: 'dollar'
    }
  },
  {
    id: 'payment-milestones',
    category: 'pricing',
    question: 'What payment terms, deposit percentages, and payment methods are accepted?',
    shortAnswer: 'Standard projects require a 40% initial deposit, 30% at midway staging milestone, and 30% upon final signoff and deployment.',
    detailedAnswer: [
      'Standard Milestone Schedule: 40% deposit to initiate engineering, 30% upon demo review on staging/test-bench, and remaining 30% upon final live deployment and source code transfer.',
      'Smaller urgent fixes under PKR 20,000 can be arranged with a simple 50/50 arrangement.',
      'Local Pakistan Payment Methods: Direct Bank Transfer (Meezan, HBL, UBL), JazzCash, and EasyPaisa.',
      'International Clients: Payoneer, Wise, direct international bank wire, and Western Union in USD/EUR/GBP.'
    ],
    keyHighlight: {
      label: 'Deposit',
      value: '40% Kickoff / 60% Milestones',
      icon: 'shield'
    }
  },
  {
    id: 'scope-changes',
    category: 'pricing',
    question: 'What happens if we want to change or add features during the project?',
    shortAnswer: 'Minor design tweaks are included free. Any major new feature additions are scoped separately as a clear addendum before incurring extra costs.',
    detailedAnswer: [
      'We believe in honest partnerships without surprise bills. If you need a cosmetic tweak or reasonable adjustment to an agreed feature, we take care of it within scope.',
      'If you wish to introduce a major new component (such as an extra payment gateway, 20 additional pages, or extra PLC sensor loops), we provide a written estimate for the additional hours and get your written approval first.'
    ],
    keyHighlight: {
      label: 'Change Orders',
      value: 'Pre-Approved Transparency',
      icon: 'check'
    }
  },

  // --- Timeline Questions ---
  {
    id: 'web-timeline',
    category: 'timeline',
    question: 'How long does it take to design and launch a new business website?',
    shortAnswer: 'A standard 5–7 page responsive website typically takes 5 to 10 business days from content receipt to live domain deployment.',
    detailedAnswer: [
      'Day 1–2: Project kickoff, architecture map, wireframing, and branding design assets review.',
      'Day 3–6: Frontend React / WordPress theme coding, responsive mobile optimization, and content structuring.',
      'Day 7–8: Interactive elements, WhatsApp integration, quote/contact forms, and speed/SEO audits.',
      'Day 9–10: Client revision round, domain DNS propagation, and live launch.',
      'Urgent Rush Delivery: If you have all copy and images ready, a 72-hour express delivery option is available.'
    ],
    keyHighlight: {
      label: 'Standard Website',
      value: '5 – 10 Business Days',
      icon: 'clock'
    }
  },
  {
    id: 'plc-timeline',
    category: 'timeline',
    question: 'What is the turnaround time for PLC programming and industrial machinery troubleshooting?',
    shortAnswer: 'Remote diagnostics and signal fault-finding begin within 24 to 48 hours. Complete machine automation projects typically take 1 to 3 weeks.',
    detailedAnswer: [
      'Emergency Troubleshooting: For production line halts, remote diagnostic review of existing ladder logic (Siemens, Delta, Mitsubishi) is initiated within 24–48 hours.',
      'New Machine Sequence Programming: 1 to 2 weeks for comprehensive ladder logic design, timer routines, safety interlocking, and off-line simulation.',
      'Panel Assembly & Wiring: 1 to 3 weeks for DIN-rail component mounting, VFD speed parameter configuration, numbered cable ferrule labeling, and physical trial runs.'
    ],
    keyHighlight: {
      label: 'PLC Turnaround',
      value: '24-48h Diagnostics / 1-3 Wks',
      icon: 'clock'
    }
  },
  {
    id: 'hardware-timeline',
    category: 'timeline',
    question: 'How long does hardware assembly take for the Automatic Water Tank Controller?',
    shortAnswer: 'Pre-assembled units are dispatched within 2 to 4 business days. Custom automated sensor rigs take 5 to 7 days including burn-in testing.',
    detailedAnswer: [
      'Standard Automatic Water Tank Controller units are kept in modular pre-assembled stock and undergo 24-hour continuous relay burn-in testing before dispatch.',
      'Dispatch across Punjab (Mian Channu, Khanewal, Kabirwala, Multan, Burewala) takes 1–3 business days via courier or direct local arrangement.',
      'Custom IoT telemetry rigs (with ESP32, Wi-Fi cloud dashboards, and automated WhatsApp notifications) require 5–7 business days to assemble, flash firmware, and calibrate sensors.'
    ],
    keyHighlight: {
      label: 'Hardware Assembly',
      value: '2 – 4 Days Dispatch',
      icon: 'clock'
    }
  },
  {
    id: 'client-readiness',
    category: 'timeline',
    question: 'What do I need to prepare before work can begin on my project?',
    shortAnswer: 'Having your core goals, brand assets (or machine schematics), and preferred contact information ready prevents any project delays.',
    detailedAnswer: [
      'For Websites & E-Commerce: Company logo, product details, services text, and hosting/domain login credentials (we can assist in purchasing them if you do not have them yet).',
      'For PLC & Automation: Machine electrical drawings, sensor types (NPN/PNP 24V), motor ratings (HP/kW), and a bulleted step-by-step description of how the machine should cycle.',
      'For Quick Consultation: Simply a brief message via WhatsApp describing the problem or objective you want to solve!'
    ],
    keyHighlight: {
      label: 'Kickoff Requirement',
      value: 'Brief Requirements & Goals',
      icon: 'check'
    }
  },

  // --- Technical & Warranty Questions ---
  {
    id: 'code-ownership',
    category: 'technical',
    question: 'Do I get full ownership of the source code and PLC programs after delivery?',
    shortAnswer: 'Yes, 100%. You receive clean, unencrypted source code, ladder files, admin credentials, and documentation with zero vendor lock-in.',
    detailedAnswer: [
      'We do not lock clients out of their own assets or use proprietary encrypted blocks without master keys.',
      'For websites: Full GitHub repository access or zipped source files, production build files, and hosting credentials.',
      'For PLCs: Unprotected ladder logic source files (ISPSoft, TIA Portal, GX Works), annotated rung comments, and I/O assignment sheets.',
      'For microcontrollers: Complete Arduino C++ sketch and schematic wiring pinout diagram.'
    ],
    keyHighlight: {
      label: 'Ownership',
      value: '100% Unrestricted Code Rights',
      icon: 'shield'
    }
  },
  {
    id: 'post-launch-warranty',
    category: 'technical',
    question: 'Is there a warranty or post-launch support included after project handover?',
    shortAnswer: 'Yes, all projects include 30 days of complimentary bug-fixing and operational support to ensure smooth operation.',
    detailedAnswer: [
      'Every web, software, and automation deliverable is backed by 30 days of active warranty against technical defects, broken links, or logic bugs in agreed scope.',
      'We provide video walk-throughs or remote sessions demonstrating how to operate your website dashboard or adjust controller setpoints.',
      'Ongoing monthly maintenance and retainer support packages are also available for growing businesses.'
    ],
    keyHighlight: {
      label: 'Warranty Period',
      value: '30 Days Complimentary Support',
      icon: 'shield'
    }
  }
];

interface FaqSectionProps {
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenChat: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenQuote, onOpenChat }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pricing' | 'timeline' | 'technical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'pricing-structure': true,
    'web-timeline': true
  });

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const nextState: Record<string, boolean> = {};
    FAQ_ITEMS.forEach(item => {
      nextState[item.id] = true;
    });
    setOpenIds(nextState);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        item.question.toLowerCase().includes(q) ||
        item.shortAnswer.toLowerCase().includes(q) ||
        item.detailedAnswer.some(d => d.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 bg-[#f7f9fc] border-t border-[#dce5ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-[#1168c8] text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Client Clarifications &amp; Pricing Policies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-[#52657a] leading-relaxed">
            Transparent answers on project pricing, delivery timelines, payment milestones, and technical handovers. Clear scopes from day one.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pricing, delivery days, milestone terms, or PLC timelines..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#dce5ee] rounded-xl text-xs sm:text-sm font-medium text-[#0a1d35] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1168c8] transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse Toggle Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-semibold text-[#52657a]">
              <button
                onClick={expandAll}
                className="px-3 py-2 rounded-lg bg-white border border-[#dce5ee] hover:bg-gray-50 transition-colors shadow-2xs"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 rounded-lg bg-white border border-[#dce5ee] hover:bg-gray-50 transition-colors shadow-2xs"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Questions', count: FAQ_ITEMS.length },
              { id: 'pricing', label: 'Pricing & Payments', icon: DollarSign, count: FAQ_ITEMS.filter(i => i.category === 'pricing').length },
              { id: 'timeline', label: 'Timelines & Delivery', icon: Clock, count: FAQ_ITEMS.filter(i => i.category === 'timeline').length },
              { id: 'technical', label: 'Code Ownership & Warranty', icon: ShieldCheck, count: FAQ_ITEMS.filter(i => i.category === 'technical').length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1168c8] text-white shadow-xs'
                      : 'bg-white text-[#52657a] hover:bg-gray-100 border border-[#dce5ee]'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Accordion FAQ Items List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#dce5ee] shadow-xs space-y-3">
              <HelpCircle className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-sm font-bold text-[#0a1d35]">
                No matching questions found for "{searchQuery}"
              </p>
              <p className="text-xs text-[#52657a]">
                Have a custom question about your machinery or website? Ask our AI Consultant or chat on WhatsApp!
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="px-4 py-2 text-xs font-bold text-[#1168c8] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                  Reset Filter
                </button>
                <button
                  onClick={onOpenChat}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#1168c8] rounded-lg hover:bg-[#0755a9]"
                >
                  Ask AI Consultant
                </button>
              </div>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-[#1168c8]/40 shadow-sm ring-1 ring-[#1168c8]/20' 
                      : 'border-[#dce5ee] hover:border-gray-300 shadow-2xs'
                  }`}
                >
                  {/* Header Question Bar */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                        item.category === 'pricing'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.category === 'timeline'
                          ? 'bg-blue-50 text-[#1168c8] border border-blue-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {item.category === 'pricing' ? (
                          <DollarSign className="w-3.5 h-3.5" />
                        ) : item.category === 'timeline' ? (
                          <Clock className="w-3.5 h-3.5" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div>
                        <span className="text-sm sm:text-base font-bold text-[#0a1d35] block leading-snug">
                          {item.question}
                        </span>
                        {!isOpen && (
                          <p className="text-xs text-[#52657a] line-clamp-1 mt-1 font-medium">
                            {item.shortAnswer}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.keyHighlight && !isOpen && (
                        <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                          {item.keyHighlight.value}
                        </span>
                      )}
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'bg-[#1168c8] text-white rotate-180' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content Body */}
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-gray-100 bg-[#fafcff]/50 space-y-4 animate-in fade-in duration-200">
                      
                      {/* Short Answer Callout */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1168c8] shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm font-semibold text-[#0a1d35] leading-relaxed">
                          {item.shortAnswer}
                        </p>
                      </div>

                      {/* Detailed Bullet Points */}
                      <div className="space-y-2">
                        {item.detailedAnswer.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#52657a] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1168c8] shrink-0 mt-2" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      {/* Highlight Badge & Contextual Actions */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 text-xs">
                        {item.keyHighlight ? (
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a1d35] bg-white px-3 py-1.5 rounded-lg border border-[#dce5ee]">
                            <span className="text-gray-500 font-medium">{item.keyHighlight.label}:</span>
                            <span className="text-[#1168c8]">{item.keyHighlight.value}</span>
                          </div>
                        ) : <div />}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenQuote(item.category === 'pricing' ? 'Website Development' : undefined)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-2xs transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Calculate Quote</span>
                          </button>
                          <a
                            href="https://wa.me/923270447263?text=Hello%20Hafiz%20Meelad%20Raza,%20I%20have%20a%20question%20regarding%20pricing%20and%20timelines."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Ask on WhatsApp</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner: Direct Inquiries & AI Consultation */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-[#07182e] text-white p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#28d5c6] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Personalized Feasibility Review</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Have a custom machine or unique software requirement?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/70 max-w-xl">
              Talk directly with <strong>Hafiz Muhammad Meelad Raza</strong> on WhatsApp (<strong>0327-0447263</strong>) or use our Gemini AI Advisor for instant technical specifications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#28d5c6]" />
              <span>Ask AI Consultant</span>
            </button>

            <a
              href="https://wa.me/923270447263?text=Hello%20MRK%20Digital,%20I%20would%20like%20to%20discuss%20project%20pricing%20and%20timelines."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp 0327-0447263</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
