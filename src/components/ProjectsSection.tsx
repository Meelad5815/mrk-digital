import React, { useState } from 'react';
import { ArrowRight, Cpu, Layers, CheckCircle2, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onOpenQuote: (projectTitle?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Arduino', 'PLC', 'IoT', 'Web Development', 'Automation'];

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  const flagshipProject = PROJECTS_DATA.find(p => p.id === 'automatic-water-tank-controller');

  return (
    <section id="projects" className="py-20 bg-[#f7f9fc] border-y border-[#dce5ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#1168c8] mb-2">
              Selected Work &amp; Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight mb-3">
              Projects documented with context.
            </h2>
            <p className="text-base text-[#52657a] leading-relaxed">
              MRK Digital publishes project details only where the technical implementation, hardware architecture, and results can be represented faithfully.
            </p>
          </div>

          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1168c8] hover:text-[#0755a9] shrink-0"
          >
            <span>Discuss your custom requirement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0a1d35] text-white shadow-sm'
                  : 'bg-white text-[#52657a] hover:bg-gray-100 border border-[#dce5ee]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Flagship Highlight Project Card (Automatic Water Tank Controller) */}
        {selectedCategory === 'All' && flagshipProject && (
          <div className="mb-10 rounded-2xl bg-gradient-to-br from-[#07182e] via-[#0c315c] to-[#0a1d35] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Cpu className="w-64 h-64 text-white" />
            </div>

            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#28d5c6]/20 border border-[#28d5c6]/30 text-[#28d5c6] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#28d5c6]" />
                Featured Hardware Project
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {flagshipProject.title}
              </h3>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                {flagshipProject.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28d5c6] shrink-0" />
                  <span>Dual Water-Level Sensing (Ultrasonic / Float)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28d5c6] shrink-0" />
                  <span>Optocoupled 30A Heavy-Duty Motor Relay</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28d5c6] shrink-0" />
                  <span>Dry-Run Pump Burnout Prevention Timeout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28d5c6] shrink-0" />
                  <span>Physical 3-Way Auto / Manual / Off Switch</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveModalProject(flagshipProject)}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#0a1d35] font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>View Full Schematic &amp; Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1168c8]" />
                </button>

                <button
                  onClick={() => onOpenQuote(flagshipProject.title)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
                >
                  Order Controller Unit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl border border-[#dce5ee] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-[#1168c8] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0a1d35] leading-snug mb-2 group-hover:text-[#1168c8] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-[#52657a] leading-relaxed mb-4 line-clamp-3">
                  {project.tagline}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#f7f9fc] text-[11px] font-semibold text-[#52657a] border border-[#dce5ee]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 px-6 bg-[#f7f9fc] border-t border-[#dce5ee] flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-bold text-[#1168c8] hover:text-[#0755a9] flex items-center gap-1 group-hover:underline"
                >
                  <span>View Project Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenQuote(project.title)}
                  className="text-xs font-bold text-[#0a1d35] hover:text-[#1168c8]"
                >
                  Enquire
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State / Documentation Note */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-[#dce5ee] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-[#0a1d35] mb-1">
              Have a custom engineering or software requirement?
            </h4>
            <p className="text-xs text-[#52657a]">
              MRK Digital designs custom solutions based on your exact electrical, hardware, and software requirements.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote()}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0a1d35] hover:bg-[#1168c8] rounded-xl transition-colors shrink-0"
          >
            Start Project Consultation
          </button>
        </div>

      </div>

      {/* Project Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onOpenQuote={onOpenQuote}
      />
    </section>
  );
};
