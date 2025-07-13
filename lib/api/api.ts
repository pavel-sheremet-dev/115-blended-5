import { Note } from '@/types/note';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export interface FetchNotesProps {
  search?: string;
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
