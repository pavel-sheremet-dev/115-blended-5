import { getUser } from '@/lib/api/serverApi';
import Link from 'next/link';

export default async function Profile() {
  // запит за юзером і рендер
  const user = await getUser();

  return (
    <>
      <main>
        <div>
          <div>
            <h1>Profile Page</h1>
            {JSON.stringify(user)}
            <Link href="/profile/edit">Edit Profile</Link>
          </div>
        </div>
      </main>
    </>
  );
}
