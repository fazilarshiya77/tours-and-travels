import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenBookingModal: (vehicleName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle navbar elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-4 sm:px-6 transition-all duration-300">
        <div className={`max-w-5xl mx-auto rounded-full px-5 transition-all duration-300 ${
          isScrolled
            ? 'py-2 bg-[#FFFDF5]/95 backdrop-blur-xl border border-[#E6D39D] shadow-[0_10px_30px_rgba(88,55,20,0.12)]'
            : 'py-2.5 bg-[#FFFDF5]/90 backdrop-blur-md border border-[#E6D39D] shadow-luxury'
        }`}>
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 shrink-0 group"
              data-cursor="TAJ"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFE897] via-[#C59A45] to-[#583714] flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
                <span className="font-serif text-[#583714] text-sm font-black tracking-tighter">T</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-sm font-bold tracking-wider text-[#583714] group-hover:text-[#8C6228] transition-colors whitespace-nowrap">
                  TAJ TOURS
                </span>
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#8C6228] whitespace-nowrap font-bold">
                  & Travels
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[11px] uppercase tracking-[0.15em] font-bold transition-colors duration-300 py-1 whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-[#583714] font-extrabold'
                      : 'text-[#583714]/80 hover:text-[#583714]'
                  }`}
                  data-cursor="GO"
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFE897] to-transparent rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-[11px] text-[#583714] hover:bg-[#FFE897]/50 transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E6D39D] whitespace-nowrap bg-[#F7EED3] font-bold"
                data-cursor="CALL"
              >
                <Phone className="w-3 h-3 text-[#583714]" />
                <span className="tracking-wide">Call 24/7</span>
              </a>

              <button
                onClick={() => onOpenBookingModal()}
                className="px-5 py-1.5 rounded-full bg-[#583714] hover:bg-[#42280C] text-[#FFE897] font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md whitespace-nowrap shrink-0 border border-[#FFE897]/40 shimmer-btn"
                data-cursor="BOOK"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FFE897]" />
                Book Ride
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => onOpenBookingModal()}
                className="px-3 py-1 rounded-full bg-[#583714] text-[#FFE897] font-bold text-[10px] uppercase tracking-wider whitespace-nowrap border border-[#FFE897]/40 shimmer-btn"
              >
                Book
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-[#583714] hover:text-[#8C6228] transition-colors focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF5E6]/98 backdrop-blur-2xl flex flex-col justify-between px-6 pt-28 pb-10 transition-all duration-300 animate-fade-in lg:hidden text-left">
          <div className="flex flex-col gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#583714] font-bold border-b border-[#E6D39D] pb-3">
              Taj Navigation
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xl font-serif tracking-wide flex items-center justify-between transition-colors ${
                  isActive(link.path) ? 'text-[#583714] font-bold' : 'text-[#583714]/80 hover:text-[#583714]'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <Compass className="w-5 h-5 text-[#583714]" />}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#E6D39D]">
            <div className="flex items-center gap-2 text-xs text-[#583714]/80">
              <ShieldCheck className="w-4 h-4 text-[#583714]" />
              <span>{COMPANY_INFO.badge} • 24/7 Mobility Desk</span>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-3.5 rounded-xl bg-[#583714] text-[#FFE897] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-luxury border border-[#FFE897]/40 shimmer-btn"
            >
              <Calendar className="w-4 h-4 text-[#FFE897]" />
              Book Ride Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

