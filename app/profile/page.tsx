import Link from 'next/link';

export default async function Profile() {
  // запит за юзером і рендер
  return (
    <>
      <main>
        <div>
          <div>
            <h1>Profile Page</h1>
            <Link href="/profile/edit">Edit Profile</Link>
          </div>
        </div>
      </main>
    </>
  );
}
