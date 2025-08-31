'use client';

import { useQuery } from '@tanstack/react-query';
import { notesApi } from '@/lib/api/notes';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesApi.getNoteById(noteId),
  });

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (error || !note) {
    return <div className={css.error}>Note not found</div>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <div className={css.meta}>
        <span className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <span className={css.category}>
          Category: {note.categoryId}
        </span>
      </div>
      <div className={css.content}>
        {note.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

