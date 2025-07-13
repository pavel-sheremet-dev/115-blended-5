'use client';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

export default function AuthNavigation() {
  // логаут
  // очистка стану аутентифікації
  // перенаправлення

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
  };

  if (!isAuthenticated) {
    return (
      <>
        <li>
          <Link href="/sign-in">Login</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign up</Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        {user && <p>{user.username}</p>}
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
}
