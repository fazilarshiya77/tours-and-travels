import React from 'react';
import { CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { useDataStore } from '../hooks/useDataStore';

interface FleetProps {
  onOpenBookingModal: (vehicleName?: string) => void;
}

export const Fleet: React.FC<FleetProps> = ({ onOpenBookingModal }) => {
  const { vehicles } = useDataStore();
  const activeVehicles = vehicles.filter(v => v.isActive);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[48vh] sm:min-h-[54vh] flex items-center justify-center border-b border-[#E6D39D] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/cars.jfif"
            alt="Taj Tours Dedicated Fleet"
            className="w-full h-full object-cover object-center brightness-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A230B] via-[#3A230B]/75 to-[#3A230B]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-28 pb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A230B]/80 backdrop-blur-md border border-[#E6D39D]/40 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FFE897]" />
            <span className="font-pinyon text-2xl sm:text-3xl text-[#FFE897] tracking-wide font-normal pt-0.5">
              Taj Concierge Fleet Showcase
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            Our Dedicated Fleet
          </h1>
          <p className="text-sm sm:text-base text-[#FAF5E6]/90 max-w-2xl mx-auto font-normal drop-shadow-sm leading-relaxed">
            Featuring pristine 6+1 Seater Maruti Suzuki Ertiga MPVs and Maruti Suzuki Dzire Executive Sedans with 50-point safety inspections and senior uniformed pilots.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16">
        {/* Active Vehicle Cards Displayed Dynamically */}
        <div className="space-y-12">
          {activeVehicles.map((vehicle) => (
            <div 
              key={vehicle.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#E6D39D] hover:border-[#583714] shadow-lg hover:shadow-[0_30px_60px_-12px_rgba(88,55,20,0.25)] hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Left Visual (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#E6D39D] h-[340px] sm:h-[420px]">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="px-4 py-1.5 rounded-full bg-[#583714] border border-[#FFE897]/40 text-xs font-bold text-[#FFE897] uppercase tracking-widest backdrop-blur-md">
                      {vehicle.transmission}
                    </span>
                    <span className="text-xs text-[#583714] font-bold font-mono bg-[#FFFDF5]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E6D39D]">
                      Safety: {vehicle.specs.safetyRating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Specification Data (5 cols) */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#583714] font-bold block">
                    {vehicle.popularFor}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#583714] mt-1">
                    {vehicle.name}
                  </h2>
                  <p className="text-xs text-[#583714]/80 mt-1.5 leading-relaxed">
                    {vehicle.tagline}
                  </p>
                </div>

                {/* Engine & Seating Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E6D39D] text-xs">
                  <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-1">
                    <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Engine & Powertrain</span>
                    <span className="font-bold text-[#583714]">{vehicle.specs.engine}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-1">
                    <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Cabin Seating</span>
                    <span className="font-bold text-[#583714]">{vehicle.specs.seating}</span>
                  </div>
                </div>

                {/* Amenities Checklist */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#583714] block">
                    Standard Concierge Amenities:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#583714]">
                    {vehicle.specs.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#583714] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Badges & CTA */}
                <div className="p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Outstation Tariff</span>
                    <span className="font-serif text-xl font-bold text-[#583714]">{vehicle.outstationPerKm}</span>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal(vehicle.name)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-105 text-[#583714] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-gold-glow border border-[#583714]/20"
                  >
                    <Calendar className="w-4 h-4 text-[#583714]" />
                    <span>Reserve Fleet</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
