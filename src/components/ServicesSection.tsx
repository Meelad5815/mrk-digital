import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Check, SlidersHorizontal, Sparkles, HelpCircle } from 'lucide-react';
import { SERVICES_CATALOG, SERVICE_AREAS, ServiceItem } from '../data/servicesData';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((service) => {
      const matchesArea = selectedArea === 'All' || service.area === selectedArea;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.technologies.some((t) => t.toLowerCase().includes(query));
      return matchesArea && matchesSearch;
    });
  }, [selectedArea, searchQuery]);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching theme */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase font-extrabold tracking-widest text-[#1168c8] mb-2">
            Core Services Catalogue
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight mb-4">
            Useful technical support, built around the job.
          </h2>
          <p className="text-base text-[#52657a] leading-relaxed">
            Service availability is confirmed before a quote—so every enquiry begins with an honest conversation about scope, feasibility, and deliverables.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search across 36 services or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#dce5ee] bg-[#f7f9fc] text-sm text-[#0a1d35] focus:outline-none focus:ring-2 focus:ring-[#1168c8] focus:bg-white transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Area Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => {
              const count = area === 'All' 
                ? SERVICES_CATALOG.length 
                : SERVICES_CATALOG.filter(s => s.area === area).length;
              return (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedArea === area
                      ? 'bg-[#1168c8] text-white shadow-sm'
                      : 'bg-[#f7f9fc] text-[#52657a] hover:bg-gray-200 border border-[#dce5ee]'
                  }`}
                >
                  <span>{area}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedArea === area ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Services Grid (Matches theme card style) */}
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
            <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-[#0a1d35] mb-1">No matching services found</h3>
            <p className="text-xs text-gray-500 mb-4">Try searching with a different keyword or reset filters.</p>
            <button
              onClick={() => { setSelectedArea('All'); setSearchQuery(''); }}
              className="px-4 py-2 text-xs font-bold text-[#1168c8] bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <article
                key={service.id}
                className="group p-6 rounded-2xl border border-[#dce5ee] bg-white hover:border-[#1168c8]/40 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-black tracking-widest text-[#1168c8]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1168c8] border border-blue-100">
                      {service.area}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0a1d35] leading-snug mb-2 group-hover:text-[#1168c8] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#52657a] leading-relaxed mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Highlights/Deliverables preview */}
                  <div className="space-y-1.5 mb-5 border-t border-[#f0f4f8] pt-3">
                    {service.deliverables.slice(0, 2).map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[11px] text-[#52657a]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                    {service.deliverables.length > 2 && (
                      <span className="text-[10px] text-gray-400 block pl-5">
                        +{service.deliverables.length - 2} more deliverables included
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#dce5ee] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0a1d35]">
                    {service.startingBudgetPkr}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="text-xs font-bold text-[#1168c8] hover:text-[#0755a9] flex items-center gap-1 group/btn p-1"
                    >
                      <span>Explore Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => onOpenQuote(service.title)}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#1168c8] hover:bg-[#0755a9] rounded-md shadow-xs transition-colors"
                    >
                      Quote
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onOpenQuote={onOpenQuote}
      />
    </section>
  );
};
