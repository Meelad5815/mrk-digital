import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, 
  ChevronDown, Minimize2, Maximize2, Copy, Check, ArrowRight,
  AlertCircle, MessageCircle, HelpCircle, Zap, Shield
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: (serviceTitle?: string) => void;
}

const STARTER_PROMPTS = [
  '💧 How does the Automatic Water Tank Controller prevent pump burnout?',
  '⚡ PLC vs Arduino: Which is best for an industrial machine in Pakistan?',
  '🌐 What is the estimated cost and timeline for a WordPress business website?',
  '🇵🇰 کیا آپ اردو میں ویب سائٹ اور پی ایل سی آٹومیشن کے بارے میں بتا سکتے ہیں؟',
  '🏭 Can you program Siemens S7-1200 or Delta PLC for motor speed control?'
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am your **MRK Digital AI Technical Consultant & Project Advisor**. 

I can assist you with:
• **Web & Software:** Custom responsive websites, clean WordPress themes, Shopify, and Python/Django apps.
• **PLC & Industrial Automation:** Siemens, Delta, and Mitsubishi ladder logic, VFD motor control, and panel wiring.
• **Arduino, ESP32 & IoT:** Our flagship *Automatic Water Tank Controller*, telemetry nodes, and custom hardware.
• **Scoping & Budgeting:** Ballpark estimates in PKR and USD based on MRK's catalog.

*Feel free to speak in English, Urdu (اردو), or Roman Urdu!* How can I help your project today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState<'balanced' | 'fast' | 'pro'>('balanced');
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    setErrorNotice(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Map for server endpoint
      const payloadMessages = newHistory
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages.length > 0 ? payloadMessages : [{ role: 'user', text }],
          modelType
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer from Gemini.');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorNotice(err.message || 'Error communicating with AI service.');
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `⚠️ *Notice:* ${err.message || 'Unable to connect to the AI model right now.'}\n\nYou can also contact MRK Digital directly via WhatsApp or our Quote Form for immediate assistance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: `Conversation cleared. I am ready to advise you on your technical requirements, software stack, or hardware automation. What would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorNotice(null);
  };

  // Basic formatting helper for bold, bullet points, and code lines
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold handling
      let formattedLine = line;
      const parts = [];
      let lastIndex = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`b-${i}-${match.index}`} className="font-bold text-[#0a1d35]">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const isHeader = line.trim().startsWith('###') || line.trim().startsWith('##');

      return (
        <span key={i} className={`block ${isBullet ? 'pl-3 relative my-0.5' : 'my-1'} ${isHeader ? 'font-bold text-sm text-[#0a1d35] pt-1' : ''}`}>
          {parts.length > 0 ? parts : line}
        </span>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 transition-all duration-200 ${
      isExpanded 
        ? 'inset-2 sm:inset-6 flex items-center justify-center' 
        : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[440px] max-w-[460px]'
    }`}>
      <div className={`bg-white rounded-2xl shadow-2xl border border-[#dce5ee] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
        isExpanded ? 'w-full h-full max-w-4xl max-h-[90vh]' : 'h-[620px] max-h-[85vh]'
      }`}>
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#07182e] via-[#0c315c] to-[#0a1d35] text-white p-4 px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1168c8] to-[#28d5c6] flex items-center justify-center text-white font-extrabold shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07182e]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm leading-tight text-white">
                <span>MRK AI Consultant</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#28d5c6]/20 text-[#28d5c6] font-bold border border-[#28d5c6]/30">
                  Gemini
                </span>
              </div>
              <p className="text-[11px] text-blue-200 font-medium">
                Technical Advice • Web • PLC • Arduino • Urdu &amp; English
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Clear conversation"
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Restore size' : 'Expand full screen'}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Close chat"
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Mode Selection Bar */}
        <div className="bg-[#f7f9fc] border-b border-[#dce5ee] px-4 py-2 flex items-center justify-between text-xs shrink-0">
          <span className="text-[#52657a] font-medium text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#1168c8]" />
            Model Mode:
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setModelType('fast')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                modelType === 'fast'
                  ? 'bg-[#1168c8] text-white shadow-xs'
                  : 'text-[#52657a] hover:bg-gray-200'
              }`}
            >
              Fast (Lite)
            </button>

            <button
              onClick={() => setModelType('balanced')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                modelType === 'balanced'
                  ? 'bg-[#1168c8] text-white shadow-xs'
                  : 'text-[#52657a] hover:bg-gray-200'
              }`}
            >
              Balanced (3.5)
            </button>

            <button
              onClick={() => setModelType('pro')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                modelType === 'pro'
                  ? 'bg-[#0a1d35] text-white shadow-xs'
                  : 'text-[#52657a] hover:bg-gray-200'
              }`}
            >
              Deep Pro (3.1)
            </button>
          </div>
        </div>

        {/* Scrollable Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white text-xs">
          
          {messages.map((m) => {
            const isModel = m.role === 'model';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isModel ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isModel 
                    ? 'bg-blue-100 text-[#1168c8]' 
                    : 'bg-[#0a1d35] text-white'
                }`}>
                  {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[84%] rounded-2xl p-3.5 space-y-1 relative group ${
                  isModel 
                    ? 'bg-[#f7f9fc] border border-[#dce5ee] text-[#0a1d35]' 
                    : 'bg-[#1168c8] text-white'
                }`}>
                  <div className="leading-relaxed text-[13px] break-words">
                    {renderFormattedText(m.text)}
                  </div>

                  <div className={`flex items-center justify-between gap-2 pt-1 text-[10px] ${
                    isModel ? 'text-gray-400' : 'text-blue-100'
                  }`}>
                    <span>{m.timestamp}</span>

                    {isModel && m.id !== 'welcome' && (
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          title="Copy reply"
                          className="hover:text-[#1168c8] transition-colors"
                        >
                          {copiedId === m.id ? (
                            <span className="flex items-center gap-0.5 text-emerald-600 font-bold">
                              <Check className="w-3 h-3" /> Copied
                            </span>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                        {onOpenQuote && (
                          <button
                            onClick={() => onOpenQuote()}
                            title="Request a quote with this context"
                            className="hover:text-[#1168c8] font-bold transition-colors ml-1"
                          >
                            Quote Form →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1168c8] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#f7f9fc] border border-[#dce5ee] rounded-2xl p-3.5 flex items-center gap-2 text-xs text-[#52657a]">
                <span className="w-2 h-2 rounded-full bg-[#1168c8] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#1168c8] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#1168c8] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                <span className="text-[11px] font-semibold text-[#1168c8] ml-1">
                  Analyzing technical solution...
                </span>
              </div>
            </div>
          )}

          {/* Starter Chips (shown when only 1 or 2 messages) */}
          {messages.length <= 2 && !loading && (
            <div className="pt-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Frequently Asked Technical Topics:
              </span>
              <div className="space-y-1.5">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-2 rounded-xl bg-blue-50/60 hover:bg-blue-100 text-xs text-[#0a1d35] font-medium border border-blue-100 transition-all flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{prompt}</span>
                    <ArrowRight className="w-3 h-3 text-[#1168c8] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#dce5ee] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about Web, PLC, Arduino, water controllers, or write in Urdu..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 p-2.5 rounded-xl border border-[#dce5ee] text-xs font-medium focus:ring-2 focus:ring-[#1168c8] focus:outline-none disabled:bg-gray-100"
            />
            
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#1168c8] hover:bg-[#0755a9] text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 px-1">
            <span>Powered by Google Gemini 3.5 &amp; 3.1</span>
            <a
              href="https://wa.me/923270447263?text=Hello%20MRK%20Digital,%20I%20have%20an%20urgent%20project%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              WhatsApp Live Human
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
