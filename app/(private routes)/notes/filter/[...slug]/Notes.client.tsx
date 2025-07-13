'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';

import css from './page.module.css';
import { useParams } from 'next/navigation';

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const [currentPage] = useState(1);
  const [searchQuery] = useState('');
  const tag = slug[0];

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        search: searchQuery,
        page: currentPage,
        tag: tag === 'All' ? '' : tag,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <main>
      <section>
        {isSuccess && data.notes.length > 0 && <>{JSON.stringify(data.notes)}</>}
      </section>
    </main>
  );
}
