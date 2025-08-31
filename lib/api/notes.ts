import axios from 'axios';
import { Note, NewNoteData, NoteListResponse, Category } from '@/types/note';

const api = axios.create({
  baseURL: 'https://next-docs-api.onrender.com',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  // Получить все заметки с поиском и пагинацией
  getNotes: async (search: string = '', page: number = 1, perPage: number = 12): Promise<NoteListResponse> => {
    const response = await api.get<NoteListResponse>('/notes', {
      params: { search, page, perPage }
    });
    return response.data;
  },

  // Получить заметки по категории
  getNotesByCategory: async (categoryId: string, search: string = '', page: number = 1, perPage: number = 12): Promise<NoteListResponse> => {
    const response = await api.get<NoteListResponse>('/notes', {
      params: { categoryId, search, page, perPage }
    });
    return response.data;
  },

  // Получить заметку по ID
  getNoteById: async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  // Создать новую заметку
  createNote: async (noteData: NewNoteData): Promise<Note> => {
    const response = await api.post<Note>('/notes', noteData);
    return response.data;
  },

  // Удалить заметку
  deleteNote: async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  },

  // Получить все категории
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
};

