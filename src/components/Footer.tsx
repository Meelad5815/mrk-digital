import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'disclaimer') => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, onOpenQuote }) => {
  return (
    <>
      <footer className="bg-[#061426] text-[#d1dfed] pt-16 pb-24 lg:pb-12 border-t border-[#132d4b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1b3a5d]">
            
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1168c8] to-[#07182e] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                  M
                </div>
                <div>
                  <div className="font-extrabold text-base text-white leading-none">
                    MRK Digital
                  </div>
                  <div className="text-[11px] text-[#8ea8c4] mt-1 font-medium">
                    Online Services Center
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#9bb0c5] leading-relaxed max-w-sm">
                Practical web, digital and automation support for businesses and technical projects. Focused on useful work, transparent scopes, and long-term reliability.
              </p>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#c2d1e2] max-w-sm">
                <span className="font-bold text-[#28d5c6] block mb-1">Service Coverage</span>
                Serving Mian Channu, Khanewal, Kabirwala, Multan, Burewala, Pakistan &amp; Remote Clients Worldwide.
              </div>
            </div>

            {/* Explore Col */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Explore MRK
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0c5]">
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                    36 Services Catalogue
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">
                    Projects &amp; Water Tank Controller
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('estimator')} className="hover:text-white transition-colors">
                    Scope &amp; Cost Estimator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                    Frequently Asked Questions (FAQ)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('guides')} className="hover:text-white transition-colors">
                    Guides &amp; Blog (PLC / Arduino)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                    About MRK Digital
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                    Contact Center
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Col */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Policies &amp; Trust
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0c5]">
                <li>
                  <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenLegal('disclaimer')} className="hover:text-white transition-colors">
                    Disclaimer
                  </button>
                </li>
                <li className="pt-2">
                  <a
                    href="mailto:hafizmuhammadmeeladraza@gmail.com"
                    className="text-[#28d5c6] hover:underline block break-all"
                  >
                    hafizmuhammadmeeladraza@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+923270447263"
                    className="text-white hover:text-[#28d5c6] transition-colors font-medium flex items-center gap-1.5 pt-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#28d5c6]" />
                    <span>+92 327 0447263</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7187a0] gap-4">
            <p>© {new Date().getFullYear()} MRK Digital &amp; Online Services Center. All rights reserved.</p>
            <p>Non-destructive migration • Built with React &amp; Tailwind CSS</p>
          </div>

        </div>
      </footer>

      {/* Mobile Sticky CTA Bar (Matches theme mobile-cta) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden flex border-t border-[#dce5ee] shadow-2xl bg-white">
        <button
          onClick={onOpenQuote}
          className="w-1/2 py-3.5 text-center text-xs font-extrabold text-[#0a1d35] bg-white hover:bg-gray-50 flex items-center justify-center gap-1.5 border-r border-[#dce5ee]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#1168c8]" />
          <span>Request Quote</span>
        </button>
        <a
          href="https://wa.me/923270447263?text=Hello%20MRK%20Digital,%20I%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/2 py-3.5 text-center text-xs font-extrabold text-white bg-[#128c7e] hover:bg-[#0d6e63] flex items-center justify-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>WhatsApp MRK</span>
        </a>
      </div>
    </>
  );
};
