import { getUser } from '@/lib/api/serverApi';

import css from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUser();

  return {
    title: `${user.username} Profile | NoteHub`,
    description: `View ${user.username} profile information and manage your account on NoteHub.`,
    openGraph: {
      title: `${user.username} Profile | NoteHub`,
      description: `View ${user.username} profile information and manage your account on NoteHub.`,
      url: `https://notehub.com/profile`,
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username} | NoteHub`,
        },
      ],
    },
  };
}

export default async function Profile() {
  const data = await getUser();
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>

          <div className={css.avatarWrapper}>
            <Image
              src={data.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>

          <div className={css.profileInfo}>
            <p>Username: {data.username}</p>
            <p>Email: {data.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}
