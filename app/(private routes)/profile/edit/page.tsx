'use client';

import { updateUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

export default function EditProfileClient() {
  const router = useRouter();
  // оновлення юзеру
  // оновлення стану юзера

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string;

    const updatedUser = await updateUser({
      email: user?.email ?? '',
      username,
    });

    setUser(updatedUser);

    router.push('/profile');
  };

  console.log(user);
  if (!user) return null;

  return (
    <main>
      <div>
        <h1>Edit Profile</h1>
        <form action={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" name="username" defaultValue={user.username} />
          </div>

          <p>Email:</p>

          <div>
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}
