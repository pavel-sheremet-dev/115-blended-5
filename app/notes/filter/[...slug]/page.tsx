import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag: string = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
