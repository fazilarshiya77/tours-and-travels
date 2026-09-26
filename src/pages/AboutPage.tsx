import React from 'react';
import { ShieldCheck, Clock, HeartHandshake, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[48vh] sm:min-h-[54vh] flex items-center justify-center border-b border-[#E6D39D] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about_hero_heritage.jpg"
            alt="Taj Tours & Travels Brand Heritage"
            className="w-full h-full object-cover object-center brightness-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A230B] via-[#3A230B]/75 to-[#3A230B]/35" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-28 pb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A230B]/80 backdrop-blur-md border border-[#E6D39D]/40 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FFE897]" />
            <span className="font-pinyon text-2xl sm:text-3xl text-[#FFE897] tracking-wide font-normal pt-0.5">
              Brand Story & Heritage
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            About Taj Tours & Travels
          </h1>
          <p className="text-sm sm:text-base text-[#FAF5E6]/90 max-w-2xl mx-auto font-normal drop-shadow-sm leading-relaxed">
            Founded on the principles of royal Indian hospitality, safety, and modern automotive excellence. Transforming every kilometer into an unforgettable journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16">
        {/* Story & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="font-pinyon text-3xl text-[#583714] font-normal block mb-1">
                Our Purpose
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#583714] leading-tight">
                Elevating Every Kilometer into an Unforgettable Experience.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#583714]/85 leading-relaxed">
              Taj Tours & Travels is built around a singular philosophy: travel should empower, relax, and inspire. Unlike standard car rental agencies, we treat mobility as a concierge hospitality service. Every vehicle in our fleet is meticulously maintained, sanitized, and driven by English & Hindi-fluent senior chauffeurs who undergo rigorous background verification and defensive driving protocols.
            </p>
            <p className="text-xs sm:text-sm text-[#583714]/85 leading-relaxed">
              Whether catering to international business dignitaries, destination wedding convoys, or family outstation holidays across Rajasthan and the Himalayas, our team ensures absolute transparency, zero hidden charges, and round-the-clock route monitoring.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#E6D39D] shadow-2xl h-[400px]">
              <img
                src="/images/hero_luxury_car.jpg"
                alt="Taj Tours & Travels Fleet Heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#FFFDF5]/95 backdrop-blur-md border border-[#E6D39D] shadow-xl text-left">
                <span className="font-pinyon text-2xl text-[#583714] font-normal block mb-1">
                  The Taj Concierge Guarantee
                </span>
                <p className="text-xs text-[#583714] font-medium">
                  100% On-Time Dispatch • Uniformed Senior Drivers • 50-Point Fleet Safety Checklist
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="font-pinyon text-3xl sm:text-4xl text-[#583714] font-normal block">
              Our Core Pillars
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#583714]">
              Why Travelers Choose Taj
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] space-y-4 shadow-md hover:border-[#583714] transition-colors text-left">
              <div className="w-12 h-12 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-center text-[#583714]">
                <ShieldCheck className="w-6 h-6 text-[#583714]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583714]">Chauffeur Integrity & Etiquette</h3>
              <p className="text-xs text-[#583714]/85 leading-relaxed">
                Our drivers are trained in customer courtesy, route navigation, and emergency first response. Uniformed, punctual, and respectful of your privacy.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] space-y-4 shadow-md hover:border-[#583714] transition-colors text-left">
              <div className="w-12 h-12 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-center text-[#583714]">
                <Clock className="w-6 h-6 text-[#583714]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583714]">Punctuality Assurance</h3>
              <p className="text-xs text-[#583714]/85 leading-relaxed">
                We monitor flight arrivals and traffic corridors in real-time, ensuring your driver arrives 15 minutes prior to scheduled departure.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] space-y-4 shadow-md hover:border-[#583714] transition-colors text-left">
              <div className="w-12 h-12 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-center text-[#583714]">
                <HeartHandshake className="w-6 h-6 text-[#583714]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583714]">Transparent Billing</h3>
              <p className="text-xs text-[#583714]/85 leading-relaxed">
                No surprise fees or hidden surge multipliers. All toll receipts, state entry taxes, and per-km tariffs are shared upfront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
