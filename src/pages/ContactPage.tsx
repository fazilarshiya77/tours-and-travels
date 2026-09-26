import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

import { createInquiry } from '../services/dataService';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real visitors never fill this
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website.trim() !== '') {
      // Likely a bot. Pretend success without actually submitting.
      setSubmitted(true);
      return;
    }

    await createInquiry({
      customerName: name,
      phone: phone ? `+91 ${phone}` : '',
      email,
      message,
      service: 'Contact Request',
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-24 sm:pt-28 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#583714] font-bold">
          24/7 Concierge Desk
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#583714] leading-tight">
          Connect with Taj Travel Desk
        </h1>
        <p className="text-sm sm:text-base text-[#583714]/85 font-normal">
          Have a custom multi-city itinerary, wedding convoy request, or urgent airport dispatch inquiry? Our team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info Badges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#FFFDF5] border border-[#E6D39D] shadow-xl space-y-6 text-left">
            <h2 className="font-serif text-2xl font-bold text-[#583714]">Direct Channels</h2>

            <div className="space-y-4 text-xs text-[#583714]/85">
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <Phone className="w-5 h-5 text-[#583714] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#583714] font-bold block text-sm">24/7 Phone Dispatch</span>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-[#583714] font-bold hover:underline">
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                  <p className="text-[10px] text-[#583714]/80 mt-1">Instant assistance for urgent bookings</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#583714] font-bold block text-sm">WhatsApp Mobility Desk</span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#25D366] font-bold hover:underline"
                  >
                    Chat on WhatsApp ({COMPANY_INFO.placeholders.whatsapp})
                  </a>
                  <p className="text-[10px] text-[#583714]/80 mt-1">Send trip details for instant quotes</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <Mail className="w-5 h-5 text-[#583714] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#583714] font-bold block text-sm">Email Concierge</span>
                  <span className="text-[#583714] font-mono font-bold">{COMPANY_INFO.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <MapPin className="w-5 h-5 text-[#583714] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#583714] font-bold block text-sm">Headquarters & Mobility Hub</span>
                  <span className="text-[#583714] font-bold">{COMPANY_INFO.address}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Garage & Dispatch Depot Card */}
          <div className="p-6 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-md flex flex-col items-center text-center space-y-2">
            <MapPin className="w-8 h-8 text-[#583714]" />
            <h4 className="font-serif text-base font-bold text-[#583714]">Central Garage & Dispatch Depot</h4>
            <p className="text-xs text-[#583714]/85">{COMPANY_INFO.address}</p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFDF5] p-8 sm:p-10 rounded-3xl border border-[#E6D39D] shadow-xl text-left">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#583714]" />
              <h3 className="font-serif text-3xl font-bold text-[#583714]">Message Sent</h3>
              <p className="text-xs sm:text-sm text-[#583714]/85 max-w-md">
                Thank you for contacting Taj Tours & Travels. A senior mobility officer will respond within 30 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-xs font-bold text-[#583714] hover:bg-[#FFE897]/50 transition-all"
              >
                Send Another Inquiry
              </button>
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

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#583714]">Send a Bespoke Journey Request</h3>
                <p className="text-xs text-[#583714]/80 mt-1">Fill out your travel specifications for an itemized quotation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#583714] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    placeholder="e.g. Vikramaditya Roy"
                    className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#583714] mb-1">Phone / WhatsApp Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-[#583714]/70 z-10">+91</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      title="Enter a 10-digit mobile number"
                      className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl pl-9 pr-3 py-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#583714] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  title="Enter a valid email address (e.g. name@company.com)"
                  className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#583714] mb-1">Travel Specifications / Message (Optional)</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.replace(/[^a-zA-Z0-9\s.,%\-/!?()'&:]/g, ''))}
                  placeholder="Describe pick-up city, destination outstation route, vehicle preferences, or corporate requirements..."
                  className="w-full bg-[#F7EED3] border border-[#E6D39D] rounded-xl p-3 text-xs text-[#583714] placeholder-[#583714]/50 focus:outline-none focus:border-[#583714]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#583714] hover:bg-[#42280C] text-[#FFE897] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all border border-[#FFE897]/40 shimmer-btn"
              >
                <Send className="w-4 h-4 text-[#FFE897]" />
                Submit Inquiry to Travel Desk
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};


