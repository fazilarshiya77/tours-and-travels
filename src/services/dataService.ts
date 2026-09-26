/**
 * TAJ TOURS & TRAVELS — CENTRALIZED DATA ABSTRACTION LAYER
 * 
 * Conceptual Architecture:
 * PUBLIC WEBSITE / ADMIN PORTAL -> DATA SERVICE ABSTRACTION -> LOCALSTORAGE (MOCK) / SUPABASE (LATER)
 * 
 * This service layer isolates database operations from UI components.
 * When Supabase is connected later, replace local storage calls in these async functions
 * with Supabase client queries (e.g. supabase.from('vehicles').select('*')).
 */

import { VEHICLES as INITIAL_VEHICLES, TOURS as INITIAL_TOURS, SERVICES as INITIAL_SERVICES, COMPANY_INFO as INITIAL_COMPANY_INFO, type Vehicle, type TourPackage, type ServiceItem } from '../data/mockData';

export { INITIAL_COMPANY_INFO as COMPANY_INFO };

export interface ExtendedVehicle extends Vehicle {
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedServiceItem extends ServiceItem {
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedTourPackage extends TourPackage {
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Converted' | 'Closed';

export interface Inquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  vehicle?: string;
  travelDate: string;
  pickup: string;
  destination: string;
  passengers: number | string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    mediaUrl: string;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappNumber: string;
    email: string;
    address: string;
    operatingHours: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  about: {
    title: string;
    shortDescription: string;
    fullPurpose: string;
  };
  cta: {
    badge: string;
    heading: string;
    description: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Initial Inquiries Mock Dataset for Visual Verification
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-101",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    service: "Outstation Trip",
    vehicle: "Maruti Suzuki Ertiga",
    travelDate: "2026-09-28",
    pickup: "Bengaluru Airport (BLR)",
    destination: "Mysore City Center",
    passengers: 5,
    message: "Family vacation to Mysore & Coorg. Need luggage space for 4 large bags.",
    status: "New",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "inq-102",
    customerName: "Aisha Verma",
    phone: "+91 91234 56789",
    email: "aisha.verma@example.com",
    service: "Airport Transfer",
    vehicle: "Maruti Suzuki Dzire",
    travelDate: "2026-09-27",
    pickup: "Indiranagar, Bengaluru",
    destination: "Kempegowda International Airport",
    passengers: 2,
    message: "Early morning flight drop at 4:30 AM. Punctuality is priority.",
    status: "Contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "inq-103",
    customerName: "Vikram Malhotra",
    phone: "+91 99887 76655",
    email: "vikram.m@corporatedesk.com",
    service: "Local Hourly Rental",
    vehicle: "Maruti Suzuki Ertiga",
    travelDate: "2026-09-29",
    pickup: "MG Road, Bengaluru",
    destination: "Electronic City & Whitefield Circuit",
    passengers: 4,
    message: "Full day 12h/120km corporate client visit circuit.",
    status: "Converted",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: "inq-104",
    customerName: "Kavita Rao",
    phone: "+91 94455 66778",
    email: "kavita.rao@example.com",
    service: "Outstation Trip",
    vehicle: "Maruti Suzuki Dzire",
    travelDate: "2026-10-02",
    pickup: "Jayanagar 4th Block",
    destination: "Ooty Mountain Resort",
    passengers: 3,
    message: "Required driver fluent in English and Tamil for weekend trip.",
    status: "Closed",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  }
];

const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  hero: {
    title: "Travel Across India.",
    subtitle: "Safe • Comfortable • Reliable",
    description: "Book Maruti Suzuki Ertiga (6+1 Seater MPV) and Maruti Suzuki Dzire (Executive Sedan) for outstation rides, local hourly packages, and airport transfers.",
    mediaUrl: "/home-hero.mp4",
  },
  contact: {
    phoneDisplay: INITIAL_COMPANY_INFO.phoneDisplay,
    phoneRaw: INITIAL_COMPANY_INFO.phoneRaw,
    whatsappNumber: INITIAL_COMPANY_INFO.whatsappNumber,
    email: INITIAL_COMPANY_INFO.email,
    address: INITIAL_COMPANY_INFO.address,
    operatingHours: INITIAL_COMPANY_INFO.operatingHours,
  },
  social: {
    instagram: "https://instagram.com/tajtoursandtravels",
    facebook: "https://facebook.com/tajtoursandtravels",
    youtube: "https://youtube.com/tajtoursandtravels",
  },
  about: {
    title: "About Taj Tours & Travels",
    shortDescription: "Founded on the principles of royal Indian hospitality, safety, and modern automotive excellence.",
    fullPurpose: "Taj Tours & Travels is built around a singular philosophy: travel should empower, relax, and inspire. Unlike standard car rental agencies, we treat mobility as a concierge hospitality service.",
  },
  cta: {
    badge: "All India Mobility Dispatch",
    heading: "Ready to Book Your Ride Now?",
    description: `Call our travel desk at ${INITIAL_COMPANY_INFO.phoneDisplay} for instant ride allocation, outstation quotes, and rental package bookings.`,
  }
};

// LocalStorage Keys
const KEYS = {
  VEHICLES: 'taj_crm_vehicles_v1',
  SERVICES: 'taj_crm_services_v1',
  TOURS: 'taj_crm_tours_v1',
  INQUIRIES: 'taj_crm_inquiries_v1',
  CONTENT: 'taj_crm_content_v1',
  SETTINGS: 'taj_crm_settings_v1',
  AUTH: 'taj_crm_auth_v1',
};

// Event Subscription Listener Engine for Real-Time UI Re-renders
type Listener = () => void;
const listeners = new Set<Listener>();

function notifySubscribers() {
  listeners.forEach(cb => cb());
}

export function subscribeToStore(callback: Listener): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// Initializer Helper
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    notifySubscribers();
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Default Seed Vehicle Adapter
const DEFAULT_EXTENDED_VEHICLES: ExtendedVehicle[] = INITIAL_VEHICLES.map(v => ({
  ...v,
  isActive: true,
  isFeatured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const DEFAULT_EXTENDED_SERVICES: ExtendedServiceItem[] = INITIAL_SERVICES.map(s => ({
  ...s,
  isActive: true,
  isFeatured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const DEFAULT_EXTENDED_TOURS: ExtendedTourPackage[] = INITIAL_TOURS.map(t => ({
  ...t,
  isActive: true,
  isFeatured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// ==========================================
// 1. VEHICLES SERVICE API
// ==========================================

export async function getVehicles(onlyActive = false): Promise<ExtendedVehicle[]> {
  const list = getStored<ExtendedVehicle[]>(KEYS.VEHICLES, DEFAULT_EXTENDED_VEHICLES);
  if (onlyActive) {
    return list.filter(v => v.isActive);
  }
  return list;
}

export async function createVehicle(data: Partial<ExtendedVehicle>): Promise<ExtendedVehicle> {
  const list = await getVehicles(false);
  const newVehicle: ExtendedVehicle = {
    id: `v-${Date.now()}`,
    name: data.name || 'New Fleet Vehicle',
    category: data.category || 'sedan',
    tagline: data.tagline || 'Comfortable Chauffeur Ride',
    image: data.image || '/images/hero_luxury_car.jpg',
    passengers: data.passengers || 4,
    luggage: data.luggage || 3,
    transmission: data.transmission || 'Chauffeur Driven',
    fuelType: data.fuelType || 'CNG',
    localPerKm: data.localPerKm || '₹ 25 / KM',
    outstationCngAc: data.outstationCngAc || '₹ 15 / KM',
    outstationCngNonAc: data.outstationCngNonAc || '₹ 14 / KM',
    outstationPetrolAc: data.outstationPetrolAc || '₹ 16 / KM',
    dailyFullDayRate: data.dailyFullDayRate || '₹ 4,500 / Day',
    outstationPerKm: data.outstationPerKm || '₹ 15 / KM',
    dailyRate: data.dailyRate || '₹ 4,500 / Day',
    hourlyRate: data.hourlyRate || '8h/80km: ₹2,500',
    packages: data.packages || [
      { hours: 4, km: 40, price: '₹ 1,500' },
      { hours: 8, km: 80, price: '₹ 2,500' },
    ],
    extraKmRates: data.extraKmRates || {
      extraKm: '₹ 15 / KM',
      intercity: '₹ 15 / KM',
      rental: '₹ 18 / KM',
    },
    features: data.features || ['Air Conditioned', 'Clean Sanitized Cabin', 'Experienced Driver'],
    popularFor: data.popularFor || 'Outstation Trips & City Travel',
    specs: data.specs || {
      engine: '1.5L Smart Hybrid',
      seating: `${data.passengers || 4} Passengers + 1 Driver`,
      amenities: ['Air Conditioning', 'Mobile Charging', 'Experienced Driver'],
      safetyRating: 'NCAP Certified',
    },
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newVehicle, ...list];
  setStored(KEYS.VEHICLES, updated);
  return newVehicle;
}

export async function updateVehicle(id: string, updates: Partial<ExtendedVehicle>): Promise<ExtendedVehicle> {
  const list = await getVehicles(false);
  const index = list.findIndex(v => v.id === id);
  if (index === -1) throw new Error("Vehicle not found");

  const existing = list[index];
  const updatedItem: ExtendedVehicle = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updatedItem;
  setStored(KEYS.VEHICLES, list);
  return updatedItem;
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const list = await getVehicles(false);
  const filtered = list.filter(v => v.id !== id);
  setStored(KEYS.VEHICLES, filtered);
  return true;
}

// ==========================================
// 2. SERVICES SERVICE API
// ==========================================

export async function getServices(onlyActive = false): Promise<ExtendedServiceItem[]> {
  const list = getStored<ExtendedServiceItem[]>(KEYS.SERVICES, DEFAULT_EXTENDED_SERVICES);
  if (onlyActive) {
    return list.filter(s => s.isActive);
  }
  return list;
}

export async function createService(data: Partial<ExtendedServiceItem>): Promise<ExtendedServiceItem> {
  const list = await getServices(false);
  const newService: ExtendedServiceItem = {
    id: `srv-${Date.now()}`,
    title: data.title || 'New Mobility Service',
    subtitle: data.subtitle || 'Professional Chauffeur Solution',
    description: data.description || 'Reliable transportation across India.',
    icon: data.icon || 'Navigation',
    features: data.features || ['Punctual Dispatch', 'Sanitized Cabins', 'Transparent Billing'],
    image: data.image || '/images/chauffeur_service.jpg',
    ctaText: data.ctaText || 'Book Service Now',
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newService, ...list];
  setStored(KEYS.SERVICES, updated);
  return newService;
}

export async function updateService(id: string, updates: Partial<ExtendedServiceItem>): Promise<ExtendedServiceItem> {
  const list = await getServices(false);
  const index = list.findIndex(s => s.id === id);
  if (index === -1) throw new Error("Service not found");

  const existing = list[index];
  const updatedItem: ExtendedServiceItem = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updatedItem;
  setStored(KEYS.SERVICES, list);
  return updatedItem;
}

export async function deleteService(id: string): Promise<boolean> {
  const list = await getServices(false);
  const filtered = list.filter(s => s.id !== id);
  setStored(KEYS.SERVICES, filtered);
  return true;
}

// ==========================================
// 3. TOURS SERVICE API
// ==========================================

export async function getTours(onlyActive = false): Promise<ExtendedTourPackage[]> {
  const list = getStored<ExtendedTourPackage[]>(KEYS.TOURS, DEFAULT_EXTENDED_TOURS);
  if (onlyActive) {
    return list.filter(t => t.isActive);
  }
  return list;
}

export async function createTour(data: Partial<ExtendedTourPackage>): Promise<ExtendedTourPackage> {
  const list = await getTours(false);
  const newTour: ExtendedTourPackage = {
    id: `tour-${Date.now()}`,
    title: data.title || 'New Travel Circuit',
    subtitle: data.subtitle || 'All India Tour Package',
    duration: data.duration || 'Flexible Days',
    distance: data.distance || 'Interstate Highway',
    image: data.image || '/images/hero_luxury_car.jpg',
    route: data.route || ['Pickup', 'Sightseeing', 'Drop'],
    description: data.description || 'Guided chauffeur tour package with customizable stops.',
    highlights: data.highlights || ['Verified Pilots', 'Flexible Timings', 'Toll & State Tax Transparency'],
    recommendedVehicle: data.recommendedVehicle || 'Maruti Suzuki Ertiga 6+1 Seater',
    startingPrice: data.startingPrice || '₹ 17 / KM',
    category: data.category || 'heritage',
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newTour, ...list];
  setStored(KEYS.TOURS, updated);
  return newTour;
}

export async function updateTour(id: string, updates: Partial<ExtendedTourPackage>): Promise<ExtendedTourPackage> {
  const list = await getTours(false);
  const index = list.findIndex(t => t.id === id);
  if (index === -1) throw new Error("Tour package not found");

  const existing = list[index];
  const updatedItem: ExtendedTourPackage = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updatedItem;
  setStored(KEYS.TOURS, list);
  return updatedItem;
}

export async function deleteTour(id: string): Promise<boolean> {
  const list = await getTours(false);
  const filtered = list.filter(t => t.id !== id);
  setStored(KEYS.TOURS, filtered);
  return true;
}

// ==========================================
// 4. INQUIRIES SERVICE API (WEBSITE ↔ CRM)
// ==========================================

export async function getInquiries(): Promise<Inquiry[]> {
  return getStored<Inquiry[]>(KEYS.INQUIRIES, INITIAL_INQUIRIES);
}

export async function createInquiry(formData: {
  customerName: string;
  phone: string;
  email?: string;
  service?: string;
  vehicle?: string;
  travelDate?: string;
  pickup?: string;
  destination?: string;
  passengers?: number | string;
  message?: string;
}): Promise<Inquiry> {
  const list = await getInquiries();
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    customerName: formData.customerName || 'Valued Guest',
    phone: formData.phone || '+91 90086 30489',
    email: formData.email || 'customer@example.com',
    service: formData.service || 'Outstation Trip',
    vehicle: formData.vehicle || 'Maruti Suzuki Ertiga',
    travelDate: formData.travelDate || new Date().toISOString().split('T')[0],
    pickup: formData.pickup || 'Bengaluru City',
    destination: formData.destination || 'Outstation',
    passengers: formData.passengers || 4,
    message: formData.message || 'Ride inquiry received from public website.',
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newInquiry, ...list];
  setStored(KEYS.INQUIRIES, updated);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
  const list = await getInquiries();
  const index = list.findIndex(i => i.id === id);
  if (index === -1) throw new Error("Inquiry not found");

  const existing = list[index];
  const updatedItem: Inquiry = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updatedItem;
  setStored(KEYS.INQUIRIES, list);
  return updatedItem;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const list = await getInquiries();
  const filtered = list.filter(i => i.id !== id);
  setStored(KEYS.INQUIRIES, filtered);
  return true;
}

// ==========================================
// 5. WEBSITE CONTENT API
// ==========================================

export async function getWebsiteContent(): Promise<WebsiteContent> {
  return getStored<WebsiteContent>(KEYS.CONTENT, INITIAL_WEBSITE_CONTENT);
}

export async function updateWebsiteContent(updates: Partial<WebsiteContent>): Promise<WebsiteContent> {
  const current = await getWebsiteContent();
  const updated: WebsiteContent = {
    ...current,
    ...updates,
    hero: { ...current.hero, ...(updates.hero || {}) },
    contact: { ...current.contact, ...(updates.contact || {}) },
    social: { ...current.social, ...(updates.social || {}) },
    about: { ...current.about, ...(updates.about || {}) },
    cta: { ...current.cta, ...(updates.cta || {}) },
  };

  setStored(KEYS.CONTENT, updated);
  return updated;
}

// ==========================================
// 6. SETTINGS & AUTHENTICATION API
// ==========================================

export async function getAdminProfile(): Promise<AdminUser> {
  return getStored<AdminUser>(KEYS.SETTINGS, {
    id: "admin-1",
    name: "Taj Business Owner",
    email: "admin@tajtoursandtravels.com",
    role: "Super Admin",
  });
}

export async function updateAdminProfile(updates: Partial<AdminUser>): Promise<AdminUser> {
  const current = await getAdminProfile();
  const updated = { ...current, ...updates };
  setStored(KEYS.SETTINGS, updated);
  return updated;
}

export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(KEYS.AUTH) === 'true';
  } catch (e) {
    return false;
  }
}

export function setAuthenticated(status: boolean): void {
  try {
    localStorage.setItem(KEYS.AUTH, status ? 'true' : 'false');
    notifySubscribers();
  } catch (e) {
    console.error("Auth state storage error:", e);
  }
}
