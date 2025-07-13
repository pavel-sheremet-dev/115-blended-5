'use client';

import { checkSession, getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // перевірка сессії на клієнті для того, щоб мати актуальний стан аутентифікації для подальшого відображення потрібного інтерфейсу.

  const [isAuthStatusChecked, setIsAuthStatusChecked] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        const data = await checkSession();
        console.log(data.success);
        const user = await getUser();

        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthStatusChecked(true);
      }
    };
    asyncWrapper();
  }, [setUser]);

  // стан isRefreshing ???

  if (!isAuthStatusChecked) {
    return <div>GLOBAL LOADING....</div>;
  }

  return children;
};

export default AuthProvider;
