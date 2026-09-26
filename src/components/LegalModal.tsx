import React, { useState } from 'react';
import { X, Shield, FileText, AlertCircle } from 'lucide-react';

interface LegalModalProps {
  initialTab?: 'privacy' | 'terms' | 'disclaimer';
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ initialTab = 'privacy', isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'disclaimer'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#dce5ee] overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#07182e] text-white p-6 relative flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-white">MRK Digital Policies</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#dce5ee] bg-[#f7f9fc] px-6 shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-[#1168c8] text-[#1168c8] bg-white'
                : 'border-transparent text-[#52657a] hover:text-[#0a1d35]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'terms'
                ? 'border-[#1168c8] text-[#1168c8] bg-white'
                : 'border-transparent text-[#52657a] hover:text-[#0a1d35]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms &amp; Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'disclaimer'
                ? 'border-[#1168c8] text-[#1168c8] bg-white'
                : 'border-transparent text-[#52657a] hover:text-[#0a1d35]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Disclaimer</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-4 overflow-y-auto text-xs text-[#52657a] leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0a1d35]">Privacy Policy</h3>
              <p>
                At MRK Digital &amp; Online Services Center, we take your privacy seriously. This Privacy Policy outlines how we collect, handle, and protect your information when using our website and services.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">Information We Collect</h4>
              <p>
                When you submit an inquiry through our quote forms or contact channels, we collect your name, phone/WhatsApp number, email address, and project requirements. We never collect payment card information directly on our servers.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">How We Use Your Information</h4>
              <p>
                Your information is used strictly to communicate with you regarding your technical inquiries, project feasibility, quote delivery, and agreed milestone completion. We do not sell, rent, or share your contact details with any third-party marketing companies.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">Data Security</h4>
              <p>
                We use secure modern HTTPS transport and adhere to strict technical controls to prevent unauthorized access or disclosure of client communication records.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0a1d35]">Terms &amp; Conditions</h3>
              <p>
                By requesting services or engaging MRK Digital &amp; Online Services Center for web development, PLC programming, or hardware automation, you agree to the following terms:
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">Scope &amp; Quotations</h4>
              <p>
                All project estimates, whether generated via our online estimator or informal discussions, are provisional until a verified scope document is agreed between the client and MRK Digital. Work begins only upon mutual confirmation.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">Client Ownership</h4>
              <p>
                Upon receipt of full agreed payment for a project, the client holds full ownership of the custom developed code, theme templates, microcontroller firmware, and PLC ladder diagrams created specifically for their project.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">Electrical &amp; Installation Standards</h4>
              <p>
                While MRK Digital provides tested schematics, optical isolation, and firmware, final on-site physical wiring of high-voltage industrial machinery and 3-phase pumps must be inspected by qualified electrical personnel adhering to local safety codes.
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0a1d35]">Disclaimer</h3>
              <p>
                The information provided on this website, including educational articles and project case studies, is for informational and technical guidance purposes.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">No Unverified Claims</h4>
              <p>
                MRK Digital publishes only work and case studies with verified context. Technical advice in blog posts (such as PLC vs Arduino or Water Tank wiring) is educational and does not substitute for on-site engineering assessments under specific factory conditions.
              </p>
              <h4 className="font-bold text-[#0a1d35] text-sm">Electrical Safety Caution</h4>
              <p>
                Working with mains AC electricity (230V / 400V) poses risks of severe electric shock or fire. Any implementation of automatic pump controllers, relays, or motor starters must include proper fusing, earthing, and qualified supervision.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f7f9fc] border-t border-[#dce5ee] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0a1d35] hover:bg-[#1168c8] text-white text-xs font-bold transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
