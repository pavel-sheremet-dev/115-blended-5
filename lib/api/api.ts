import { Note } from '@/types/note';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + `/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export interface FetchNotesProps {
  searchText?: string;
  page?: number;
  perPage?: number;
  tag: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateUserData {
  email: string;
  password: string;
}

export interface SessionResponseData {
  success: true;
}
