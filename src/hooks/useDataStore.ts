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
      const [v, s, t, i, c, u] = await Promise.all([
        getVehicles(false),
        getServices(false),
        getTours(false),
        getInquiries(),
        getWebsiteContent(),
        getAdminProfile(),
      ]);

      setVehicles(v);
      setServices(s);
      setTours(t);
      setInquiries(i);
      setContent(c);
      setAdminUser(u);
      setAuthed(isAuthenticated());
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
