import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Car, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Star, 
  Users, 
  Fuel, 
  ShieldCheck,
  Phone,
  MapPin,
  Plane,
  Navigation,
  Briefcase,
  Clock,
  Sparkles,
  Award,
  Search
} from 'lucide-react';
import { VEHICLES, TESTIMONIALS, COMPANY_INFO } from '../data/mockData';

interface HomeProps {
  onOpenBookingModal: (vehicleName?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenBookingModal }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mpv' | 'sedan'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('outstation');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const vehicleSuggestions = [
    {
      title: "Maruti Suzuki Ertiga",
      category: "mpv" as const,
      searchVal: "Maruti Suzuki Ertiga",
      badge: "6+1 Seater MPV"
    },
    {
      title: "Maruti Suzuki Dzire",
      category: "sedan" as const,
      searchVal: "Maruti Suzuki Dzire",
      badge: "Executive Sedan"
    }
  ];

  const autoMatchSuggestions = vehicleSuggestions.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q) ||
      item.searchVal.toLowerCase().includes(q)
    );
  });

  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const matchesCategory = activeCategory === 'all' || vehicle.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      vehicle.name.toLowerCase().includes(q) ||
      vehicle.category.toLowerCase().includes(q) ||
      vehicle.tagline.toLowerCase().includes(q) ||
      vehicle.fuelType.toLowerCase().includes(q) ||
      `${vehicle.passengers} seater`.includes(q) ||
      `${vehicle.passengers}+1`.includes(q) ||
      vehicle.features.some(f => f.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-0 pb-16">
      
      {/* 1. CINEMATIC HERO SECTION WITH HIGH-CLARITY VIDEO BACKGROUND */}
      <section className="relative min-h-[92vh] flex items-center justify-center border-b border-[#E6D39D] z-40">
        
        {/* Video Background Layer with High Clarity & Balanced Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            poster="/images/fleet_ertiga.jpg"
            className="w-full h-full object-cover object-center brightness-95 scale-[1.02] transition-transform duration-1000"
          >
            <source src="/home-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Balanced gradient overlay to preserve video clarity while ensuring text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A230B]/90 via-[#3A230B]/40 to-[#3A230B]/20 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 w-full text-center sm:text-left">
          <div className="max-w-3xl space-y-6">
            
            {/* Elegant Luxury Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A230B]/80 backdrop-blur-md border border-[#E6D39D]/40 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#FFE897]" />
              <span className="font-pinyon text-2xl sm:text-3xl text-[#FFE897] tracking-wide font-normal leading-none pt-1">
                Taj Luxury Travel & Concierge
              </span>
            </motion.div>

            {/* Main Display Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-lg"
            >
              Travel Across India.
            </motion.h1>

            {/* Refined Sub-headline Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FFE897] font-semibold tracking-wide drop-shadow">
                Safe <span className="text-[#FFE897]/50">•</span> Comfortable <span className="text-[#FFE897]/50">•</span> Reliable
              </span>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white font-bold leading-relaxed max-w-2xl drop-shadow-md"
            >
              Book Maruti Suzuki Ertiga (6+1 Seater MPV) and Maruti Suzuki Dzire (Executive Sedan) for outstation rides, local hourly packages, and airport transfers.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => onOpenBookingModal()}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-110 text-[#583714] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-gold-glow transition-all transform hover:-translate-y-0.5 border border-[#583714]/30"
                data-cursor="BOOK"
              >
                <Calendar className="w-4 h-4 text-[#583714]" />
                Book Your Ride Now
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-8 py-4 rounded-full bg-[#FFFDF5]/95 hover:bg-[#FFFDF5] text-[#583714] font-bold text-xs uppercase tracking-widest flex items-center gap-3 border border-[#E6D39D] transition-all shadow-md"
                data-cursor="CALL"
              >
                <Phone className="w-4 h-4 text-[#583714]" />
                Call {COMPANY_INFO.phoneDisplay}
              </a>
            </motion.div>

          </div>

          {/* Quick Search Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 bg-[#FFFDF5]/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl max-w-5xl border border-[#E6D39D] shadow-2xl relative z-50 text-[#583714]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              {/* Vehicle Choice Search Input with Automatch Dropdown */}
              <div className="space-y-1.5 relative text-left">
                <label className="text-[10px] uppercase tracking-wider text-[#583714] font-bold flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-[#583714]" />
                  <span>Vehicle Choice</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      setIsDropdownOpen(true);
                      if (val.toLowerCase().includes('ertiga')) setActiveCategory('mpv');
                      else if (val.toLowerCase().includes('dzire')) setActiveCategory('sedan');
                    }}
                    placeholder="Type vehicle (Ertiga, Dzire...)"
                    className="w-full h-[44px] pl-9 pr-8 rounded-xl bg-[#F7EED3] border border-[#E6D39D] focus:border-[#583714] text-xs sm:text-sm text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:ring-2 focus:ring-[#583714]/20 transition-all"
                  />
                  <Search className="w-4 h-4 text-[#583714] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                        setIsDropdownOpen(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#583714]/60 hover:text-[#583714] text-xs font-bold"
                      title="Clear text"
                    >
                      ✕
                    </button>
                  )}

                  {/* AUTOMATCH DROPDOWN MENU */}
                  {isDropdownOpen && (
                    <>
                      {/* Invisible backdrop to dismiss on click outside */}
                      <div 
                        className="fixed inset-0 z-[998]" 
                        onClick={() => setIsDropdownOpen(false)} 
                      />

                      <motion.div 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-0 right-0 top-full mt-2 z-[999] bg-[#FFFDF5] border border-[#E6D39D] rounded-xl shadow-2xl p-1.5 space-y-0.5 min-w-[260px]"
                      >
                        {autoMatchSuggestions.length > 0 ? (
                          autoMatchSuggestions.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setSearchQuery(item.searchVal);
                                setActiveCategory(item.category);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-[#583714] hover:text-[#FFE897] text-[#583714] text-xs font-bold flex items-center justify-between transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <Car className="w-4 h-4 text-[#583714] group-hover:text-[#FFE897] shrink-0" />
                                <span>{item.title}</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#583714] group-hover:text-[#583714] bg-[#F7EED3] group-hover:bg-[#FFE897] px-2 py-0.5 rounded-full shrink-0">
                                {item.badge}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="p-3 text-center text-xs text-[#583714]/60">
                            No matching vehicle
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {/* Service Type Select */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase tracking-wider text-[#583714] font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#583714]" />
                  <span>Service Type</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] focus:border-[#583714] text-xs sm:text-sm text-[#583714] focus:outline-none focus:ring-2 focus:ring-[#583714]/20 transition-all cursor-pointer font-bold"
                >
                  <option value="outstation" className="bg-[#FFFDF5] text-[#583714]">Outstation Trips (CNG/Petrol)</option>
                  <option value="local" className="bg-[#FFFDF5] text-[#583714]">Local Hourly Rentals (8h/80km)</option>
                  <option value="airport" className="bg-[#FFFDF5] text-[#583714]">Airport Pickup & Drop</option>
                  <option value="corporate" className="bg-[#FFFDF5] text-[#583714]">Corporate Chauffeur Fleet</option>
                </select>
              </div>

              {/* Rate Starting Preview */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase tracking-wider text-[#583714] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#583714]" />
                  <span>Rate Starting</span>
                </label>
                <div className="h-[44px] flex items-center px-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-xs sm:text-sm font-bold text-[#583714] shadow-inner">
                  <span className="truncate">
                    {serviceType === 'outstation' && '₹16 / KM (Outstation)'}
                    {serviceType === 'local' && '₹1,500 (8 hrs / 80 km)'}
                    {serviceType === 'airport' && '₹1,200 (Airport Drop)'}
                    {serviceType === 'corporate' && 'Custom Executive Tariff'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-transparent select-none font-semibold hidden lg:block">Action</label>
                <button
                  onClick={() => {
                    const el = document.getElementById('fleet');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onOpenBookingModal();
                    }
                  }}
                  className="w-full h-[44px] rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-gold-glow active:scale-95 border border-[#583714]/20"
                >
                  <span>Check Rates</span>
                  <ArrowRight className="w-4 h-4 text-[#583714]" />
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. DUSK LUXURY SECTION (TAJ TAXI & TRAVEL AGENCY SHOWCASE) */}
      <section className="bg-[#FAF5E6] text-[#583714] py-16 sm:py-24 border-b border-[#E6D39D] relative z-0 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE897]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#583714]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT SIDE: TAXI SERVICE & AGENCY INFORMATION BEAUTIFULLY PRESENTED */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] text-[11px] font-black uppercase tracking-widest shadow-sm border border-[#583714]/20">
                  <ShieldCheck className="w-4 h-4 text-[#583714]" />
                  <span>24/7 Taxi & Mobility Service</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7EED3] text-[#583714] border border-[#E6D39D] text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#583714]" />
                  <span>Door to Door Service</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF5] text-[#583714] border border-[#E6D39D] text-xs font-bold">
                  <Users className="w-3.5 h-3.5 text-[#583714]" />
                  <span>7 Seater Comfort</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2.5">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#583714] leading-[1.15]">
                  Taj Tour's & Travels <span className="font-pinyon text-4xl sm:text-5xl text-[#8C6228] font-normal align-middle ml-1">Taxi Service</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm font-bold text-[#583714] tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#583714]" />
                  <span>Safe • Comfortable • On Time — We take you where you need to be!</span>
                </p>
                <p className="text-sm sm:text-base text-[#583714]/85 leading-relaxed font-normal">
                  Operating dedicated luxury 6+1 Seater MPVs (Maruti Ertiga) and executive sedans (Maruti Dzire) with verified professional chauffeurs across India for transparent per-kilometer & custom package tariffs.
                </p>
              </div>

              {/* OUR SERVICES - 4 KEY CATEGORIES GRID FROM POSTER */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#583714] flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#583714]" />
                  <span>Our Travel Services</span>
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  
                  {/* Service 1: Local Trips */}
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm hover:border-[#583714] hover:shadow-md transition-all group">
                    <div className="w-8 h-8 rounded-xl bg-[#F7EED3] text-[#583714] flex items-center justify-center mb-2 group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#583714]">Local Trips</h4>
                    <p className="text-[11px] text-[#583714]/75 mt-0.5 leading-tight">City cabs & custom hourly packages</p>
                  </div>

                  {/* Service 2: Airport Transfers */}
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm hover:border-[#583714] hover:shadow-md transition-all group">
                    <div className="w-8 h-8 rounded-xl bg-[#F7EED3] text-[#583714] flex items-center justify-center mb-2 group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
                      <Plane className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#583714]">Airport Transfers</h4>
                    <p className="text-[11px] text-[#583714]/75 mt-0.5 leading-tight">Punctual pickup & drop 24/7</p>
                  </div>

                  {/* Service 3: Outstation Trips */}
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm hover:border-[#583714] hover:shadow-md transition-all group">
                    <div className="w-8 h-8 rounded-xl bg-[#F7EED3] text-[#583714] flex items-center justify-center mb-2 group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#583714]">Outstation Trips</h4>
                    <p className="text-[11px] text-[#583714]/75 mt-0.5 leading-tight">Intercity one-way & round trips</p>
                  </div>

                  {/* Service 4: Corporate Travel */}
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm hover:border-[#583714] hover:shadow-md transition-all group">
                    <div className="w-8 h-8 rounded-xl bg-[#F7EED3] text-[#583714] flex items-center justify-center mb-2 group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#583714]">Corporate Travel</h4>
                    <p className="text-[11px] text-[#583714]/75 mt-0.5 leading-tight">Executive rides & company fleets</p>
                  </div>

                </div>
              </div>

              {/* WHY CHOOSE US - 4 PILLARS FROM POSTER */}
              <div className="bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl p-4 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#583714] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#583714]" />
                    <span>Why Choose Us?</span>
                  </h3>
                  <span className="text-[10px] font-black text-[#583714] bg-[#FFE897] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#583714]/20">
                    Always At Your Service
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#583714]">
                    <CheckCircle2 className="w-4 h-4 text-[#583714] shrink-0" />
                    <span>Safe & Reliable</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#583714]">
                    <CheckCircle2 className="w-4 h-4 text-[#583714] shrink-0" />
                    <span>Professional Drivers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#583714]">
                    <CheckCircle2 className="w-4 h-4 text-[#583714] shrink-0" />
                    <span>Clean & Well Maintained</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#583714]">
                    <CheckCircle2 className="w-4 h-4 text-[#583714] shrink-0" />
                    <span>Affordable Fares</span>
                  </div>
                </div>
              </div>

              {/* TARIFF HIGHLIGHTS */}
              <div className="pt-2 border-t border-[#E6D39D]">
                <div className="grid grid-cols-3 gap-3 text-center sm:text-left">
                  <div className="bg-[#FFFDF5] p-3 rounded-xl border border-[#E6D39D] shadow-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#583714]">₹16<span className="text-xs font-sans text-[#583714]/70">/KM</span></span>
                    <p className="text-[10px] sm:text-xs text-[#583714]/80 uppercase tracking-wider font-bold mt-0.5">Outstation CNG</p>
                  </div>
                  <div className="bg-[#FFFDF5] p-3 rounded-xl border border-[#E6D39D] shadow-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#583714]">₹1,500</span>
                    <p className="text-[10px] sm:text-xs text-[#583714]/80 uppercase tracking-wider font-bold mt-0.5">Starting Rental</p>
                  </div>
                  <div className="bg-[#FFFDF5] p-3 rounded-xl border border-[#E6D39D] shadow-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#583714]">24/7</span>
                    <p className="text-[10px] sm:text-xs text-[#583714]/80 uppercase tracking-wider font-bold mt-0.5">Phone Dispatch</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: CLEAN ELONGATED FLEET PICTURE */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full h-full rounded-3xl overflow-hidden border border-[#E6D39D] shadow-2xl bg-[#FFFDF5] p-2.5 sm:p-3"
              >
                <div className="relative rounded-2xl overflow-hidden w-full h-[480px] sm:h-[540px] lg:h-[580px]">
                  <img 
                    src="/cars.jfif" 
                    alt="Taj Tour's & Travels Dedicated Fleet" 
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED FLEET SHOWCASE */}
      <section id="fleet" className="bg-[#FAF5E6] py-20 text-[#583714] border-b border-[#E6D39D] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
                Our Fleet
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#583714] mt-1">
                Ertiga & Dzire Fleet Vehicles
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#F7EED3] border border-[#E6D39D]">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'mpv', label: 'Ertiga (6+1)' },
                { id: 'sedan', label: 'Dzire Sedan' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id as any);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === tab.id
                      ? 'bg-[#583714] text-[#FFE897] shadow-sm'
                      : 'text-[#583714]/80 hover:text-[#583714]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Search Filter Banner */}
          {searchQuery && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EED3] border border-[#583714]/30 text-xs text-[#583714]">
              <span>
                Filtering fleet matching: <strong className="text-[#583714]">"{searchQuery}"</strong> ({filteredVehicles.length} vehicle{filteredVehicles.length === 1 ? '' : 's'} found)
              </span>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 rounded-lg bg-[#583714] text-[#FFE897] font-bold text-[11px] hover:bg-[#42280C] transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Empty Filter State */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12 bg-[#F7EED3] rounded-2xl border border-[#E6D39D] p-8 max-w-md mx-auto space-y-3">
              <p className="text-sm text-[#583714]/80">No vehicles match <strong className="text-[#583714]">"{searchQuery}"</strong></p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-4 py-2 rounded-xl bg-[#583714] text-[#FFE897] font-bold text-xs hover:bg-[#42280C] transition-colors"
              >
                Show All Fleet Vehicles
              </button>
            </div>
          )}

          {/* Fleet Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl border-2 border-[#E6D39D] hover:border-[#583714] overflow-hidden shadow-md hover:shadow-[0_25px_50px_-10px_rgba(88,55,20,0.25)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#583714] border border-[#FFE897]/30 text-[10px] font-bold text-[#FFE897] uppercase tracking-wider">
                      {vehicle.passengers} SEATER
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FFFDF5]/90 backdrop-blur-md border border-[#E6D39D] text-[10px] text-[#583714] font-bold font-mono">
                      {vehicle.fuelType}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-4 text-left">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#583714] group-hover:text-[#8C6228] transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-[#583714] font-bold mt-0.5">{vehicle.tagline}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E6D39D] text-xs text-[#583714]/80">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Users className="w-3.5 h-3.5 text-[#583714]" />
                        <span>{vehicle.passengers} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <Fuel className="w-3.5 h-3.5 text-[#583714]" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <Car className="w-3.5 h-3.5 text-[#583714]" />
                        <span>{vehicle.luggage} Bags</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-xs text-[#583714]">
                      {vehicle.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#583714] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-between text-xs">
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-[#583714]/80 font-bold block">Outstation CNG AC</span>
                      <span className="font-serif text-base font-bold text-[#583714]">{vehicle.outstationCngAc}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-[#583714]/80 font-bold block">Full 24 Hrs</span>
                      <span className="font-serif text-xs font-bold text-[#583714]">{vehicle.dailyFullDayRate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal(vehicle.name)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black text-xs uppercase tracking-widest transition-all shadow-gold-glow border border-[#583714]/20"
                    data-cursor="BOOK"
                  >
                    Reserve {vehicle.name}
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. RENTAL PACKAGES */}
      <section className="bg-[#FAF5E6] text-[#583714] py-20 border-b border-[#E6D39D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
              Flexible Hourly Packages
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#583714]">
              Local Rental Package Table
            </h2>
            <p className="text-sm text-[#583714]/85">
              Hassle-free fixed package tariffs for city travel, business meetings, and shopping circuits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "4 HRS / 40 KM", price: "₹ 1,500 Rs" },
              { title: "6 HRS / 60 KM", price: "₹ 2,250 Rs" },
              { title: "8 HRS / 80 KM", price: "₹ 3,000 Rs" },
              { title: "10 HRS / 100 KM", price: "₹ 3,750 Rs" },
              { title: "12 HRS / 120 KM", price: "₹ 4,500 Rs" },
            ].map((pkg, index) => (
              <div
                key={index}
                className="bg-[#FFFDF5] p-6 rounded-2xl border border-[#E6D39D] shadow-sm text-center space-y-3 flex flex-col justify-between hover:border-[#583714] transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#583714] uppercase tracking-wider block">
                    {pkg.title}
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#583714]">
                    {pkg.price}
                  </div>
                </div>
                <button
                  onClick={() => onOpenBookingModal()}
                  className="w-full py-2.5 rounded-xl bg-[#F7EED3] hover:bg-[#583714] text-[#583714] hover:text-[#FFE897] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Book Package
                </button>
              </div>
            ))}
          </div>

          {/* 24-Hour Full Day Highlight Banner */}
          <div className="p-8 rounded-2xl bg-[#FFFDF5] border-2 border-[#583714] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full bg-[#583714] text-[#FFE897] text-[10px] font-bold uppercase tracking-widest">
                Full Day + Night Booking
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#583714]">24 Hours Full Ride: ₹ 6,000 Rs / Day</h3>
              <p className="text-xs text-[#583714]/85">Includes day and night mobility assistance across All India routes.</p>
            </div>
            <button
              onClick={() => onOpenBookingModal()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black text-xs uppercase tracking-widest shadow-gold-glow shrink-0 border border-[#583714]/20"
            >
              Reserve 24h Full Booking
            </button>
          </div>

        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="bg-[#FAF5E6] text-[#583714] py-20 border-b border-[#E6D39D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
              Verified Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#583714] mt-1">
              What Our Travelers Say
            </h2>
          </div>
        </div>

        {/* Auto-scrolling marquee track (content duplicated once for a seamless loop) */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-[#FAF5E6] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-[#FAF5E6] to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                className="w-[300px] sm:w-[380px] shrink-0 mx-4 bg-[#FFFDF5] border border-[#E6D39D] p-8 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#583714]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#583714]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#583714] italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6D39D]">
                  <h4 className="font-serif text-base font-bold text-[#583714]">{t.clientName}</h4>
                  <p className="text-[11px] text-[#583714] font-bold">{t.tripType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="relative rounded-3xl overflow-hidden border border-[#583714]/30 p-8 sm:p-14 shadow-2xl text-left">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="/home.jfif"
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3A230B]/90 via-[#3A230B]/70 to-[#3A230B]/40" />
          </div>

          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#FFE897] font-bold">
              All India Mobility Dispatch
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight drop-shadow-md">
              Ready to Book Your Ride Now?
            </h2>
            <p className="text-sm text-[#FAF5E6]/90 leading-relaxed font-semibold">
              Call our travel desk at <strong className="text-[#FFE897] font-bold">{COMPANY_INFO.phoneDisplay}</strong> for instant ride allocation, outstation quotes, and rental package bookings.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBookingModal()}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-gold-glow hover:brightness-105 transition-all border border-[#583714]/20 shimmer-btn"
              >
                <Calendar className="w-4 h-4 text-[#583714]" />
                Book Your Ride Now
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-8 py-4 rounded-full bg-[#FFE897]/15 hover:bg-[#FFE897]/25 backdrop-blur-md text-[#FFE897] font-bold text-xs uppercase tracking-widest flex items-center gap-3 border border-[#FFE897]/40 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-[#FFE897]" />
                Call {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
