import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { nextServer as api, FetchNotesProps, FetchNotesResponse, SessionResponseData } from './api';

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = 12,
  tag = '',
}: FetchNotesProps) => {
  const cookieStore = await cookies();
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' ? { search } : {}),
      ...(tag ? { tag } : {}),
      page,
      perPage,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await api.get<SessionResponseData>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getUser = async () => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
