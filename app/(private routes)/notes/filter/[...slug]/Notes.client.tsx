'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';

import css from './page.module.css';
import { useParams } from 'next/navigation';

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const tag = slug[0];

  const { data } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        searchText: searchQuery,
        page: currentPage,
        tag: tag === 'All' ? '' : tag,
      }),
    placeholderData: keepPreviousData,
  });

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  }, 300);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            <SearchBox onSearch={changeSearchQuery} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}

            <Link className={css.button} href={'/notes/action/create'}>
              Create note +
            </Link>
          </header>

          {notes.length > 0 && <NoteList notes={notes} />}
        </section>
      </main>
    </div>
  );
}
