import { useState, useEffect } from 'react';
import {
  getVehicles,
  getServices,
  getTours,
  getInquiries,
  getWebsiteContent,
  getAdminProfile,
  isAuthenticated,
  subscribeToStore,
  type ExtendedVehicle,
  type ExtendedServiceItem,
  type ExtendedTourPackage,
  type Inquiry,
  type WebsiteContent,
  type AdminUser
} from '../services/dataService';

export function useDataStore() {
  const [vehicles, setVehicles] = useState<ExtendedVehicle[]>([]);
  const [services, setServices] = useState<ExtendedServiceItem[]>([]);
  const [tours, setTours] = useState<ExtendedTourPackage[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authed, setAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAll = async () => {
    try {
      // Vehicles/services/tours/content are public-readable (RLS: is_active/true).
      // Inquiries and the admin profile are admin-only, so only fetch those once
      // we know there's an authenticated session — otherwise Supabase's Row Level
      // Security rejects the query and would break public pages using this hook.
      const authedNow = await isAuthenticated();
      setAuthed(authedNow);

      const [v, s, t, c] = await Promise.all([
        getVehicles(!authedNow),
        getServices(!authedNow),
        getTours(!authedNow),
        getWebsiteContent(),
      ]);

      setVehicles(v);
      setServices(s);
      setTours(t);
      setContent(c);

      if (authedNow) {
        const [i, u] = await Promise.all([getInquiries(), getAdminProfile()]);
        setInquiries(i);
        setAdminUser(u);
      } else {
        setInquiries([]);
        setAdminUser(null);
      }
    } catch (err) {
      console.error("Failed to load store data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const unsubscribe = subscribeToStore(() => {
      fetchAll();
    });
    return () => unsubscribe();
  }, []);

  return {
    vehicles,
    services,
    tours,
    inquiries,
    content,
    adminUser,
    authed,
    loading,
    refetch: fetchAll,
  };
}
