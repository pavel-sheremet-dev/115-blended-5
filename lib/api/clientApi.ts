import { Note } from '@/types/note';

import { nextServer as api, AuthUserData, FetchNotesProps, FetchNotesResponse } from './api';
import { RegisteredUser, User } from '@/types/user';

// AUTH

export const register = async (credentials: AuthUserData) => {
  const { data } = await api.post<RegisteredUser>('/auth/register', credentials);
  return data;
};

// login

export const login = async (credentials: AuthUserData) => {
  const { data } = await api.post<User>('/auth/login', credentials);
  return data;
};

// logout

export const logout = async () => {
  await api.post('/auth/logout');
};

// checkSession

interface CheckSessionResponse {
  success: true;
}

export const checkSession = async () => {
  const { data } = await api.get<CheckSessionResponse>('/auth/session');
  return data;
};

// getUser

export const getUser = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

// updateUser

export const updateUser = async (updatedUserData: RegisteredUser) => {
  const { data } = await api.patch<User>('/users/me', updatedUserData);
  return data;
};

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
