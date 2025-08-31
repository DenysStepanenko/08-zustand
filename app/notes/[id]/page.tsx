import { Metadata } from 'next';
import { notesApi } from '@/lib/api/notes';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await notesApi.getNoteById(id);
    const title = note.title || 'Заметка без названия';
    const description = note.content 
      ? note.content.substring(0, 160) + (note.content.length > 160 ? '...' : '')
      : 'Просмотр заметки в NoteHub';
    
    return {
      title: `${title} | NoteHub`,
      description,
      openGraph: {
        title: `${title} | NoteHub`,
        description,
        url: `https://notehub.vercel.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: `NoteHub - ${title}`,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Заметка не найдена | NoteHub',
      description: 'Запрашиваемая заметка не найдена в NoteHub.',
      openGraph: {
        title: 'Заметка не найдена | NoteHub',
        description: 'Запрашиваемая заметка не найдена в NoteHub.',
        url: `https://notehub.vercel.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub - Заметка не найдена',
          },
        ],
      },
    };
  }
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  return <NoteDetailsClient noteId={id} />;
}

