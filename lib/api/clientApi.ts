import { NewNoteContent, Note } from '@/types/note';
import { User } from '@/types/user';
import {
  nextServer as api,
  CreateUserData,
  FetchNotesProps,
  FetchNotesResponse,
  SessionResponseData,
} from './api';

export const fetchNotes = async ({
  searchText = '',
  page = 1,
  perPage = 12,
  tag = '',
}: FetchNotesProps) => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchText !== '' ? { search: searchText } : {}),
      ...(tag ? { tag } : {}),
      page,
      perPage,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNoteContent) => {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const register = async (credentials: CreateUserData) => {
  const { data } = await api.post('/auth/register', credentials);
  return data;
};

export const login = async (credentials: CreateUserData) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await api.get<SessionResponseData>('/auth/session');
  return data;
};

export const getUser = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateUser = async (data: UpdateUserRequest) => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};
