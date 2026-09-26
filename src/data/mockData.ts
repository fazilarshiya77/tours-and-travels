export interface RentalPackage {
  hours: number;
  km: number;
  price: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'mpv' | 'sedan';
  tagline: string;
  image: string;
  passengers: number;
  luggage: number;
  transmission: 'Chauffeur Driven' | 'Automatic' | 'Manual';
  fuelType: 'CNG' | 'Petrol' | 'Hybrid';
  localPerKm: string;
  outstationCngAc: string;
  outstationCngNonAc: string;
  outstationPetrolAc: string;
  dailyFullDayRate: string;
  outstationPerKm: string;
  dailyRate: string;
  hourlyRate: string;
  packages: RentalPackage[];
  extraKmRates: {
    extraKm: string;
    intercity: string;
    rental: string;
  };
  features: string[];
  popularFor: string;
  specs: {
    engine: string;
    seating: string;
    amenities: string[];
    safetyRating: string;
  };
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distance: string;
  image: string;
  route: string[];
  description: string;
  highlights: string[];
  recommendedVehicle: string;
  startingPrice: string;
  category: 'heritage' | 'himalaya' | 'spiritual' | 'coastal';
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  designation: string;
  location: string;
  comment: string;
  rating: number;
  tripType: string;
}

export const COMPANY_INFO = {
  name: "Taj Tour's & Travels",
  tagline: "Safe • Comfortable • Reliable",
  badge: "All India Service",
  subtitle: "Your Trusted Travel Partner",
  phoneDisplay: "+91 90086 30489",
  phoneRaw: "+919008630489",
  whatsappNumber: "919008630489",
  whatsappMessage: "Hello Taj Tour's & Travels, I would like to book a ride.",
  email: "tajtoursandtravels9008@gmail.com",
  address: "Taj Tour's & Travels, All India Mobility Service Desk, India",
  operatingHours: "24 Hours / 7 Days All India Dispatch",
  placeholders: {
    phone: "9008630489",
    whatsapp: "9008630489",
    address: "Taj Tour's & Travels Hub",
    email: "tajtoursandtravels9008@gmail.com"
  },
  additionalCharges: [
    { label: "Toll", status: "Extra" },
    { label: "State Tax", status: "Extra" },
    { label: "Pilot Allowance", status: "Extra" },
    { label: "Parking", status: "Extra" }
  ]
};

export const VEHICLES: Vehicle[] = [
  {
    id: "maruti-suzuki-dzire",
    name: "Maruti Suzuki Dzire",
    category: "sedan",
    tagline: "Comfortable Executive Sedan for City & Outstation Rides",
    image: "/dzire.png",
    passengers: 4,
    luggage: 3,
    transmission: "Chauffeur Driven",
    fuelType: "CNG",
    localPerKm: "₹ 25 / KM",
    outstationCngAc: "₹ 14 / KM",
    outstationCngNonAc: "₹ 13 / KM",
    outstationPetrolAc: "₹ 15 / KM",
    dailyFullDayRate: "₹ 4,000 / Day",
    outstationPerKm: "₹ 14 / KM (AC CNG)",
    dailyRate: "₹ 4,000 / Day",
    hourlyRate: "8h/80km: ₹2,400",
    packages: [
      { hours: 4, km: 40, price: "₹ 1,200" },
      { hours: 6, km: 60, price: "₹ 1,800" },
      { hours: 8, km: 80, price: "₹ 2,400" },
      { hours: 10, km: 100, price: "₹ 3,000" },
      { hours: 12, km: 120, price: "₹ 3,600" }
    ],
    extraKmRates: {
      extraKm: "₹ 14 / KM",
      intercity: "₹ 14 / KM",
      rental: "₹ 16 / KM"
    },
    features: [
      "Pristine Air Conditioned Cabin",
      "Rear AC Vents for Passenger Comfort",
      "Ergonomic Cushion Seats",
      "Ample Boot Luggage Capacity",
      "All India Permit",
      "Experienced Senior Driver"
    ],
    popularFor: "Outstation Trips, Airport Drops & City Commutes",
    specs: {
      engine: "1.2L DualJet CNG / Petrol",
      seating: "4 Passengers + 1 Driver",
      amenities: ["Air Conditioning", "Mobile Charging", "Sanitized Interior", "Experienced Driver"],
      safetyRating: "Global NCAP 5-Star Certified"
    }
  },
  {
    id: "maruti-suzuki-ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "mpv",
    tagline: "Spacious 6+1 Seater Family Lounger • Safe, Comfortable & Reliable",
    image: "/ertiga.jpeg",
    passengers: 6,
    luggage: 5,
    transmission: "Chauffeur Driven",
    fuelType: "CNG",
    localPerKm: "₹ 32 / KM",
    outstationCngAc: "₹ 17 / KM",
    outstationCngNonAc: "₹ 16 / KM",
    outstationPetrolAc: "₹ 18 / KM",
    dailyFullDayRate: "₹ 6,000 / Day (24 Hrs Full Ride)",
    outstationPerKm: "₹ 17 / KM (AC CNG)",
    dailyRate: "₹ 6,000 / Day",
    hourlyRate: "8h/80km: ₹3,000",
    packages: [
      { hours: 4, km: 40, price: "₹ 1,500" },
      { hours: 6, km: 60, price: "₹ 2,250" },
      { hours: 8, km: 80, price: "₹ 3,000" },
      { hours: 10, km: 100, price: "₹ 3,750" },
      { hours: 12, km: 120, price: "₹ 4,500" }
    ],
    extraKmRates: {
      extraKm: "₹ 18 / KM",
      intercity: "₹ 18 / KM",
      rental: "₹ 20 / KM"
    },
    features: [
      "Spacious 6+1 Seater Layout",
      "Dual Air Conditioning Vents across 3 Rows",
      "CNG & Petrol Outstation Ride Options",
      "Smooth Long-Highway Suspension",
      "All India Route Permit",
      "Experienced Senior Pilot (Driver)"
    ],
    popularFor: "All India Outstation Trips, Family Vacations & Group Rental Packages",
    specs: {
      engine: "1.5L Smart Hybrid / CNG Engine",
      seating: "6 Passengers + 1 Driver (Pilot)",
      amenities: ["Dual Roof AC Vents", "USB Mobile Fast Chargers", "Sanitized Hygienic Interior", "Professional Pilot"],
      safetyRating: "Global NCAP Certified Safety"
    }
  }
];

export const TOURS: TourPackage[] = [
  {
    id: "all-india-outstation",
    title: "All India Outstation Rides",
    subtitle: "Safe • Comfortable • Reliable",
    duration: "Flexible Packages",
    distance: "Intercity & Interstate",
    image: "/images/fleet_ertiga.jpg",
    route: ["Doorstep Pick-up", "Interstate Expressways", "Custom Stopovers", "Destination Drop"],
    description: "Book outstation rides across India in Maruti Ertiga (6+1 Seater) or Maruti Dzire (Sedan). CNG & Petrol options with transparent per-KM pricing.",
    highlights: [
      "Outstation CNG Rides starting at ₹16/KM (Non AC) & ₹17/KM (AC)",
      "Outstation Petrol Rides starting at ₹18/KM",
      "Experienced pilots for long-distance highway travel",
      "All India Permit enabled vehicles"
    ],
    recommendedVehicle: "Maruti Suzuki Ertiga 6+1 Seater or Dzire",
    startingPrice: "CNG from ₹ 16 / KM",
    category: "heritage"
  },
  {
    id: "local-hourly-package",
    title: "Local Hourly Rental Packages",
    subtitle: "4 Hrs to 24 Hrs Full Booking",
    duration: "4h to 24h",
    distance: "40 Km to 120+ Km",
    image: "/images/fleet_dzire.jpg",
    route: ["City Pick-up", "Shopping & Business Stops", "Sightseeing Circuit", "Return Drop"],
    description: "Flexible local hourly packages ranging from 4 Hrs / 40 KM (₹1,500) to 12 Hrs / 120 KM (₹4,500) and 24 Hrs Full Day + Night (₹6,000).",
    highlights: [
      "4 Hrs / 40 KM: ₹1,500 Rs",
      "8 Hrs / 80 KM: ₹3,000 Rs",
      "12 Hrs / 120 KM: ₹4,500 Rs",
      "24 Hrs Full Day + Night: ₹6,000 Rs / Day"
    ],
    recommendedVehicle: "Maruti Suzuki Ertiga or Dzire",
    startingPrice: "Packages from ₹ 1,500",
    category: "coastal"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "outstation-ride",
    title: "Outstation Rides (CNG & Petrol)",
    subtitle: "Safe • Comfortable • Reliable All India Service",
    description: "Intercity and interstate rides with transparent per-KM rates. CNG AC rides at ₹17/KM, CNG Non-AC at ₹16/KM, and Petrol rides at ₹18/KM.",
    icon: "Navigation",
    features: [
      "CNG AC Ride: ₹17 / KM | CNG Non-AC: ₹16 / KM",
      "Petrol Ride: ₹18 / KM (AC & Non-AC)",
      "Extra KM: XL Extra KM ₹18/KM, XL Intercity ₹18/KM, XL Rental ₹20/KM",
      "All India Permit with experienced senior pilots"
    ],
    image: "/images/fleet_ertiga.jpg",
    ctaText: "Book Outstation Ride"
  },
  {
    id: "local-trip-packages",
    title: "Local Trip Packages & Hourly Rentals",
    subtitle: "Tailored Packages for City Travel",
    description: "Hassle-free local travel packages with fixed kilometer limits: 4 hrs/40 km (₹1,500), 8 hrs/80 km (₹3,000), 12 hrs/120 km (₹4,500), and 24 hrs Full Booking (₹6,000).",
    icon: "Clock",
    features: [
      "4 Hrs / 40 KM : ₹1,500 Rs",
      "6 Hrs / 60 KM : ₹2,250 Rs",
      "8 Hrs / 80 KM : ₹3,000 Rs",
      "10 Hrs / 100 KM : ₹3,750 Rs",
      "12 Hrs / 120 KM : ₹4,500 Rs",
      "Full 24 Hrs (Day + Night) : ₹6,000 Rs"
    ],
    image: "/images/fleet_dzire.jpg",
    ctaText: "Select Rental Package"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    clientName: "Suresh Kumar",
    designation: "Outstation Traveler",
    location: "Bengaluru",
    comment: "Booked Maruti Ertiga for a 3-day outstation family trip. Very clean vehicle, transparent billing at ₹17/km AC CNG rate, and pilot was polite and punctual.",
    rating: 5,
    tripType: "Outstation Trip - Maruti Ertiga"
  },
  {
    id: "2",
    clientName: "Priya & Family",
    designation: "Local Hourly Booking",
    location: "Bengaluru",
    comment: "Took the 8 Hrs / 80 KM package for ₹3,000 Rs. Extremely comfortable 6+1 seater Ertiga. Highly recommended Taj Tour's & Travels!",
    rating: 5,
    tripType: "8 Hrs / 80 KM Rental Package"
  }
];
