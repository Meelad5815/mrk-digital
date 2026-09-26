import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle2, Send, MessageCircle, Copy, Sparkles, RefreshCw, Clock, DollarSign } from 'lucide-react';
import { SERVICES_CATALOG, SERVICE_AREAS } from '../data/servicesData';

interface QuoteEstimatorProps {
  initialService?: string;
  onSubmitted?: () => void;
}

interface SubmittedQuote {
  id: string;
  date: string;
  name: string;
  service: string;
  tier: string;
  estimatedPrice: string;
  status: string;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ initialService, onSubmitted }) => {
  // Estimator States
  const [selectedCategory, setSelectedCategory] = useState<string>('Web Development');
  const [selectedService, setSelectedService] = useState<string>(initialService || 'Website Development');
  const [tier, setTier] = useState<'basic' | 'pro' | 'enterprise'>('pro');
  const [timeline, setTimeline] = useState<'standard' | 'express' | 'urgent'>('standard');
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  // Form Fields
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [budgetRange, setBudgetRange] = useState('PKR 25,000–75,000');
  const [description, setDescription] = useState('');
  
  // Submission Status
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recentQuotes, setRecentQuotes] = useState<SubmittedQuote[]>([]);

  // Update selected service if initialService prop changes
  useEffect(() => {
    if (initialService) {
      const match = SERVICES_CATALOG.find(s => s.title.toLowerCase() === initialService.toLowerCase());
      if (match) {
        setSelectedCategory(match.area);
        setSelectedService(match.title);
      }
    }
  }, [initialService]);

  // Load quotes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mrk_quotes_history');
      if (saved) {
        setRecentQuotes(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Filter services by category
  const servicesInCategory = SERVICES_CATALOG.filter(s => s.area === selectedCategory);

  // Base price lookup
  const currentServiceItem = SERVICES_CATALOG.find(s => s.title === selectedService) || servicesInCategory[0];

  const calculateEstimate = () => {
    if (!currentServiceItem) return { pkr: 25000, usd: 90 };

    // Extract numerical value from startingBudgetPkr (e.g. "PKR 25,000" -> 25000)
    const basePkr = parseInt(currentServiceItem.startingBudgetPkr.replace(/[^0-9]/g, ''), 10) || 25000;

    let tierMultiplier = 1.0;
    if (tier === 'pro') tierMultiplier = 1.8;
    if (tier === 'enterprise') tierMultiplier = 3.2;

    let timelineMultiplier = 1.0;
    if (timeline === 'express') timelineMultiplier = 1.25;
    if (timeline === 'urgent') timelineMultiplier = 1.5;

    const estimatedPkr = Math.round(basePkr * tierMultiplier * timelineMultiplier);
    // Approx PKR to USD rate (278 PKR ~ 1 USD)
    const estimatedUsd = Math.round(estimatedPkr / 278);

    return { pkr: estimatedPkr, usd: estimatedUsd };
  };

  const estimate = calculateEstimate();

  const formattedPrice = currency === 'PKR' 
    ? `PKR ${estimate.pkr.toLocaleString()}`
    : `$${estimate.usd.toLocaleString()} USD`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    const newQuote: SubmittedQuote = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      name: name.trim(),
      service: selectedService,
      tier: tier.toUpperCase(),
      estimatedPrice: formattedPrice,
      status: 'Received by MRK'
    };

    const updated = [newQuote, ...recentQuotes.slice(0, 4)];
    setRecentQuotes(updated);
    try {
      localStorage.setItem('mrk_quotes_history', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setSubmitted(true);
    if (onSubmitted) onSubmitted();
  };

  const generateWhatsAppUrl = () => {
    const text = `*New Project Enquiry — MRK Digital*
*Name:* ${name || 'Prospective Client'}
*Contact:* ${contact || 'Via WhatsApp'}
*Email:* ${email || 'N/A'}
*Service:* ${selectedService} (${selectedCategory})
*Project Scale:* ${tier.toUpperCase()} Tier
*Turnaround:* ${timeline.toUpperCase()}
*Estimated Scope:* ${formattedPrice}
*Budget Range:* ${budgetRange}
*Preferred Communication:* ${preferredMethod}
*Project Details:* ${description || 'Please provide information and availability for this service.'}`;

    return `https://wa.me/923270447263?text=${encodeURIComponent(text)}`;
  };

  const handleCopyText = () => {
    const text = `MRK Digital Project Request:
Service: ${selectedService}
Scale: ${tier}
Estimated: ${formattedPrice}
Contact: ${contact} (${name})
Details: ${description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="estimator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1168c8] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Scope &amp; Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight mb-3">
            Interactive Project Scope Estimator
          </h2>
          <p className="text-base text-[#52657a] leading-relaxed">
            Configure your technical requirements to generate an instant ballpark estimate. Final scopes and deliverables are always verified before work commences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Estimator Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#f7f9fc] border border-[#dce5ee] p-6 sm:p-8 rounded-2xl space-y-6">
            
            {/* Category Select */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0a1d35] mb-2">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICE_AREAS.filter(a => a !== 'All').map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(area);
                      const first = SERVICES_CATALOG.find(s => s.area === area);
                      if (first) setSelectedService(first.title);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedCategory === area
                        ? 'bg-[#1168c8] text-white shadow-sm'
                        : 'bg-white text-[#52657a] hover:bg-gray-100 border border-[#dce5ee]'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Dropdown */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0a1d35] mb-2">
                2. Select Specific Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#dce5ee] bg-white text-sm font-semibold text-[#0a1d35] focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
              >
                {servicesInCategory.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title} ({s.startingBudgetPkr})
                  </option>
                ))}
              </select>
              {currentServiceItem && (
                <p className="text-xs text-[#52657a] mt-1.5 italic">
                  "{currentServiceItem.shortDescription}"
                </p>
              )}
            </div>

            {/* Project Tier / Scale */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0a1d35] mb-2">
                3. Project Complexity &amp; Scale
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTier('basic')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tier === 'basic'
                      ? 'border-[#1168c8] bg-blue-50/70 text-[#0a1d35]'
                      : 'border-[#dce5ee] bg-white text-[#52657a] hover:bg-gray-50'
                  }`}
                >
                  <div className="font-bold text-xs">Starter / Standard</div>
                  <div className="text-[11px] text-[#52657a] mt-0.5">Essential baseline features &amp; setup</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('pro')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tier === 'pro'
                      ? 'border-[#1168c8] bg-blue-50/70 text-[#0a1d35]'
                      : 'border-[#dce5ee] bg-white text-[#52657a] hover:bg-gray-50'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>Professional</span>
                    <span className="text-[10px] text-[#1168c8] font-bold">Popular</span>
                  </div>
                  <div className="text-[11px] text-[#52657a] mt-0.5">Full customization &amp; testing</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('enterprise')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tier === 'enterprise'
                      ? 'border-[#1168c8] bg-blue-50/70 text-[#0a1d35]'
                      : 'border-[#dce5ee] bg-white text-[#52657a] hover:bg-gray-50'
                  }`}
                >
                  <div className="font-bold text-xs">Enterprise / Heavy</div>
                  <div className="text-[11px] text-[#52657a] mt-0.5">High availability &amp; panel assembly</div>
                </button>
              </div>
            </div>

            {/* Turnaround Timeline */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0a1d35] mb-2">
                4. Turnaround Timeline
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTimeline('standard')}
                  className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                    timeline === 'standard'
                      ? 'bg-[#0a1d35] text-white border-[#0a1d35]'
                      : 'bg-white text-[#52657a] border-[#dce5ee] hover:bg-gray-50'
                  }`}
                >
                  Normal (2-3 wks)
                </button>
                <button
                  type="button"
                  onClick={() => setTimeline('express')}
                  className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                    timeline === 'express'
                      ? 'bg-[#0a1d35] text-white border-[#0a1d35]'
                      : 'bg-white text-[#52657a] border-[#dce5ee] hover:bg-gray-50'
                  }`}
                >
                  Express (5-7 days)
                </button>
                <button
                  type="button"
                  onClick={() => setTimeline('urgent')}
                  className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                    timeline === 'urgent'
                      ? 'bg-[#0a1d35] text-white border-[#0a1d35]'
                      : 'bg-white text-[#52657a] border-[#dce5ee] hover:bg-gray-50'
                  }`}
                >
                  Urgent (48-72h)
                </button>
              </div>
            </div>

            {/* Estimated Price Display Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#07182e] to-[#0c315c] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <span className="text-xs text-blue-200 block uppercase font-bold tracking-wider">
                  Estimated Scope Range ({selectedService})
                </span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {formattedPrice}
                </div>
                <span className="text-[11px] text-blue-200">
                  *Ballpark estimate based on standard scope.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-colors"
                >
                  Switch to {currency === 'PKR' ? 'USD ($)' : 'PKR (Rs)'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Instant Request & WhatsApp Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#dce5ee] rounded-2xl p-6 sm:p-8 shadow-xl">
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0a1d35] mb-1">
                Lock In Your Quote
              </h3>
              <p className="text-xs text-[#52657a]">
                Send your requirements directly to MRK Digital. We respond quickly with a verified scope review.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">
                  Enquiry Received!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your estimate request for <strong>{selectedService}</strong> ({formattedPrice}) has been recorded.
                </p>
                <div className="pt-2">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open &amp; Confirm in WhatsApp Now
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-700 font-bold hover:underline block mx-auto pt-2"
                >
                  Submit Another Project Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ali"
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
                      Email Address
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0a1d35] mb-1">
                      Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
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
                      Preferred Channel
                    </label>
                    <select
                      value={preferredMethod}
                      onChange={(e) => setPreferredMethod(e.target.value as any)}
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
                    Project Details / Problem to Solve *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe your machinery, website requirement, timeline, or current challenge..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none"
                  />
                </div>

                {/* Submission Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Quote Request to MRK</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Direct WhatsApp Chat ({formattedPrice})</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="w-full py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-[11px] border border-[#dce5ee] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3 h-3 text-gray-500" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary Text'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-gray-400 text-center pt-1">
                  We use your contact details solely to reply to this enquiry. No spam.
                </p>

              </form>
            )}

            {/* Local Storage Saved Quotes History */}
            {recentQuotes.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#dce5ee]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#52657a] mb-2 flex items-center justify-between">
                  <span>Your Recent Inquiries</span>
                  <span className="text-[10px] text-gray-400">{recentQuotes.length} saved</span>
                </h4>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {recentQuotes.map((q) => (
                    <div key={q.id} className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-[11px] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#0a1d35] block">{q.service}</span>
                        <span className="text-gray-400 text-[10px]">{q.date} • {q.estimatedPrice}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {q.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
