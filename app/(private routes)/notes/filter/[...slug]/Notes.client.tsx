'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/clientApi';

import { useParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const tag = slug[0];

  const onChangeQuery = useDebouncedCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 500);

  const { data, isSuccess, isError } = useQuery({
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
        <input onChange={(e) => onChangeQuery(e.target.value)} />
        {isSuccess && data.notes.length > 0 && <>{JSON.stringify(data.notes)}</>}
        {isError && <div>OOOPS</div>}
      </section>
    </main>
  );
}
