import React from 'react';
import { X, CheckCircle, ShieldAlert, Cpu, Layers, ArrowRight, Zap, Wrench } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onOpenQuote }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#dce5ee] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#07182e] via-[#0c315c] to-[#0e497c] text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#28d5c6]/20 border border-[#28d5c6]/30 text-[#28d5c6] text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-blue-200 font-medium">
              • {project.clientType} ({project.year})
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            {project.title}
          </h2>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
            {project.tagline}
          </p>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto grow text-[#0a1d35]">
          
          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f7f9fc] p-5 rounded-xl border border-[#dce5ee]">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
                The Practical Challenge
              </h3>
              <p className="text-sm text-[#52657a] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1168c8] mb-2 flex items-center gap-1.5">
                Implemented Solution
              </h3>
              <p className="text-sm text-[#52657a] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          <div>
            <h3 className="text-base font-bold text-[#0a1d35] mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#1168c8]" />
              System Architecture &amp; Signal Flow
            </h3>
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 font-mono text-xs text-[#0a1d35] leading-relaxed">
              {project.architecture}
            </div>
          </div>

          {/* Components / Bill of Materials */}
          <div>
            <h3 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#1168c8]" />
              Components &amp; Hardware Used
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.components.map((comp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#52657a] bg-white p-2.5 rounded-lg border border-[#dce5ee]">
                  <Wrench className="w-3.5 h-3.5 text-[#1168c8] shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Implemented Features */}
          <div>
            <h3 className="text-base font-bold text-[#0a1d35] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Verified Implemented Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#52657a]">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety & Isolation Notes */}
          <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Electrical Safety &amp; Isolation Standards
            </h3>
            <ul className="space-y-1.5">
              {project.safetyNotes.map((note, idx) => (
                <li key={idx} className="text-xs text-amber-950 flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-700" />
              Verified Measured Outcome
            </h4>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              {project.outcome}
            </p>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#f7f9fc] border-t border-[#dce5ee] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-[#52657a] block">Need a similar solution built?</span>
            <span className="text-sm font-extrabold text-[#0a1d35]">
              MRK Digital custom engineering
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#52657a] hover:text-[#0a1d35] rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(project.title);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1168c8] hover:bg-[#0755a9] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
