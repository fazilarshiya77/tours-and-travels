import React from 'react';
import { SERVICES } from '../data/mockData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onOpenBookingModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-24 sm:pt-28 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
          Luxury Mobility Architecture
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#583714] leading-tight">
          Services & Travel Offerings
        </h1>
        <p className="text-sm sm:text-base text-[#583714]/85 font-normal">
          From high-stakes corporate summits to multi-state outstation family journeys, we engineer seamless travel logistics with royal dignity.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-16">
        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-[#FFFDF5] border border-[#E6D39D] hover:border-[#583714] shadow-xl transition-all ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image (6 cols) */}
            <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="relative rounded-2xl overflow-hidden h-[340px] border border-[#E6D39D] shadow-md group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              </div>
            </div>

            {/* Content (6 cols) */}
            <div className={`lg:col-span-6 space-y-6 text-left ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
              <span className="text-xs uppercase tracking-[0.2em] text-[#583714] font-bold block">
                {service.subtitle}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#583714]">
                {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#583714]/85 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase tracking-wider text-[#583714] font-bold block">
                  Service Benchmarks:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#583714]">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#583714] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenBookingModal(service.title)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-105 text-[#583714] font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-gold-glow border border-[#583714]/20"
                  data-cursor="BOOK"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#583714]" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};


