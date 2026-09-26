import React from 'react';
import { ShieldCheck, MapPin, Wrench, CheckCircle, Code, Cpu, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols): Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1168c8] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              About MRK Digital &amp; Online Services Center
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d35] tracking-tight leading-tight">
              Practical technical craftsmanship, built on integrity and clear scope.
            </h2>

            <p className="text-base text-[#52657a] leading-relaxed">
              <strong>MRK Digital &amp; Online Services Center</strong>, founded and led by <strong>Hafiz Muhammad Meelad Raza</strong>, was established to bridge the gap between high-level digital software services and physical hardware automation. Too often, businesses must juggle separate web designers, IT technicians, and electrical automation electricians who don’t speak the same language.
            </p>

            <p className="text-sm text-[#52657a] leading-relaxed">
              We bring multidisciplinary capability under one roof: from modern <strong>full-stack web development and custom WordPress themes</strong> to <strong>industrial PLC ladder logic, Arduino microcontroller circuits, and smart IoT automation</strong>.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#f7f9fc] border border-[#dce5ee]">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0a1d35] mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>No Exaggerated Claims</span>
                </div>
                <p className="text-xs text-[#52657a] leading-relaxed">
                  We only accept work and quote for services that we can genuinely deliver with verified engineering precision.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f7f9fc] border border-[#dce5ee]">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0a1d35] mb-1">
                  <Wrench className="w-4 h-4 text-[#1168c8]" />
                  <span>Full Client Ownership</span>
                </div>
                <p className="text-xs text-[#52657a] leading-relaxed">
                  You own 100% of the deployed code, PLC ladder diagrams, microcontroller source code, and administrative credentials.
                </p>
              </div>
            </div>

            {/* Service Areas */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#1168c8] mb-2 tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Service Areas &amp; Availability</span>
              </div>
              <p className="text-xs text-[#0a1d35] leading-relaxed font-medium">
                Actively serving clients across <strong>Mian Channu, Khanewal, Kabirwala, Multan, Burewala, and Punjab, Pakistan</strong>, as well as providing end-to-end remote consultation and software delivery for commercial and international clients worldwide.
              </p>
            </div>

          </div>

          {/* Right Column (5 cols): Highlights & Pillars */}
          <div className="lg:col-span-5 bg-[#07182e] text-white p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            <div className="border-b border-white/10 pb-5">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#28d5c6]">
                Our Expertise Spectrum
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                From Bits to Relays
              </h3>
            </div>

            <div className="space-y-4">
              
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-[#28d5c6] flex items-center justify-center shrink-0 mt-0.5">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Modern Web &amp; E-Commerce</h4>
                  <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                    Custom responsive websites, lightweight WordPress themes, clean UI/UX, and fast mobile loading.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-[#28d5c6] flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Industrial Automation &amp; PLC</h4>
                  <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                    Siemens, Delta, and Mitsubishi ladder logic programming, sensor systems, and control panel wiring.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-[#28d5c6] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Arduino &amp; Smart IoT Hardware</h4>
                  <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                    Water tank controllers, remote telemetry, optical relay isolation, and custom electronics prototypes.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <span className="text-xs text-blue-200">
                Direct Communication • Fast Turnaround • Honest Scopes
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
