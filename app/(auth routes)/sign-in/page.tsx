'use client';

import { AuthUserData } from '@/lib/api/api';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  // login
  // оновлення стану аутентифікації
  // редірект
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const userData: AuthUserData = {
      email,
      password,
    };

    try {
      const user = await login(userData);
      setUser(user);
      router.replace('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Sign in</h1>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
}
