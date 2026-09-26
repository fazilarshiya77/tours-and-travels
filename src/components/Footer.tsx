import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Clock, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3A230B] text-[#FAF5E6] border-t border-[#FFE897]/30 pt-10 pb-6 relative overflow-hidden">
      {/* Ambient Decorative Accent */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FFE897]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Brand & Highlight Bar (Compact & Sleek) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-[#FFE897]/20 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#4A2E12] border border-[#FFE897]/20 shadow-sm">
            <div className="p-2 rounded-lg bg-[#FFE897] text-[#3A230B] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FFE897]">Verified Drivers (Pilots)</h4>
              <p className="text-[11px] text-[#FAF5E6]/80 mt-0.5 leading-snug">
                Background-checked senior pilots fluent in English & Hindi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#4A2E12] border border-[#FFE897]/20 shadow-sm">
            <div className="p-2 rounded-lg bg-[#FFE897] text-[#3A230B] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FFE897]">24/7 Phone Dispatch Desk</h4>
              <p className="text-[11px] text-[#FAF5E6]/80 mt-0.5 leading-snug">
                Round-the-clock telephone and WhatsApp booking desk.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#4A2E12] border border-[#FFE897]/20 shadow-sm">
            <div className="p-2 rounded-lg bg-[#FFE897] text-[#3A230B] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FFE897]">Pristine Fleet Standard</h4>
              <p className="text-[11px] text-[#FAF5E6]/80 mt-0.5 leading-snug">
                Rigorous safety inspection & sanitized AC Ertiga & Dzire cabins.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links (Thinner Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 text-left">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#FFE897]/40 flex items-center justify-center bg-gradient-to-br from-[#FFE897] via-[#C59A45] to-[#583714] shadow-gold-glow">
                <span className="font-serif text-[#3A230B] text-lg font-black">T</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-wide text-[#FFE897]">
                TAJ TOUR'S & TRAVELS
              </span>
            </Link>

            <p className="text-xs text-[#FAF5E6]/85 leading-relaxed max-w-md">
              Safe • Comfortable • Reliable. All India mobility service provider featuring pristine 6+1 Seater Maruti Ertiga and Maruti Dzire vehicles with transparent per-kilometer and rental package tariffs.
            </p>

            {/* Direct Phone & WhatsApp badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#4A2E12] border border-[#FFE897]/30 text-xs font-bold text-[#FFE897] hover:bg-[#FFE897] hover:text-[#3A230B] transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE897] border border-[#FFE897] text-xs font-bold text-[#3A230B] hover:brightness-110 transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#3A230B]" />
                <span>WhatsApp Booking</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FFE897]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#FAF5E6]/85 font-medium">
              <li><Link to="/fleet" className="hover:text-[#FFE897] transition-colors">Ertiga & Dzire Fleet</Link></li>
              <li><Link to="/gallery" className="hover:text-[#FFE897] transition-colors">Visual Travel Gallery</Link></li>
              <li><Link to="/about" className="hover:text-[#FFE897] transition-colors">About Taj Tour's & Travels</Link></li>
              <li><Link to="/contact" className="hover:text-[#FFE897] transition-colors">Contact Concierge</Link></li>
              <li><Link to="/booking" className="hover:text-[#FFE897] font-bold transition-colors">Book Online</Link></li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#FFE897]">
              Direct Dispatch Desk
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-[#FAF5E6]/85 font-medium">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFE897] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-[#FFE897] font-bold hover:underline">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFE897] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFE897] shrink-0 mt-0.5" />
                <span className="leading-tight">{COMPANY_INFO.address}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#4A2E12] border border-[#FFE897]/20 shadow-sm mt-1">
              <span className="text-[11px] text-[#FFE897] font-bold block mb-0.5">
                All India Outstation Service
              </span>
              <p className="text-[11px] text-[#FAF5E6]/80 leading-tight">
                CNG AC rides from ₹17/KM, Petrol rides from ₹18/KM, and local 4h to 24h packages.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar (Thinner) */}
        <div className="pt-4 border-t border-[#FFE897]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#FAF5E6]/70">
          <div>
            © {new Date().getFullYear()} Taj Tour's & Travels. All Rights Reserved. Safe • Comfortable • Reliable.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#FFE897] cursor-pointer transition-colors font-medium">Terms of Tariff</span>
            <span className="hover:text-[#FFE897] cursor-pointer transition-colors font-medium">Pilot Rules</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
