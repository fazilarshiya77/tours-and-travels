import React, { useState } from 'react';
import { X, Calendar, MapPin, User, Car, CheckCircle2, ChevronRight, MessageSquare, Phone } from 'lucide-react';
import { VEHICLES, COMPANY_INFO } from '../data/mockData';
import { createInquiry } from '../services/dataService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialVehicleName }) => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicleName || VEHICLES[0].name);
  const [serviceType, setServiceType] = useState('Outstation Chauffeur');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello Taj Tours & Travels! I would like to book a vehicle:\n\n` +
      `🚗 Vehicle: ${selectedVehicle}\n` +
      `🛠 Service: ${serviceType}\n` +
      `📍 Pick-up: ${pickupCity || 'Not specified'}\n` +
      `🏁 Destination: ${dropCity || 'Local rental'}\n` +
      `📅 Travel Date: ${travelDate || 'As soon as possible'}\n` +
      `👥 Passengers: ${passengers}\n` +
      `👤 Name: ${customerName || 'Valued Guest'}\n` +
      `📞 Phone: ${customerPhone || 'Included'}\n` +
      `📝 Notes: ${notes || 'Standard luxury service'}`;
    return encodeURIComponent(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createInquiry({
      customerName,
      phone: customerPhone,
      service: serviceType,
      vehicle: selectedVehicle,
      travelDate,
      pickup: pickupCity,
      destination: dropCity,
      passengers,
      message: notes,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3A230B]/65 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF5E6] border-b border-[#E6D39D] text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#583714]/20 flex items-center justify-center bg-gradient-to-br from-[#FFE897] via-[#C59A45] to-[#583714]">
              <Car className="w-4 h-4 text-[#583714]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#583714]">Reserve Luxury Mobility</h3>
              <p className="text-[10px] uppercase tracking-wider text-[#583714] font-bold">Taj Tours & Travels Concierge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#583714] hover:bg-[#FFE897]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="flex items-center justify-between px-8 py-3 bg-[#FAF5E6] border-b border-[#E6D39D] text-xs font-bold text-[#583714]">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#583714]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#583714] text-[#FFE897] font-bold' : 'bg-[#E6D39D]'}`}>1</span>
              <span>Trip Details</span>
            </div>
            <div className="h-[1px] w-8 bg-[#E6D39D]" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#583714]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#583714] text-[#FFE897] font-bold' : 'bg-[#E6D39D]'}`}>2</span>
              <span>Fleet & Vehicle</span>
            </div>
            <div className="h-[1px] w-8 bg-[#E6D39D]" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#583714]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#583714] text-[#FFE897] font-bold' : 'bg-[#E6D39D]'}`}>3</span>
              <span>Passenger Info</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-left bg-[#FFFDF5]">
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
              
              {/* Step 1: Trip & Dates */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
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
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
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
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1">Pick-up Location / City</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#583714]" />
                        <input
                          type="text"
                          required
                          value={pickupCity}
                          onChange={(e) => setPickupCity(e.target.value)}
                          placeholder="e.g. New Delhi / Jaipur"
                          className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#583714]/85 mb-1">Drop Location / Destination</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#583714]" />
                        <input
                          type="text"
                          value={dropCity}
                          onChange={(e) => setDropCity(e.target.value)}
                          placeholder="e.g. Agra / Local Outstation"
                          className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1">Travel Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-3 text-[#583714]" />
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Selection */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
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
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1">Number of Passengers</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl px-4 py-2.5 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Passenger Information */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-[#583714]" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1">Contact Phone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-[#583714]" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714]/85 mb-1">Special Preferences or Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. English speaking chauffeur, luggage rack, child seat"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-sm text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>
              )}

              {/* Buttons Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E6D39D]">
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
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-105 transition-all border border-[#583714]/20"
                  >
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

