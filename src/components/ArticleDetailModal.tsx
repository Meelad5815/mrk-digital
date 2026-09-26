import React from 'react';
import { X, Clock, Calendar, CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, HelpCircle } from 'lucide-react';
import { ArticleItem } from '../data/articlesData';

interface ArticleDetailModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose, onOpenQuote }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#dce5ee] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#07182e] via-[#0c315c] to-[#0a1d35] text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 text-xs text-blue-200 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#28d5c6]/20 border border-[#28d5c6]/30 text-[#28d5c6] font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
            {article.title}
          </h2>

          <p className="text-blue-100 text-sm leading-relaxed max-w-xl">
            {article.excerpt}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto grow text-[#0a1d35]">
          
          {/* Direct Answer Box (SEO best practice from briefs) */}
          <div className="bg-blue-50/80 border-l-4 border-[#1168c8] p-5 rounded-r-xl">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1168c8] mb-1.5">
              Direct Technical Summary
            </h3>
            <p className="text-sm font-medium text-[#0a1d35] leading-relaxed">
              {article.directAnswer}
            </p>
          </div>

          {/* Intro */}
          <p className="text-base text-[#52657a] leading-relaxed italic">
            {article.content.intro}
          </p>

          {/* Sections */}
          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xl font-bold text-[#0a1d35]">
                {section.heading}
              </h3>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm text-[#52657a] leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 pl-2 pt-1">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs text-[#0a1d35] font-medium flex items-start gap-2 bg-[#f7f9fc] p-2.5 rounded-lg border border-[#dce5ee]">
                      <span className="text-[#1168c8] font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Practical Considerations */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Practical Considerations &amp; Field Guidelines
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-950">
              {article.content.practicalConsiderations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              Common Mistakes to Avoid
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-950">
              {article.content.commonMistakes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          {article.content.faqs && article.content.faqs.length > 0 && (
            <div>
              <h4 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#1168c8]" />
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {article.content.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border border-[#dce5ee] bg-[#f7f9fc]">
                    <h5 className="font-bold text-sm text-[#0a1d35] mb-1">{faq.question}</h5>
                    <p className="text-xs text-[#52657a] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Service Card */}
          <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-[#1168c8] block mb-1">
                Relevant MRK Solution
              </span>
              <h5 className="text-base font-bold text-[#0a1d35]">
                {article.content.relatedServiceName}
              </h5>
              <p className="text-xs text-[#52657a] mt-0.5">
                Need professional implementation for your project or plant?
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(article.content.relatedServiceName);
              }}
              className="px-4 py-2.5 rounded-lg bg-[#1168c8] hover:bg-[#0755a9] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discuss This Solution</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f7f9fc] border-t border-[#dce5ee] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs font-bold text-[#0a1d35] transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
