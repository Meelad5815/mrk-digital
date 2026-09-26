import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { ARTICLES_DATA, ArticleItem } from '../data/articlesData';
import { ArticleDetailModal } from './ArticleDetailModal';

interface GuidesSectionProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ onOpenQuote }) => {
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  return (
    <section id="guides" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#1168c8] mb-2">
              From the Blog &amp; Knowledge Base
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight mb-3">
              Practical guides for informed decisions.
            </h2>
            <p className="text-base text-[#52657a] leading-relaxed">
              In-depth engineering articles covering PLC programming, microcontroller circuits, industrial automation, and web development best practices.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#52657a] bg-[#f7f9fc] px-3 py-1.5 rounded-lg border border-[#dce5ee]">
            <BookOpen className="w-3.5 h-3.5 text-[#1168c8]" />
            <span>Verified Technical Knowledge</span>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="p-6 rounded-2xl border border-[#dce5ee] bg-white hover:border-[#1168c8]/40 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1168c8] border border-blue-100">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#52657a]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0a1d35] leading-snug mb-3 group-hover:text-[#1168c8] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-[#52657a] leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0f4f8] flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {article.date}
                </span>

                <span className="text-xs font-bold text-[#1168c8] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenQuote={onOpenQuote}
      />
    </section>
  );
};
