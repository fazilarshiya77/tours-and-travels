import React, { useState } from 'react';
import { VEHICLES, COMPANY_INFO } from '../data/mockData';
import { CheckCircle2, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0].name);
  const [serviceType, setServiceType] = useState('Outstation Chauffeur');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [daysCount, setDaysCount] = useState(1);
  const [passengerCount, setPassengerCount] = useState(2);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getSelectedVehicleObj = () => VEHICLES.find(v => v.name === selectedVehicle) || VEHICLES[0];

  const generateWhatsAppLink = () => {
    const text = `Hello Taj Tours & Travels! I wish to reserve a vehicle through your website booking desk:\n\n` +
      `🚗 Vehicle: ${selectedVehicle}\n` +
      `🛠 Service Type: ${serviceType}\n` +
      `📍 Pick-Up: ${pickupLocation || 'Not specified'}\n` +
      `🏁 Drop Off: ${dropLocation || 'Local outstation'}\n` +
      `📅 Travel Date: ${travelDate || 'Flexible'}\n` +
      `⏱ Duration: ${daysCount} Day(s)\n` +
      `👥 Passengers: ${passengerCount}\n` +
      `👤 Guest Name: ${userName || 'Valued Traveler'}\n` +
      `📞 Contact: ${userPhone || 'Included'}\n` +
      `✉️ Email: ${userEmail || 'Included'}\n` +
      `📝 Special Notes: ${specialRequest || 'Standard VIP setup'}`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const vObj = getSelectedVehicleObj();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-24 sm:pt-28 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
          Online Concierge Booking Flow
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#583714] leading-tight">
          Reserve Your Luxury Vehicle
        </h1>
        <p className="text-sm sm:text-base text-[#583714]/85 font-normal">
          Structured progressive booking disclosure for outstation, airport, and corporate travel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Main Booking Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFDF5] p-8 sm:p-10 rounded-3xl border border-[#E6D39D] shadow-xl text-left">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FFE897] border border-[#583714]/20 flex items-center justify-center text-[#583714]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#583714]">Booking Request Initiated</h2>
              <p className="text-xs sm:text-sm text-[#583714]/85 max-w-md">
                Your reservation details for <strong className="text-[#583714]">{selectedVehicle}</strong> have been logged. You can click below for instant WhatsApp concierge dispatch.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] text-[#583714] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 transition-opacity shadow-md border border-[#583714]/20"
                >
                  <MessageSquare className="w-4 h-4 text-[#583714]" />
                  Confirm via WhatsApp
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="flex-1 py-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#583714] font-bold text-xs uppercase tracking-wider hover:bg-[#FFE897]/50 transition-colors"
                >
                  New Booking
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Service Type */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#583714] font-bold block">
                  1. Select Travel Service
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Outstation Chauffeur',
                    'Airport VIP Transfer',
                    'Corporate Mobility',
                    'Wedding Fleet Convoy'
                  ].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setServiceType(st)}
                      className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${
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

              {/* Step 2: Vehicle Choice */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#583714] font-bold block">
                  2. Choose Vehicle Fleet
                </span>
                <div className="grid grid-cols-1 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {VEHICLES.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedVehicle === v.name
                          ? 'bg-[#FFE897] border-[#583714]'
                          : 'bg-[#F7EED3] border-[#E6D39D] hover:border-[#583714]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={v.image} alt={v.name} className="w-14 h-9 object-cover rounded-md" />
                        <div>
                          <h4 className="font-serif text-xs font-bold text-[#583714]">{v.name}</h4>
                          <span className="text-[10px] text-[#583714]/80 font-medium">{v.passengers} Seats • {v.outstationPerKm}</span>
                        </div>
                      </div>
                      <span className={`text-[11px] font-bold ${selectedVehicle === v.name ? 'text-[#583714]' : 'text-[#583714]/50'}`}>
                        {selectedVehicle === v.name ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Location & Dates */}
              <div className="space-y-4 pt-2 border-t border-[#E6D39D]">
                <span className="text-xs uppercase tracking-wider text-[#583714] font-bold block">
                  3. Journey Itinerary
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Pick-up Address / City</label>
                    <input
                      type="text"
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="e.g. New Delhi Hotel / Airport"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Destination Outstation City</label>
                    <input
                      type="text"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      placeholder="e.g. Jaipur / Agra / Local"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Travel Date</label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={daysCount}
                      onChange={(e) => setDaysCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Passengers</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Passenger Info */}
              <div className="space-y-4 pt-2 border-t border-[#E6D39D]">
                <span className="text-xs uppercase tracking-wider text-[#583714] font-bold block">
                  4. Lead Traveler Contact
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Lead Passenger Name</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Vikramaditya Roy"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#583714] mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#583714] mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#583714] mb-1">Special Preferences (Child seat, English driver, etc.)</label>
                  <textarea
                    rows={2}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Enter any VIP or outstation requests..."
                    className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFE897] via-[#E5C268] to-[#FFE897] hover:brightness-105 text-[#583714] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-gold-glow transition-all border border-[#583714]/20"
              >
                <span>Confirm & Generate Booking Quote</span>
                <ArrowRight className="w-4 h-4 text-[#583714]" />
              </button>

            </form>
          )}
        </div>

        {/* Selected Vehicle Summary Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#FFFDF5] border border-[#E6D39D] shadow-xl space-y-6 text-left">
            <h3 className="font-serif text-2xl font-bold text-[#583714]">Booking Summary</h3>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-[#E6D39D]">
              <img src={vObj.image} alt={vObj.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-[#583714] bg-[#FFE897] px-2.5 py-1 rounded-md border border-[#583714]/20 shadow-sm">
                {vObj.name}
              </span>
            </div>

            <div className="space-y-3 text-xs text-[#583714]/85 border-t border-[#E6D39D] pt-4">
              <div className="flex justify-between">
                <span>Selected Service:</span>
                <span className="text-[#583714] font-bold">{serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span>Outstation Per Km Rate:</span>
                <span className="text-[#583714] font-bold">{vObj.outstationPerKm}</span>
              </div>
              <div className="flex justify-between">
                <span>Local Daily Tariff:</span>
                <span className="text-[#583714] font-bold">{vObj.dailyRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Driver Allowance:</span>
                <span className="text-[#583714] font-bold">Included in Tariff</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-2 text-[11px] text-[#583714]/85">
              <div className="flex items-center gap-2 text-[#583714] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#583714]" />
                <span>Zero Hidden Fees Guarantee</span>
              </div>
              <p>
                Itemized invoice generated upon dispatch. 24/7 route concierge included.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};


