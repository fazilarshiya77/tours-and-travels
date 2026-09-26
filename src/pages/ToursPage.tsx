import React, { useState } from 'react';
import { TOURS } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

interface ToursPageProps {
  onOpenBookingModal: (tourTitle?: string) => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({ onOpenBookingModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Curated Routes' },
    { id: 'heritage', label: 'Heritage & Royal Forts' },
    { id: 'himalaya', label: 'Himalayan Mountain Passes' },
  ];

  const filteredTours = selectedCategory === 'all'
    ? TOURS
    : TOURS.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-24 sm:pt-28 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
          Chauffeur-Guided Outstation Travel
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#583714] leading-tight">
          Curated Indian Travel Routes
        </h1>
        <p className="text-sm sm:text-base text-[#583714]/85 font-normal">
          Traverse India's most breathtaking expressways, royal forts, and mountain sanctuaries in private executive comfort.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black shadow-md border border-[#583714]/20'
                : 'bg-[#F7EED3] text-[#583714] border border-[#E6D39D] hover:text-[#583714]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tour Cards */}
      <div className="space-y-12">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FFFDF5] rounded-3xl border border-[#E6D39D] hover:border-[#583714] transition-all overflow-hidden shadow-xl p-6 sm:p-8"
          >
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] lg:h-full">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#583714] border border-[#FFE897]/30 text-[10px] font-bold text-[#FFE897] uppercase tracking-widest backdrop-blur-md">
                  {tour.duration}
                </span>
              </div>
            </div>

            {/* Itinerary & Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#583714] uppercase tracking-widest font-bold block">
                    {tour.subtitle} • {tour.distance}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#583714] mt-1">
                    {tour.title}
                  </h2>
                  <p className="text-xs text-[#583714]/85 mt-2 leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                {/* Itinerary Timeline */}
                <div className="space-y-2 pt-2 border-t border-[#E6D39D]">
                  <span className="text-[10px] uppercase tracking-wider text-[#583714] font-bold block">
                    Route Circuit Stops:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#583714]">
                    {tour.route.map((stop, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-2.5 py-1 rounded-lg bg-[#F7EED3] border border-[#E6D39D] font-bold">
                          {stop}
                        </span>
                        {idx < tour.route.length - 1 && (
                          <span className="text-[#583714] font-bold">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#583714]/80 font-bold block">
                    Key Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#583714]">
                    {tour.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#583714] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E6D39D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Recommended Vehicle</span>
                  <span className="text-xs font-bold text-[#583714]">{tour.recommendedVehicle}</span>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-serif text-lg font-bold text-[#583714]">{tour.startingPrice}</span>
                  <button
                    onClick={() => onOpenBookingModal(tour.title)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-105 text-[#583714] font-black text-xs uppercase tracking-wider shadow-md shadow-gold-glow transition-all border border-[#583714]/20"
                  >
                    Inquire Tour
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};


