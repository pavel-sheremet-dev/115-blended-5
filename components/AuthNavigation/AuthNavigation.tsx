'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

import css from './AuthNavigation.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';

export default function AuthNavigation() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  if (isAuthenticated)
    return (
      <>
        <li className={css.navigationItem}>
          <TagsMenu />
        </li>
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user?.username}</p>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      </>
    );

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
