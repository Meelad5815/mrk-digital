import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsAndProcess } from './components/WhyUsAndProcess';
import { ProjectsSection } from './components/ProjectsSection';
import { QuoteEstimator } from './components/QuoteEstimator';
import { GuidesSection } from './components/GuidesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { LegalModal } from './components/LegalModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteServiceTitle, setQuoteServiceTitle] = useState<string | undefined>(undefined);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'disclaimer'>('privacy');
  const [chatOpen, setChatOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = (serviceTitle?: string) => {
    setQuoteServiceTitle(serviceTitle);
    setQuoteModalOpen(true);
  };

  const handleOpenLegal = (tab: 'privacy' | 'terms' | 'disclaimer') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0a1d35] font-sans antialiased selection:bg-[#1168c8] selection:text-white relative">
      {/* Skip to Content for Accessibility */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#1168c8] text-white font-bold rounded-lg"
      >
        Skip to content
      </a>

      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenQuote={handleOpenQuote}
        onOpenChat={handleOpenChat}
      />

      <main id="content">
        {/* Hero Section */}
        <Hero
          onNavigate={scrollToSection}
          onOpenQuote={handleOpenQuote}
          onOpenChat={handleOpenChat}
        />

        {/* 36 Services Catalogue Section */}
        <ServicesSection
          onOpenQuote={handleOpenQuote}
        />

        {/* Why MRK & Process Steps */}
        <WhyUsAndProcess
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* Selected Work & Automatic Water Tank Controller */}
        <ProjectsSection
          onOpenQuote={handleOpenQuote}
        />

        {/* Interactive Scope & Price Estimator */}
        <QuoteEstimator
          initialService={quoteServiceTitle}
          onSubmitted={() => {}}
        />

        {/* Practical Guides & Knowledge Base */}
        <GuidesSection
          onOpenQuote={handleOpenQuote}
        />

        {/* About MRK Digital */}
        <AboutSection />

        {/* Contact Center & Direct Inquiry */}
        <ContactSection
          initialService={quoteServiceTitle}
        />
      </main>

      {/* Footer & Mobile Sticky Bar */}
      <Footer
        onNavigate={scrollToSection}
        onOpenLegal={handleOpenLegal}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Floating AI Consultant Trigger Button (Desktop / Tablet) */}
      {!chatOpen && (
        <aside aria-label="AI Consultant Assistant" className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={handleOpenChat}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#07182e] via-[#0c315c] to-[#1168c8] text-white shadow-xl shadow-blue-950/30 hover:shadow-2xl hover:scale-103 transition-all border border-white/20 active:scale-95 focus:outline-none"
            aria-label="Open MRK AI Technical Consultant"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1168c8] to-[#28d5c6] flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#07182e] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#07182e]" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-extrabold leading-none flex items-center gap-1 text-white">
                <span>MRK AI Advisor</span>
                <Sparkles className="w-3 h-3 text-[#28d5c6]" />
              </div>
              <p className="text-[10px] text-blue-200 mt-0.5 font-medium">
                Web • PLC • Arduino • Urdu/Eng
              </p>
            </div>
          </button>
        </aside>
      )}

      {/* Gemini Multi-Turn Chatbot Component */}
      <GeminiChatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpenQuote={handleOpenQuote}
      />

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedService={quoteServiceTitle}
      />

      {/* Legal Policies Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </div>
  );
}
