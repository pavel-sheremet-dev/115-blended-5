import { Note } from '@/types/note';

import { nextServer as api, FetchNotesProps, FetchNotesResponse } from './api';

// AUTH

// register

// login

// logout

// checkSession

// getUser

// updateUser

// NOTES

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = 12,
  tag = '',
}: FetchNotesProps) => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' ? { search } : {}),
      ...(tag ? { tag } : {}),
      page,
      perPage,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};
