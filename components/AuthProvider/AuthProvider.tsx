// components/AuthProvider/AuthProvider.tsx

'use client';

import { checkSession, getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await checkSession();
        const user = await getUser();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsRefreshing(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return !isRefreshing && children;
};

export default AuthProvider;
