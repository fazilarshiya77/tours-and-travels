import React, { useState } from 'react';
import { VEHICLES, COMPANY_INFO } from '../data/mockData';
import { Users, Fuel, Car, CheckCircle2, ArrowRight, Clock, Phone } from 'lucide-react';

interface RentalsProps {
  onOpenBookingModal: (vehicleName?: string) => void;
}

export const Rentals: React.FC<RentalsProps> = ({ onOpenBookingModal }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVehicles = VEHICLES.filter((v) => {
    return v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           v.tagline.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-24 sm:pt-28 pb-20">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE897] border border-[#583714]/20 text-[#583714] text-xs uppercase tracking-[0.2em] font-bold">
          <span>{COMPANY_INFO.badge} • {COMPANY_INFO.tagline}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#583714] leading-tight">
          Maruti Suzuki Ertiga & Dzire Fleet
        </h1>
        <p className="text-sm sm:text-base text-[#583714]/85 leading-relaxed font-normal">
          Official tariff card for local trips, hourly rental packages, and outstation rides across India.
        </p>
      </div>

      {/* 1. OFFICIAL RATE CARD BANNER */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFDF5] text-[#583714] border border-[#E6D39D] shadow-2xl space-y-8 text-left">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E6D39D] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold block">
              Official Rate Card & Tariff
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#583714] mt-1">
              Taj Tour's & Travels Tariff Structure
            </h2>
          </div>
          
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-105 text-[#583714] font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-gold-glow border border-[#583714]/20"
          >
            <Phone className="w-4 h-4 text-[#583714]" />
            <span>Call {COMPANY_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* 3 Columns: Outstation Rides | Local Packages | Extra & Additional */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Col 1: Outstation & Local Per KM */}
          <div className="bg-[#F7EED3] border border-[#E6D39D] p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#583714]">Outstation Rides</h3>
              <span className="px-2.5 py-1 rounded bg-[#583714] text-[#FFE897] text-[10px] font-bold uppercase">
                Per KM Rates
              </span>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Local Trips */}
              <div className="p-3.5 rounded-xl bg-[#FFFDF5] border border-[#E6D39D] flex items-center justify-between shadow-sm">
                <span className="text-[#583714]/80 font-bold">Local Trips Rate</span>
                <span className="font-serif text-base font-bold text-[#583714]">32 Rs / KM</span>
              </div>

              {/* CNG Ride */}
              <div className="space-y-2 p-3.5 rounded-xl bg-[#FFFDF5] border border-[#583714]/30 shadow-sm">
                <div className="flex items-center gap-2 text-[#583714] font-bold text-xs">
                  <span className="px-2 py-0.5 rounded bg-[#583714] text-[#FFE897] text-[10px]">CNG RIDE</span>
                  <span>Only CNG Ride</span>
                </div>
                <div className="flex justify-between text-[#583714]/80 pt-1">
                  <span>Non AC Ride:</span>
                  <span className="text-[#583714] font-bold">16 Rs / KM</span>
                </div>
                <div className="flex justify-between text-[#583714]/80">
                  <span>AC Ride:</span>
                  <span className="text-[#583714] font-bold">17 Rs / KM</span>
                </div>
              </div>

              {/* Petrol Ride */}
              <div className="space-y-2 p-3.5 rounded-xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm">
                <div className="flex items-center gap-2 text-[#583714] font-bold text-xs">
                  <span className="px-2 py-0.5 rounded bg-[#583714] text-[#FFE897] text-[10px]">PETROL</span>
                  <span>Only Petrol Ride</span>
                </div>
                <div className="flex justify-between text-[#583714]/80 pt-1">
                  <span>Non AC Ride:</span>
                  <span className="text-[#583714] font-bold">18 Rs / KM</span>
                </div>
                <div className="flex justify-between text-[#583714]/80">
                  <span>AC Ride:</span>
                  <span className="text-[#583714] font-bold">18 Rs / KM</span>
                </div>
              </div>

            </div>
          </div>

          {/* Col 2: Rental Package Table */}
          <div className="bg-[#F7EED3] border border-[#E6D39D] p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#583714]">Rental Packages</h3>
              <Clock className="w-5 h-5 text-[#583714]" />
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: "4 HRS / 40 KM", price: "₹ 1,500 Rs" },
                { label: "6 HRS / 60 KM", price: "₹ 2,250 Rs" },
                { label: "8 HRS / 80 KM", price: "₹ 3,000 Rs" },
                { label: "10 HRS / 100 KM", price: "₹ 3,750 Rs" },
                { label: "12 HRS / 120 KM", price: "₹ 4,500 Rs" },
              ].map((pkg, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFFDF5] border border-[#E6D39D] shadow-sm">
                  <span className="text-[#583714]/80 font-bold">{pkg.label}</span>
                  <span className="font-serif text-sm font-bold text-[#583714]">{pkg.price}</span>
                </div>
              ))}

              {/* Full Day Highlight */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] flex items-center justify-between mt-2 shadow-md border border-[#583714]/20">
                <div>
                  <span className="text-[10px] text-[#583714]/90 uppercase tracking-wider font-bold block">
                    Full (Day + Night) Booking
                  </span>
                  <span className="text-xs font-black text-[#583714]">24 HRS FULL RIDE</span>
                </div>
                <span className="font-serif text-base font-bold text-[#583714]">₹ 6,000 Rs / Day</span>
              </div>
            </div>
          </div>

          {/* Col 3: Extra KM & Additional Charges */}
          <div className="bg-[#F7EED3] border border-[#E6D39D] p-6 rounded-2xl space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#583714]">Extra KM & Additional</h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-2 p-3.5 rounded-xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm">
                <span className="text-[10px] text-[#583714] font-bold uppercase block">Extra Kilometer Rates</span>
                <div className="flex justify-between text-[#583714]/80">
                  <span>XL Extra KM:</span>
                  <span className="text-[#583714] font-bold">18 Rs / KM</span>
                </div>
                <div className="flex justify-between text-[#583714]/80">
                  <span>XL Intercity:</span>
                  <span className="text-[#583714] font-bold">18 Rs / KM</span>
                </div>
                <div className="flex justify-between text-[#583714]/80">
                  <span>XL Rental:</span>
                  <span className="text-[#583714] font-bold">20 Rs / KM</span>
                </div>
              </div>

              {/* Additional Charges Badges */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#583714]/80 font-bold uppercase block">Additional Terms</span>
                <div className="grid grid-cols-2 gap-2">
                  {COMPANY_INFO.additionalCharges.map((chg, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#FFFDF5] border border-[#E6D39D] shadow-sm flex items-center justify-between">
                      <span className="text-[#583714] font-bold">{chg.label}</span>
                      <span className="text-[#583714] font-black text-[10px] uppercase">Extra</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. VEHICLE GRID SHOWCASE */}
      <div className="space-y-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
              Primary Vehicle Fleet
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#583714] mt-1">
              Maruti Suzuki Ertiga & Dzire
            </h2>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter vehicle name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl px-4 py-2 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-white rounded-2xl border-2 border-[#E6D39D] hover:border-[#583714] overflow-hidden shadow-md hover:shadow-[0_25px_50px_-10px_rgba(88,55,20,0.25)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#583714] border border-[#FFE897]/30 text-[10px] font-bold text-[#FFE897] uppercase tracking-wider">
                    {vehicle.passengers} SEATER
                  </span>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FFFDF5]/90 backdrop-blur-md border border-[#E6D39D] text-[10px] text-[#583714] font-bold font-mono">
                    {vehicle.fuelType}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 text-left">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#583714] group-hover:text-[#8C6228] transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-[#583714] font-bold mt-0.5">{vehicle.tagline}</p>
                  </div>

                  {/* Specs */}
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

                  {/* Key Features */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#583714] block">
                      Amenities & Features:
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {vehicle.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#583714]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#583714] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Cards & CTA */}
              <div className="p-6 pt-0 space-y-4">
                <div className="p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D] grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#583714]/80 font-bold block">Outstation AC</span>
                    <span className="font-serif text-base font-bold text-[#583714]">{vehicle.outstationCngAc}</span>
                  </div>
                  <div className="border-l border-[#E6D39D]">
                    <span className="text-[9px] uppercase tracking-wider text-[#583714]/80 font-bold block">Full Day 24h</span>
                    <span className="font-serif text-xs font-bold text-[#583714]">{vehicle.dailyFullDayRate}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingModal(vehicle.name)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-105 text-[#583714] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shadow-gold-glow border border-[#583714]/20"
                  data-cursor="BOOK"
                >
                  <span>Reserve {vehicle.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#583714]" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


