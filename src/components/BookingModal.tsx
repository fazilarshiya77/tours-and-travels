import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, MapPin, User, Car, CheckCircle2, ChevronRight, MessageSquare, Phone, Mail, Clock } from 'lucide-react';
import { VEHICLES, COMPANY_INFO } from '../data/mockData';
import { createInquiry } from '../services/dataService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleName?: string;
}

const INDIAN_CITIES = [
  'Bengaluru', 'Mysore', 'Coorg (Madikeri)', 'Chikmagalur', 'Hampi', 'Hassan', 'Mangalore', 'Udupi',
  'Chennai', 'Coimbatore', 'Ooty', 'Kodaikanal', 'Madurai', 'Pondicherry', 'Tirupati',
  'Hyderabad', 'Vijayawada', 'Visakhapatnam',
  'Kochi', 'Munnar', 'Alleppey', 'Trivandrum', 'Wayanad',
  'Goa (Panaji)', 'Mumbai', 'Pune', 'Nagpur',
  'Delhi', 'Gurugram', 'Noida', 'Jaipur', 'Udaipur', 'Jodhpur', 'Agra', 'Lucknow', 'Varanasi',
  'Ahmedabad', 'Surat', 'Kolkata', 'Bhubaneswar',
  'Chandigarh', 'Shimla', 'Manali', 'Amritsar',
  'Kempegowda International Airport (BLR)',
];

// Small self-contained autocomplete used for both Pick-up and Drop location
// fields — narrows suggestions as soon as a few letters are typed.
interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ value, onChange, placeholder, required }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const query = value.trim().toLowerCase();
  const suggestions = query.length > 0
    ? INDIAN_CITIES.filter((city) => city.toLowerCase().includes(query)).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-[#583714] z-10" />
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-3 text-sm text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-[#FFFDF5] border border-[#E6D39D] rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
          {suggestions.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                onChange(city);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-[#583714] font-medium hover:bg-[#FFE897]/40 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialVehicleName }) => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicleName || VEHICLES[0].name);
  const [serviceType, setServiceType] = useState('Outstation Chauffeur');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real visitors never fill this
  const [isSubmitted, setIsSubmitted] = useState(false);

  // The modal stays mounted (isOpen just toggles rendering), so without this
  // its state — including a completed submission — would still be there the
  // next time it's opened. Reset to a fresh form every time it opens.
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedVehicle(initialVehicleName || VEHICLES[0].name);
      setServiceType('Outstation Chauffeur');
      setPickupCity('');
      setDropCity('');
      setTravelDate('');
      setPassengers('2');
      setCustomerName('');
      setCustomerPhone('');
      setCustomerEmail('');
      setPickupTime('');
      setNotes('');
      setWebsite('');
      setIsSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const fullPhone = customerPhone ? `+91 ${customerPhone}` : '';

  const generateWhatsAppMessage = () => {
    const text = `Hello Taj Tours & Travels! I would like to book a vehicle:\n\n` +
      `🚗 Vehicle: ${selectedVehicle}\n` +
      `🛠 Service: ${serviceType}\n` +
      `📍 Pick-up: ${pickupCity || 'Not specified'}\n` +
      `🏁 Destination: ${dropCity || 'Local rental'}\n` +
      `📅 Travel Date: ${travelDate || 'As soon as possible'}${pickupTime ? ` at ${pickupTime}` : ''}\n` +
      `👥 Passengers: ${passengers}\n` +
      `👤 Name: ${customerName || 'Valued Guest'}\n` +
      `📞 Phone: ${fullPhone || 'Included'}\n` +
      `📝 Notes: ${notes || 'Standard luxury service'}`;
    return encodeURIComponent(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website.trim() !== '') {
      // Likely a bot. Pretend success without actually submitting.
      setIsSubmitted(true);
      return;
    }

    const combinedNotes = pickupTime
      ? `Preferred pickup time: ${pickupTime}. ${notes}`.trim()
      : notes;

    await createInquiry({
      customerName,
      phone: fullPhone,
      email: customerEmail,
      service: serviceType,
      vehicle: selectedVehicle,
      travelDate,
      pickup: pickupCity,
      destination: dropCity,
      passengers,
      message: combinedNotes,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3A230B]/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#FFFDF5] border-2 border-[#583714]/25 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-[#FAF5E6] border-b border-[#E6D39D] text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#583714]/20 flex items-center justify-center bg-gradient-to-br from-[#FFE897] via-[#C59A45] to-[#583714] shadow-gold-glow shrink-0">
              <Car className="w-6 h-6 text-[#583714]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#583714]">Reserve Luxury Mobility</h3>
              <p className="text-xs uppercase tracking-wider text-[#583714]/80 font-bold mt-0.5">Taj Tours & Travels Concierge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#583714] hover:bg-[#FFE897]/50 transition-colors shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="flex items-center justify-between px-8 sm:px-10 py-4 bg-[#FAF5E6] border-b border-[#E6D39D] text-sm font-bold text-[#583714]">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#583714]' : 'text-[#583714]/50'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#583714] text-[#FFE897] font-bold' : 'bg-[#E6D39D]'}`}>1</span>
              <span className="hidden sm:inline">Trip Details</span>
            </div>
            <div className="h-[1px] flex-1 mx-3 bg-[#E6D39D]" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#583714]' : 'text-[#583714]/50'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#583714] text-[#FFE897] font-bold' : 'bg-[#E6D39D]'}`}>2</span>
              <span className="hidden sm:inline">Fleet & Vehicle</span>
            </div>
            <div className="h-[1px] flex-1 mx-3 bg-[#E6D39D]" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#583714]' : 'text-[#583714]/50'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#583714] text-[#FFE897] font-bold' : 'bg-[#E6D39D]'}`}>3</span>
              <span className="hidden sm:inline">Passenger Info</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-8 sm:p-10 overflow-y-auto flex-1 text-left bg-[#FFFDF5]">
          {isSubmitted ? (
            <div className="py-8 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE897] to-[#C59A45] flex items-center justify-center text-[#583714] shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#583714]">Inquiry Created Successfully</h3>
              <p className="text-sm text-[#583714]/85 max-w-md">
                Thank you, <strong className="text-[#583714]">{customerName || 'Valued Guest'}</strong>. Our travel concierge will reach out to confirm driver assignment and vehicle dispatch details.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-105 transition-colors border border-[#583714]/20"
                >
                  <MessageSquare className="w-4 h-4 text-[#583714]" />
                  Instant WhatsApp Booking
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#583714] font-bold text-xs uppercase tracking-wider hover:bg-[#FFE897]/40 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot: hidden from real users, bots tend to fill every field */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />

              {/* Step 1: Trip & Dates */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#583714] font-bold mb-2">
                      Service Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Outstation Chauffeur',
                        'Airport VIP Transfer',
                        'Local Hourly Rental',
                        'Wedding & Event Fleet'
                      ].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setServiceType(st)}
                          className={`p-3.5 rounded-xl border text-sm font-bold text-left transition-all ${
                            serviceType === st
                              ? 'bg-[#FFE897] border-[#583714] text-[#583714]'
                              : 'bg-[#F7EED3] border-[#E6D39D] text-[#583714]/85 hover:border-[#583714]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Pick-up Location / City</label>
                      <CityAutocomplete
                        value={pickupCity}
                        onChange={setPickupCity}
                        placeholder="Start typing e.g. Ben..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Drop Location / Destination</label>
                      <CityAutocomplete
                        value={dropCity}
                        onChange={setDropCity}
                        placeholder="Start typing e.g. Mys..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Travel Date</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3.5 text-[#583714]" />
                        <input
                          type="date"
                          required
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-3 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Preferred Pickup Time (Optional)</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 absolute left-3 top-3.5 text-[#583714]" />
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-3 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Selection */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <label className="block text-xs uppercase tracking-wider text-[#583714] font-bold">
                    Select Your Vehicle
                  </label>
                  <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-1">
                    {VEHICLES.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicle(v.name)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          selectedVehicle === v.name
                            ? 'bg-[#FFE897] border-[#583714]'
                            : 'bg-[#F7EED3] border-[#E6D39D] hover:border-[#583714]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={v.image} alt={v.name} className="w-16 h-10 object-cover rounded-lg" />
                          <div>
                            <h4 className="font-serif text-sm font-bold text-[#583714]">{v.name}</h4>
                            <p className="text-[11px] text-[#583714]/80 font-medium">{v.passengers} Seats • {v.transmission} • {v.hourlyRate}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold ${selectedVehicle === v.name ? 'text-[#583714]' : 'text-[#583714]/50'}`}>
                          {selectedVehicle === v.name ? 'Selected' : 'Choose'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Number of Passengers</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={passengers}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 2);
                        setPassengers(digitsOnly);
                      }}
                      onBlur={() => {
                        const n = Math.min(15, Math.max(1, parseInt(passengers, 10) || 1));
                        setPassengers(String(n));
                      }}
                      placeholder="e.g. 4"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl px-4 py-3 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Passenger Information */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3.5 text-[#583714]" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                        placeholder="Enter your name"
                        className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-3 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Contact Phone / WhatsApp</label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 absolute left-3 text-[#583714] z-10" />
                        <span className="absolute left-9 text-sm font-bold text-[#583714]/70 z-10">+91</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          required
                          maxLength={10}
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98765 43210"
                          title="Enter a 10-digit mobile number"
                          className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-16 pr-3 py-3 text-sm text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Email Address (Optional)</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3.5 text-[#583714]" />
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-3 text-sm text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1.5">Special Preferences or Notes (Optional)</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                      placeholder="e.g. English speaking chauffeur, luggage rack, child seat"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>
              )}

              {/* Buttons Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-[#E6D39D]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#583714] hover:text-[#8C6228] transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#42280C] transition-colors shadow-sm"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black text-sm uppercase tracking-widest flex items-center gap-2.5 shadow-gold-glow hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-[#583714]/30"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#583714]" />
                    Confirm Booking Request
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
