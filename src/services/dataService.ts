/**
 * TAJ TOURS & TRAVELS — CENTRALIZED DATA ABSTRACTION LAYER
 *
 * Conceptual Architecture:
 * PUBLIC WEBSITE / ADMIN PORTAL -> DATA SERVICE ABSTRACTION -> SUPABASE (Postgres + Auth)
 *
 * This service layer isolates database operations from UI components.
 */

import { supabase } from '../lib/supabaseClient';
import { COMPANY_INFO as INITIAL_COMPANY_INFO, type Vehicle, type TourPackage, type ServiceItem } from '../data/mockData';

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

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

// ==========================================
// FLEET IMAGE UPLOADS (Supabase Storage)
// ==========================================

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

export async function uploadFleetImage(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Please upload a JPG, PNG, WEBP, or GIF image.');
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image must be smaller than 5MB.');
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from('fleet-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  throwIfError(error);

  const { data } = supabase.storage.from('fleet-images').getPublicUrl(path);
  return data.publicUrl;
}

// ==========================================
// Row <-> App-model mappers
// ==========================================

function vehicleFromRow(row: any): ExtendedVehicle {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    image: row.image,
    passengers: row.passengers,
    luggage: row.luggage,
    transmission: row.transmission,
    fuelType: row.fuel_type,
    localPerKm: row.local_per_km,
    outstationCngAc: row.outstation_cng_ac,
    outstationCngNonAc: row.outstation_cng_non_ac,
    outstationPetrolAc: row.outstation_petrol_ac,
    dailyFullDayRate: row.daily_full_day_rate,
    outstationPerKm: row.outstation_per_km,
    dailyRate: row.daily_rate,
    hourlyRate: row.hourly_rate,
    packages: row.packages ?? [],
    extraKmRates: row.extra_km_rates ?? {},
    features: row.features ?? [],
    popularFor: row.popular_for,
    specs: row.specs ?? {},
    isActive: row.is_active,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function vehicleToRow(data: Partial<ExtendedVehicle>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (data.id !== undefined) row.id = data.id;
  if (data.name !== undefined) row.name = data.name;
  if (data.category !== undefined) row.category = data.category;
  if (data.tagline !== undefined) row.tagline = data.tagline;
  if (data.image !== undefined) row.image = data.image;
  if (data.passengers !== undefined) row.passengers = data.passengers;
  if (data.luggage !== undefined) row.luggage = data.luggage;
  if (data.transmission !== undefined) row.transmission = data.transmission;
  if (data.fuelType !== undefined) row.fuel_type = data.fuelType;
  if (data.localPerKm !== undefined) row.local_per_km = data.localPerKm;
  if (data.outstationCngAc !== undefined) row.outstation_cng_ac = data.outstationCngAc;
  if (data.outstationCngNonAc !== undefined) row.outstation_cng_non_ac = data.outstationCngNonAc;
  if (data.outstationPetrolAc !== undefined) row.outstation_petrol_ac = data.outstationPetrolAc;
  if (data.dailyFullDayRate !== undefined) row.daily_full_day_rate = data.dailyFullDayRate;
  if (data.outstationPerKm !== undefined) row.outstation_per_km = data.outstationPerKm;
  if (data.dailyRate !== undefined) row.daily_rate = data.dailyRate;
  if (data.hourlyRate !== undefined) row.hourly_rate = data.hourlyRate;
  if (data.packages !== undefined) row.packages = data.packages;
  if (data.extraKmRates !== undefined) row.extra_km_rates = data.extraKmRates;
  if (data.features !== undefined) row.features = data.features;
  if (data.popularFor !== undefined) row.popular_for = data.popularFor;
  if (data.specs !== undefined) row.specs = data.specs;
  if (data.isActive !== undefined) row.is_active = data.isActive;
  if (data.isFeatured !== undefined) row.is_featured = data.isFeatured;
  return row;
}

function serviceFromRow(row: any): ExtendedServiceItem {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    icon: row.icon,
    features: row.features ?? [],
    image: row.image,
    ctaText: row.cta_text,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function serviceToRow(data: Partial<ExtendedServiceItem>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (data.id !== undefined) row.id = data.id;
  if (data.title !== undefined) row.title = data.title;
  if (data.subtitle !== undefined) row.subtitle = data.subtitle;
  if (data.description !== undefined) row.description = data.description;
  if (data.icon !== undefined) row.icon = data.icon;
  if (data.features !== undefined) row.features = data.features;
  if (data.image !== undefined) row.image = data.image;
  if (data.ctaText !== undefined) row.cta_text = data.ctaText;
  if (data.isActive !== undefined) row.is_active = data.isActive;
  if (data.isFeatured !== undefined) row.is_featured = data.isFeatured;
  return row;
}

function tourFromRow(row: any): ExtendedTourPackage {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    duration: row.duration,
    distance: row.distance,
    image: row.image,
    route: row.route ?? [],
    description: row.description,
    highlights: row.highlights ?? [],
    recommendedVehicle: row.recommended_vehicle,
    startingPrice: row.starting_price,
    category: row.category,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function tourToRow(data: Partial<ExtendedTourPackage>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (data.id !== undefined) row.id = data.id;
  if (data.title !== undefined) row.title = data.title;
  if (data.subtitle !== undefined) row.subtitle = data.subtitle;
  if (data.duration !== undefined) row.duration = data.duration;
  if (data.distance !== undefined) row.distance = data.distance;
  if (data.image !== undefined) row.image = data.image;
  if (data.route !== undefined) row.route = data.route;
  if (data.description !== undefined) row.description = data.description;
  if (data.highlights !== undefined) row.highlights = data.highlights;
  if (data.recommendedVehicle !== undefined) row.recommended_vehicle = data.recommendedVehicle;
  if (data.startingPrice !== undefined) row.starting_price = data.startingPrice;
  if (data.category !== undefined) row.category = data.category;
  if (data.isActive !== undefined) row.is_active = data.isActive;
  if (data.isFeatured !== undefined) row.is_featured = data.isFeatured;
  return row;
}

function inquiryFromRow(row: any): Inquiry {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    vehicle: row.vehicle ?? undefined,
    travelDate: row.travel_date,
    pickup: row.pickup,
    destination: row.destination,
    passengers: row.passengers,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function contentFromRow(row: any): WebsiteContent {
  return {
    hero: row.hero,
    contact: row.contact,
    social: row.social,
    about: row.about,
    cta: row.cta,
  };
}

// ==========================================
// 1. VEHICLES SERVICE API
// ==========================================

export async function getVehicles(onlyActive = false): Promise<ExtendedVehicle[]> {
  let query = supabase.from('vehicles').select('*').order('created_at', { ascending: false });
  if (onlyActive) query = query.eq('is_active', true);
  const { data, error } = await query;
  throwIfError(error);
  return (data ?? []).map(vehicleFromRow);
}

export async function createVehicle(data: Partial<ExtendedVehicle>): Promise<ExtendedVehicle> {
  const row = {
    id: `v-${Date.now()}`,
    name: data.name || 'New Fleet Vehicle',
    category: data.category || 'sedan',
    tagline: data.tagline || 'Comfortable Chauffeur Ride',
    image: data.image || '/images/hero_luxury_car.jpg',
    passengers: data.passengers || 4,
    luggage: data.luggage || 3,
    transmission: data.transmission || 'Chauffeur Driven',
    fuel_type: data.fuelType || 'CNG',
    local_per_km: data.localPerKm || '₹ 25 / KM',
    outstation_cng_ac: data.outstationCngAc || '₹ 15 / KM',
    outstation_cng_non_ac: data.outstationCngNonAc || '₹ 14 / KM',
    outstation_petrol_ac: data.outstationPetrolAc || '₹ 16 / KM',
    daily_full_day_rate: data.dailyFullDayRate || '₹ 4,500 / Day',
    outstation_per_km: data.outstationPerKm || '₹ 15 / KM',
    daily_rate: data.dailyRate || '₹ 4,500 / Day',
    hourly_rate: data.hourlyRate || '8h/80km: ₹2,500',
    packages: data.packages || [
      { hours: 4, km: 40, price: '₹ 1,500' },
      { hours: 8, km: 80, price: '₹ 2,500' },
    ],
    extra_km_rates: data.extraKmRates || {
      extraKm: '₹ 15 / KM',
      intercity: '₹ 15 / KM',
      rental: '₹ 18 / KM',
    },
    features: data.features || ['Air Conditioned', 'Clean Sanitized Cabin', 'Experienced Driver'],
    popular_for: data.popularFor || 'Outstation Trips & City Travel',
    specs: data.specs || {
      engine: '1.5L Smart Hybrid',
      seating: `${data.passengers || 4} Passengers + 1 Driver`,
      amenities: ['Air Conditioning', 'Mobile Charging', 'Experienced Driver'],
      safetyRating: 'NCAP Certified',
    },
    is_active: data.isActive ?? true,
    is_featured: data.isFeatured ?? true,
  };

  const { data: inserted, error } = await supabase.from('vehicles').insert(row).select().single();
  throwIfError(error);
  notifySubscribers();
  return vehicleFromRow(inserted);
}

export async function updateVehicle(id: string, updates: Partial<ExtendedVehicle>): Promise<ExtendedVehicle> {
  const { data: updated, error } = await supabase
    .from('vehicles')
    .update(vehicleToRow(updates))
    .eq('id', id)
    .select()
    .single();
  throwIfError(error);
  notifySubscribers();
  return vehicleFromRow(updated);
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const { error } = await supabase.from('vehicles').delete().eq('id', id);
  throwIfError(error);
  notifySubscribers();
  return true;
}

// ==========================================
// 2. SERVICES SERVICE API
// ==========================================

export async function getServices(onlyActive = false): Promise<ExtendedServiceItem[]> {
  let query = supabase.from('services').select('*').order('created_at', { ascending: false });
  if (onlyActive) query = query.eq('is_active', true);
  const { data, error } = await query;
  throwIfError(error);
  return (data ?? []).map(serviceFromRow);
}

export async function createService(data: Partial<ExtendedServiceItem>): Promise<ExtendedServiceItem> {
  const row = {
    id: `srv-${Date.now()}`,
    title: data.title || 'New Mobility Service',
    subtitle: data.subtitle || 'Professional Chauffeur Solution',
    description: data.description || 'Reliable transportation across India.',
    icon: data.icon || 'Navigation',
    features: data.features || ['Punctual Dispatch', 'Sanitized Cabins', 'Transparent Billing'],
    image: data.image || '/images/chauffeur_service.jpg',
    cta_text: data.ctaText || 'Book Service Now',
    is_active: data.isActive ?? true,
    is_featured: data.isFeatured ?? true,
  };

  const { data: inserted, error } = await supabase.from('services').insert(row).select().single();
  throwIfError(error);
  notifySubscribers();
  return serviceFromRow(inserted);
}

export async function updateService(id: string, updates: Partial<ExtendedServiceItem>): Promise<ExtendedServiceItem> {
  const { data: updated, error } = await supabase
    .from('services')
    .update(serviceToRow(updates))
    .eq('id', id)
    .select()
    .single();
  throwIfError(error);
  notifySubscribers();
  return serviceFromRow(updated);
}

export async function deleteService(id: string): Promise<boolean> {
  const { error } = await supabase.from('services').delete().eq('id', id);
  throwIfError(error);
  notifySubscribers();
  return true;
}

// ==========================================
// 3. TOURS SERVICE API
// ==========================================

export async function getTours(onlyActive = false): Promise<ExtendedTourPackage[]> {
  let query = supabase.from('tours').select('*').order('created_at', { ascending: false });
  if (onlyActive) query = query.eq('is_active', true);
  const { data, error } = await query;
  throwIfError(error);
  return (data ?? []).map(tourFromRow);
}

export async function createTour(data: Partial<ExtendedTourPackage>): Promise<ExtendedTourPackage> {
  const row = {
    id: `tour-${Date.now()}`,
    title: data.title || 'New Travel Circuit',
    subtitle: data.subtitle || 'All India Tour Package',
    duration: data.duration || 'Flexible Days',
    distance: data.distance || 'Interstate Highway',
    image: data.image || '/images/hero_luxury_car.jpg',
    route: data.route || ['Pickup', 'Sightseeing', 'Drop'],
    description: data.description || 'Guided chauffeur tour package with customizable stops.',
    highlights: data.highlights || ['Verified Pilots', 'Flexible Timings', 'Toll & State Tax Transparency'],
    recommended_vehicle: data.recommendedVehicle || 'Maruti Suzuki Ertiga 6+1 Seater',
    starting_price: data.startingPrice || '₹ 17 / KM',
    category: data.category || 'heritage',
    is_active: data.isActive ?? true,
    is_featured: data.isFeatured ?? true,
  };

  const { data: inserted, error } = await supabase.from('tours').insert(row).select().single();
  throwIfError(error);
  notifySubscribers();
  return tourFromRow(inserted);
}

export async function updateTour(id: string, updates: Partial<ExtendedTourPackage>): Promise<ExtendedTourPackage> {
  const { data: updated, error } = await supabase
    .from('tours')
    .update(tourToRow(updates))
    .eq('id', id)
    .select()
    .single();
  throwIfError(error);
  notifySubscribers();
  return tourFromRow(updated);
}

export async function deleteTour(id: string): Promise<boolean> {
  const { error } = await supabase.from('tours').delete().eq('id', id);
  throwIfError(error);
  notifySubscribers();
  return true;
}

// ==========================================
// 4. INQUIRIES SERVICE API (WEBSITE ↔ CRM)
// ==========================================

export async function getInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
  throwIfError(error);
  return (data ?? []).map(inquiryFromRow);
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
  const row = {
    customer_name: formData.customerName || 'Valued Guest',
    phone: formData.phone || '+91 90086 30489',
    email: formData.email || 'customer@example.com',
    service: formData.service || 'Outstation Trip',
    vehicle: formData.vehicle || 'Maruti Suzuki Ertiga',
    travel_date: formData.travelDate || new Date().toISOString().split('T')[0],
    pickup: formData.pickup || 'Bengaluru City',
    destination: formData.destination || 'Outstation',
    passengers: String(formData.passengers ?? 4),
    message: formData.message || 'Ride inquiry received from public website.',
    status: 'New' as InquiryStatus,
  };

  // Deliberately no `.select()` here: this insert runs as an anonymous public
  // visitor, and there is no public SELECT policy on `inquiries` (other
  // customers' bookings shouldn't be readable) — requesting the row back via
  // `Prefer: return=representation` would trip RLS's implicit SELECT check on
  // the RETURNING clause even though the INSERT itself is permitted. The UI
  // only needs confirmation that the insert succeeded, not the server row.
  const { error } = await supabase.from('inquiries').insert(row);
  throwIfError(error);
  notifySubscribers();

  const now = new Date().toISOString();
  return inquiryFromRow({
    id: crypto.randomUUID(),
    customer_name: row.customer_name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    vehicle: row.vehicle,
    travel_date: row.travel_date,
    pickup: row.pickup,
    destination: row.destination,
    passengers: row.passengers,
    message: row.message,
    status: row.status,
    created_at: now,
    updated_at: now,
  });
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
  const { data: updated, error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  throwIfError(error);
  notifySubscribers();
  return inquiryFromRow(updated);
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const { error } = await supabase.from('inquiries').delete().eq('id', id);
  throwIfError(error);
  notifySubscribers();
  return true;
}

// ==========================================
// 5. WEBSITE CONTENT API
// ==========================================

export async function getWebsiteContent(): Promise<WebsiteContent> {
  const { data, error } = await supabase.from('website_content').select('*').eq('id', 1).single();
  throwIfError(error);
  return contentFromRow(data);
}

export async function updateWebsiteContent(updates: Partial<WebsiteContent>): Promise<WebsiteContent> {
  const current = await getWebsiteContent();
  const merged: WebsiteContent = {
    ...current,
    ...updates,
    hero: { ...current.hero, ...(updates.hero || {}) },
    contact: { ...current.contact, ...(updates.contact || {}) },
    social: { ...current.social, ...(updates.social || {}) },
    about: { ...current.about, ...(updates.about || {}) },
    cta: { ...current.cta, ...(updates.cta || {}) },
  };

  const { data, error } = await supabase
    .from('website_content')
    .update({
      hero: merged.hero,
      contact: merged.contact,
      social: merged.social,
      about: merged.about,
      cta: merged.cta,
    })
    .eq('id', 1)
    .select()
    .single();
  throwIfError(error);
  notifySubscribers();
  return contentFromRow(data);
}

// ==========================================
// 6. ADMIN PROFILE & AUTHENTICATION API
// ==========================================

export async function getAdminProfile(): Promise<AdminUser> {
  const [{ data: profileRow, error: profileError }, { data: userData }] = await Promise.all([
    supabase.from('admin_profile').select('*').eq('id', 1).single(),
    supabase.auth.getUser(),
  ]);
  throwIfError(profileError);

  return {
    id: userData.user?.id || 'admin-1',
    name: profileRow.name,
    email: userData.user?.email || '',
    role: profileRow.role,
  };
}

export async function updateAdminProfile(updates: Partial<AdminUser>): Promise<AdminUser> {
  const row: Record<string, unknown> = {};
  if (updates.name !== undefined) row.name = updates.name;
  if (updates.role !== undefined) row.role = updates.role;

  if (Object.keys(row).length > 0) {
    const { error } = await supabase.from('admin_profile').update(row).eq('id', 1);
    throwIfError(error);
  }

  if (updates.email) {
    const { error } = await supabase.auth.updateUser({ email: updates.email });
    throwIfError(error);
  }

  notifySubscribers();
  return getAdminProfile();
}

export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function signInAdmin(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  throwIfError(error);
}

export async function signOutAdmin(): Promise<void> {
  await supabase.auth.signOut();
}

export async function changeAdminPassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  throwIfError(error);
}

// Supabase fires its own auth events (sign in/out, token refresh) independent of
// the localStorage-era `subscribeToStore` bus, so route guards can react immediately.
supabase.auth.onAuthStateChange(() => {
  notifySubscribers();
});
