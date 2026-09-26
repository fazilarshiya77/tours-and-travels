-- Taj Tours & Travels — Supabase schema
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.

-- ==========================================
-- 1. VEHICLES
-- ==========================================
create table if not exists vehicles (
  id text primary key,
  name text not null,
  category text not null check (category in ('mpv', 'sedan')),
  tagline text not null default '',
  image text not null default '',
  passengers int not null default 4,
  luggage int not null default 3,
  transmission text not null default 'Chauffeur Driven',
  fuel_type text not null default 'CNG',
  local_per_km text not null default '',
  outstation_cng_ac text not null default '',
  outstation_cng_non_ac text not null default '',
  outstation_petrol_ac text not null default '',
  daily_full_day_rate text not null default '',
  outstation_per_km text not null default '',
  daily_rate text not null default '',
  hourly_rate text not null default '',
  packages jsonb not null default '[]',
  extra_km_rates jsonb not null default '{}',
  features text[] not null default '{}',
  popular_for text not null default '',
  specs jsonb not null default '{}',
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================
-- 2. SERVICES
-- ==========================================
create table if not exists services (
  id text primary key,
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  icon text not null default 'Navigation',
  features text[] not null default '{}',
  image text not null default '',
  cta_text text not null default '',
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================
-- 3. TOURS
-- ==========================================
create table if not exists tours (
  id text primary key,
  title text not null,
  subtitle text not null default '',
  duration text not null default '',
  distance text not null default '',
  image text not null default '',
  route text[] not null default '{}',
  description text not null default '',
  highlights text[] not null default '{}',
  recommended_vehicle text not null default '',
  starting_price text not null default '',
  category text not null default 'heritage' check (category in ('heritage', 'himalaya', 'spiritual', 'coastal')),
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================
-- 4. INQUIRIES (submitted by public website visitors)
-- ==========================================
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text not null default '',
  service text not null default '',
  vehicle text,
  travel_date text not null default '',
  pickup text not null default '',
  destination text not null default '',
  passengers text not null default '',
  message text not null default '',
  status text not null default 'New' check (status in ('New', 'Contacted', 'Converted', 'Closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================
-- 5. WEBSITE CONTENT (single row)
-- ==========================================
create table if not exists website_content (
  id int primary key default 1,
  hero jsonb not null default '{}',
  contact jsonb not null default '{}',
  social jsonb not null default '{}',
  about jsonb not null default '{}',
  cta jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- ==========================================
-- 6. ADMIN PROFILE (display info; login itself is handled by Supabase Auth)
-- ==========================================
create table if not exists admin_profile (
  id int primary key default 1,
  name text not null default 'Taj Business Owner',
  role text not null default 'Super Admin',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- ==========================================
-- ROW LEVEL SECURITY
-- ==========================================
alter table vehicles enable row level security;
alter table services enable row level security;
alter table tours enable row level security;
alter table inquiries enable row level security;
alter table website_content enable row level security;
alter table admin_profile enable row level security;

-- Public website visitors (anon key, not logged in) can read active/live listings
create policy "public read active vehicles" on vehicles for select using (is_active = true);
create policy "public read active services" on services for select using (is_active = true);
create policy "public read active tours" on tours for select using (is_active = true);
create policy "public read website content" on website_content for select using (true);

-- Public website visitors can submit an inquiry (booking/contact form), nothing else
create policy "public insert inquiries" on inquiries for insert with check (true);

-- Logged-in admin (any authenticated user — there is only the one admin account) gets full access
create policy "admin full access vehicles" on vehicles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access tours" on tours for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access inquiries" on inquiries for select using (auth.role() = 'authenticated');
create policy "admin update inquiries" on inquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin delete inquiries" on inquiries for delete using (auth.role() = 'authenticated');
create policy "admin update website content" on website_content for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access admin profile" on admin_profile for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ==========================================
-- SEED DATA (matches what's currently live on the site)
-- ==========================================

insert into vehicles (id, name, category, tagline, image, passengers, luggage, transmission, fuel_type, local_per_km, outstation_cng_ac, outstation_cng_non_ac, outstation_petrol_ac, daily_full_day_rate, outstation_per_km, daily_rate, hourly_rate, packages, extra_km_rates, features, popular_for, specs)
values
(
  'maruti-suzuki-dzire', 'Maruti Suzuki Dzire', 'sedan',
  'Comfortable Executive Sedan for City & Outstation Rides', '/dzire.png',
  4, 3, 'Chauffeur Driven', 'CNG',
  '₹ 25 / KM', '₹ 14 / KM', '₹ 13 / KM', '₹ 15 / KM',
  '₹ 4,000 / Day', '₹ 14 / KM (AC CNG)', '₹ 4,000 / Day', '8h/80km: ₹2,400',
  '[{"hours":4,"km":40,"price":"₹ 1,200"},{"hours":6,"km":60,"price":"₹ 1,800"},{"hours":8,"km":80,"price":"₹ 2,400"},{"hours":10,"km":100,"price":"₹ 3,000"},{"hours":12,"km":120,"price":"₹ 3,600"}]',
  '{"extraKm":"₹ 14 / KM","intercity":"₹ 14 / KM","rental":"₹ 16 / KM"}',
  array['Pristine Air Conditioned Cabin','Rear AC Vents for Passenger Comfort','Ergonomic Cushion Seats','Ample Boot Luggage Capacity','All India Permit','Experienced Senior Driver'],
  'Outstation Trips, Airport Drops & City Commutes',
  '{"engine":"1.2L DualJet CNG / Petrol","seating":"4 Passengers + 1 Driver","amenities":["Air Conditioning","Mobile Charging","Sanitized Interior","Experienced Driver"],"safetyRating":"Global NCAP 5-Star Certified"}'
),
(
  'maruti-suzuki-ertiga', 'Maruti Suzuki Ertiga', 'mpv',
  'Spacious 6+1 Seater Family Lounger • Safe, Comfortable & Reliable', '/ertiga.jpeg',
  6, 5, 'Chauffeur Driven', 'CNG',
  '₹ 32 / KM', '₹ 17 / KM', '₹ 16 / KM', '₹ 18 / KM',
  '₹ 6,000 / Day (24 Hrs Full Ride)', '₹ 17 / KM (AC CNG)', '₹ 6,000 / Day', '8h/80km: ₹3,000',
  '[{"hours":4,"km":40,"price":"₹ 1,500"},{"hours":6,"km":60,"price":"₹ 2,250"},{"hours":8,"km":80,"price":"₹ 3,000"},{"hours":10,"km":100,"price":"₹ 3,750"},{"hours":12,"km":120,"price":"₹ 4,500"}]',
  '{"extraKm":"₹ 18 / KM","intercity":"₹ 18 / KM","rental":"₹ 20 / KM"}',
  array['Spacious 6+1 Seater Layout','Dual Air Conditioning Vents across 3 Rows','CNG & Petrol Outstation Ride Options','Smooth Long-Highway Suspension','All India Route Permit','Experienced Senior Pilot (Driver)'],
  'All India Outstation Trips, Family Vacations & Group Rental Packages',
  '{"engine":"1.5L Smart Hybrid / CNG Engine","seating":"6 Passengers + 1 Driver (Pilot)","amenities":["Dual Roof AC Vents","USB Mobile Fast Chargers","Sanitized Hygienic Interior","Professional Pilot"],"safetyRating":"Global NCAP Certified Safety"}'
)
on conflict (id) do nothing;

insert into services (id, title, subtitle, description, icon, features, image, cta_text)
values
(
  'outstation-ride', 'Outstation Rides (CNG & Petrol)', 'Safe • Comfortable • Reliable All India Service',
  'Intercity and interstate rides with transparent per-KM rates. CNG AC rides at ₹17/KM, CNG Non-AC at ₹16/KM, and Petrol rides at ₹18/KM.',
  'Navigation',
  array['CNG AC Ride: ₹17 / KM | CNG Non-AC: ₹16 / KM','Petrol Ride: ₹18 / KM (AC & Non-AC)','Extra KM: XL Extra KM ₹18/KM, XL Intercity ₹18/KM, XL Rental ₹20/KM','All India Permit with experienced senior pilots'],
  '/images/fleet_ertiga.jpg', 'Book Outstation Ride'
),
(
  'local-trip-packages', 'Local Trip Packages & Hourly Rentals', 'Tailored Packages for City Travel',
  'Hassle-free local travel packages with fixed kilometer limits: 4 hrs/40 km (₹1,500), 8 hrs/80 km (₹3,000), 12 hrs/120 km (₹4,500), and 24 hrs Full Booking (₹6,000).',
  'Clock',
  array['4 Hrs / 40 KM : ₹1,500 Rs','6 Hrs / 60 KM : ₹2,250 Rs','8 Hrs / 80 KM : ₹3,000 Rs','10 Hrs / 100 KM : ₹3,750 Rs','12 Hrs / 120 KM : ₹4,500 Rs','Full 24 Hrs (Day + Night) : ₹6,000 Rs'],
  '/images/fleet_dzire.jpg', 'Select Rental Package'
)
on conflict (id) do nothing;

insert into tours (id, title, subtitle, duration, distance, image, route, description, highlights, recommended_vehicle, starting_price, category)
values
(
  'all-india-outstation', 'All India Outstation Rides', 'Safe • Comfortable • Reliable',
  'Flexible Packages', 'Intercity & Interstate', '/images/fleet_ertiga.jpg',
  array['Doorstep Pick-up','Interstate Expressways','Custom Stopovers','Destination Drop'],
  'Book outstation rides across India in Maruti Ertiga (6+1 Seater) or Maruti Dzire (Sedan). CNG & Petrol options with transparent per-KM pricing.',
  array['Outstation CNG Rides starting at ₹16/KM (Non AC) & ₹17/KM (AC)','Outstation Petrol Rides starting at ₹18/KM','Experienced pilots for long-distance highway travel','All India Permit enabled vehicles'],
  'Maruti Suzuki Ertiga 6+1 Seater or Dzire', 'CNG from ₹ 16 / KM', 'heritage'
),
(
  'local-hourly-package', 'Local Hourly Rental Packages', '4 Hrs to 24 Hrs Full Booking',
  '4h to 24h', '40 Km to 120+ Km', '/images/fleet_dzire.jpg',
  array['City Pick-up','Shopping & Business Stops','Sightseeing Circuit','Return Drop'],
  'Flexible local hourly packages ranging from 4 Hrs / 40 KM (₹1,500) to 12 Hrs / 120 KM (₹4,500) and 24 Hrs Full Day + Night (₹6,000).',
  array['4 Hrs / 40 KM: ₹1,500 Rs','8 Hrs / 80 KM: ₹3,000 Rs','12 Hrs / 120 KM: ₹4,500 Rs','24 Hrs Full Day + Night: ₹6,000 Rs / Day'],
  'Maruti Suzuki Ertiga or Dzire', 'Packages from ₹ 1,500', 'coastal'
)
on conflict (id) do nothing;

insert into website_content (id, hero, contact, social, about, cta)
values (
  1,
  '{"title":"Travel Across India.","subtitle":"Safe • Comfortable • Reliable","description":"Book Maruti Suzuki Ertiga (6+1 Seater MPV) and Maruti Suzuki Dzire (Executive Sedan) for outstation rides, local hourly packages, and airport transfers.","mediaUrl":"/home-hero.mp4"}',
  '{"phoneDisplay":"+91 90086 30489","phoneRaw":"+919008630489","whatsappNumber":"919008630489","email":"tajtoursandtravels9008@gmail.com","address":"Taj Tour''s & Travels, All India Mobility Service Desk, India","operatingHours":"24 Hours / 7 Days All India Dispatch"}',
  '{"instagram":"https://instagram.com/tajtoursandtravels","facebook":"https://facebook.com/tajtoursandtravels","youtube":"https://youtube.com/tajtoursandtravels"}',
  '{"title":"About Taj Tours & Travels","shortDescription":"Founded on the principles of royal Indian hospitality, safety, and modern automotive excellence.","fullPurpose":"Taj Tours & Travels is built around a singular philosophy: travel should empower, relax, and inspire. Unlike standard car rental agencies, we treat mobility as a concierge hospitality service."}',
  '{"badge":"All India Mobility Dispatch","heading":"Ready to Book Your Ride Now?","description":"Call our travel desk at +91 90086 30489 for instant ride allocation, outstation quotes, and rental package bookings."}'
)
on conflict (id) do nothing;

insert into admin_profile (id, name, role)
values (1, 'Taj Business Owner', 'Super Admin')
on conflict (id) do nothing;
