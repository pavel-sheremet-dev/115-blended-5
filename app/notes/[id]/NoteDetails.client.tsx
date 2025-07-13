'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api/clientApi';

const NoteDetailsClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClickBack = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <p>NoteDetailsClient</p>
      {note && (
        <div>
          <button onClick={handleClickBack}>Back</button>
          {JSON.stringify(note)}
        </div>
      )}
    </>
  );
};

export default NoteDetailsClient;
