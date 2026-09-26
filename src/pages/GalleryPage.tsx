import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ZoomIn } from 'lucide-react';

interface GalleryPageProps {
  onOpenBookingModal: (vehicleName?: string) => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'fleet' | 'interiors' | 'outstation';
  categoryLabel: string;
  image: string;
  description: string;
  vehicleName?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'dzire-real-front',
    title: 'Maruti Suzuki Dzire (Executive Sedan)',
    category: 'fleet',
    categoryLabel: 'Executive Sedan',
    image: '/dzire.png',
    description: 'Pristine white Maruti Suzuki Dzire sedan ready for outstation rides, airport transfers, and executive travel.',
    vehicleName: 'Maruti Suzuki Dzire'
  },
  {
    id: 'ertiga-night-service',
    title: 'Maruti Suzuki Ertiga (6+1 Seater MPV)',
    category: 'fleet',
    categoryLabel: '6+1 Seater MPV',
    image: '/ertiga.jpeg',
    description: 'Dedicated 6+1 Seater MPV equipped with dual AC vents, clean interior, and all-India route permit.',
    vehicleName: 'Maruti Suzuki Ertiga'
  },
  {
    id: 'fleet-real-photo-1',
    title: 'Taj Tour\'s & Travels Real Fleet Showcase',
    category: 'fleet',
    categoryLabel: 'Fleet In Service',
    image: '/gallery/taj_fleet_real_1.jpg',
    description: 'Authentic photograph of our dedicated Maruti Suzuki fleet vehicles operating on location.'
  },
  {
    id: 'fleet-real-photo-2',
    title: 'Clean Sanitized Cabin & Chauffeur Care',
    category: 'interiors',
    categoryLabel: 'Cabin Standard',
    image: '/gallery/taj_fleet_real_2.jpg',
    description: 'Hygiene-inspected interior cabins with comfortable seating and verified senior drivers.'
  },
  {
    id: 'fleet-real-photo-3',
    title: '24/7 All India Outstation Mobility',
    category: 'outstation',
    categoryLabel: 'Outstation Journeys',
    image: '/gallery/taj_fleet_real_3.jpg',
    description: 'Intercity and interstate travel rides equipped for long-highway comfort across India.'
  },
  {
    id: 'fleet-real-photo-4',
    title: 'Door to Door Taxi & Airport Transfers',
    category: 'outstation',
    categoryLabel: 'Corporate & Airport',
    image: '/gallery/taj_fleet_real_4.jpg',
    description: 'Punctual door-to-door pickup & drop services available 24 hours a day, 7 days a week.'
  },
  {
    id: 'fleet-sedans-building',
    title: 'Taj Dedicated Vehicle Fleet Lineup',
    category: 'fleet',
    categoryLabel: 'Fleet Operations',
    image: '/cars.jfif',
    description: 'Dedicated executive fleet ready for dispatch across India driven by professional pilots.'
  }
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenBookingModal: _onOpenBookingModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fleet' | 'interiors' | 'outstation'>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[48vh] sm:min-h-[54vh] flex items-center justify-center border-b border-[#E6D39D] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_luxury_car.jpg"
            alt="Taj Tours Visual Travel Gallery"
            className="w-full h-full object-cover object-center brightness-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A230B] via-[#3A230B]/75 to-[#3A230B]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-28 pb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A230B]/80 backdrop-blur-md border border-[#E6D39D]/40 shadow-lg">
            <Camera className="w-4 h-4 text-[#FFE897]" />
            <span className="font-pinyon text-2xl sm:text-3xl text-[#FFE897] tracking-wide font-normal pt-0.5">
              Visual Travel Memories
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            Visual Travel Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#FAF5E6]/90 max-w-2xl mx-auto font-normal drop-shadow-sm leading-relaxed">
            Explore authentic snapshots of our vehicles, luxury cabin interiors, outstation mountain tours, and corporate VIP pick-ups across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'fleet', label: 'Ertiga & Dzire Fleet' },
            { id: 'interiors', label: 'Cabin & Comfort' },
            { id: 'outstation', label: 'Outstation Routes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#583714] text-[#FFE897] shadow-md font-bold'
                  : 'bg-[#F7EED3] text-[#583714] hover:bg-[#FFE897]/50 border border-[#E6D39D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Pure Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#FFFDF5] border border-[#E6D39D] shadow-md hover:border-[#583714] cursor-pointer aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-[#FFE897] text-[#583714] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform border border-[#583714]/20">
                    <ZoomIn className="w-6 h-6 text-[#583714]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal - Pure Image Only */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 bg-[#3A230B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            {/* Top-Right Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-xl font-bold transition-all shadow-2xl cursor-pointer"
              title="Close"
            >
              ✕
            </button>

            {/* Pure Fullsize Image Container */}
            <div 
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.image} 
                alt={lightboxImage.title}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
