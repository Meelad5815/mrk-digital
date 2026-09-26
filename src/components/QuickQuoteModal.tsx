import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { SERVICES_CATALOG } from '../data/servicesData';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService || 'Website Development');
  const [budget, setBudget] = useState('PKR 25,000–75,000');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `*Quick Quote Enquiry — MRK Digital*
*Name:* ${name || 'Client'}
*Contact:* ${contact || 'Via WhatsApp'}
*Email:* ${email || 'N/A'}
*Service:* ${service}
*Budget:* ${budget}
*Preferred:* ${preferredContact}
*Details:* ${description || 'Please let me know availability and scope.'}`;

    return `https://wa.me/923270447263?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#dce5ee] overflow-hidden my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#07182e] to-[#0c315c] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#28d5c6] block mb-1">
            MRK Digital &amp; Online Services Center
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Request a Free Quote
          </h2>
          <p className="text-blue-100 text-xs mt-1">
            We confirm scope and feasibility before any commitment.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">
                Thank You, {name}!
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your request for <strong>{service}</strong> has been received. We will get in touch with you shortly.
              </p>
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-emerald-700 font-bold hover:underline block mx-auto pt-2"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                    WhatsApp / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                  Required Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none bg-white"
                >
                  {SERVICES_CATALOG.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} ({s.area})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                    Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none bg-white"
                  >
                    <option>Under PKR 25,000</option>
                    <option>PKR 25,000–75,000</option>
                    <option>PKR 75,000–200,000</option>
                    <option>Above PKR 200,000</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                    Preferred Contact
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none bg-white"
                  >
                    <option>WhatsApp</option>
                    <option>Phone</option>
                    <option>Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share what you are trying to solve, system specs, timeline, or current challenge..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Quote Request</span>
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp Directly</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
