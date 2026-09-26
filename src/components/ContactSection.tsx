import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES_CATALOG } from '../data/servicesData';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || 'Website Development');
  const [budget, setBudget] = useState('PKR 25,000–75,000');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What information should I share for a quote?',
      a: 'Describe the goal, the current problem, required features or machinery specifications, preferred timeline, and any existing technical setup that matters.'
    },
    {
      q: 'Can MRK work with clients remotely?',
      a: 'Yes. Remote enquiries, software development, code updates, and remote PLC diagnostic support can be reviewed and delivered seamlessly via WhatsApp, email, or video call.'
    },
    {
      q: 'Is every listed service available for every project?',
      a: 'No. Services are assessed against your actual requirement and our operational schedule before work is accepted. This keeps expectations realistic and quality uncompromised.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !description.trim()) return;

    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `*MRK Digital Contact Inquiry*
*Name:* ${name || 'Prospective Client'}
*Contact:* ${contact || 'Via WhatsApp'}
*Email:* ${email || 'N/A'}
*Service:* ${service}
*Budget:* ${budget}
*Preferred Method:* ${preferredContact}
*Message:* ${description || 'I would like to discuss a project with MRK Digital.'}`;

    return `https://wa.me/923270447263?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 bg-[#07182e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (5 cols): Contact Details & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#28d5c6]">
              Start a Conversation
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Need this solution for your project?
            </h2>

            <p className="text-sm text-blue-100/80 leading-relaxed">
              Share what you are trying to achieve. The more useful context you provide regarding your website, machinery, or timeline, the faster and more accurate our initial scope assessment will be.
            </p>

            {/* Direct WhatsApp Callout Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp MRK Directly</span>
              </a>
              <a
                href="tel:+923270447263"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#28d5c6]" />
                <span>Call 0327-0447263</span>
              </a>
            </div>

            {/* Verified Contact Details Box */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#28d5c6]">
                Direct Channels
              </h3>

              <div className="flex items-start gap-3 text-xs text-blue-100">
                <Phone className="w-4 h-4 text-[#28d5c6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Direct Phone &amp; WhatsApp</span>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    <a href="tel:+923270447263" className="hover:underline text-blue-200 font-bold">
                      +92 327 0447263 (03270447263)
                    </a>
                    <a
                      href="https://wa.me/923270447263"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold hover:underline"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-blue-100">
                <Mail className="w-4 h-4 text-[#28d5c6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Email Address</span>
                  <a href="mailto:hafizmuhammadmeeladraza@gmail.com" className="hover:underline text-blue-200">
                    hafizmuhammadmeeladraza@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-blue-100">
                <MapPin className="w-4 h-4 text-[#28d5c6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Service Areas</span>
                  <span>Mian Channu, Khanewal, Kabirwala, Multan, Burewala, Punjab, Pakistan &amp; Remote Clients Worldwide</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-blue-100">
                <Phone className="w-4 h-4 text-[#28d5c6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Operational Hours</span>
                  <span>Mon – Sat: 9:00 AM – 8:00 PM (PKT) • Urgent inquiries answered via WhatsApp (0327-0447263)</span>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#28d5c6]">
                Before you get in touch
              </h4>
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between text-xs font-bold text-white hover:text-[#28d5c6] transition-colors py-1"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-blue-100/70 mt-1 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (7 cols): Formal Quote Form */}
          <div className="lg:col-span-7 bg-white text-[#0a1d35] p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20">
            
            <div className="mb-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1168c8]">
                Request a Detailed Scope &amp; Quote
              </span>
              <h3 className="text-2xl font-extrabold text-[#0a1d35] mt-1">
                Tell us about your project
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-950">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Your enquiry for <strong>{service}</strong> has been logged. We will review the feasibility and contact you via {preferredContact}.
                </p>

                <div className="pt-3 max-w-sm mx-auto">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up via WhatsApp Instantly</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-700 font-bold hover:underline block mx-auto pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hafiz Muhammad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                      WhatsApp / Mobile Contact *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                      Required Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none bg-white"
                    >
                      {SERVICES_CATALOG.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                      Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none bg-white"
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
                      Preferred Communication
                    </label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none bg-white"
                    >
                      <option>WhatsApp</option>
                      <option>Phone</option>
                      <option>Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                    Project Description &amp; Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the problem you need solved, your timeline, machinery specs or site location..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Quote Request</span>
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open in WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-gray-400">
                  We use these details only to respond to your enquiry. Your privacy is respected.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
