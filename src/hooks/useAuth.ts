import { useEffect, useState } from 'react';
import { isAuthenticated, subscribeToStore } from '../services/dataService';

export function useAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const check = () => {
      isAuthenticated().then((result) => {
        if (mounted) setAuthed(result);
      });
    };

    check();
    const unsubscribe = subscribeToStore(check);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { authed: !!authed, loading: authed === null };
}
