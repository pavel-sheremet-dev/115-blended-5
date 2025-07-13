import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => {
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user) => set(() => ({ user: user, isAuthenticated: !!user })),
    clearIsAuthenticated: () => set(() => ({ user: null, isAuthenticated: false })),
  };
});
