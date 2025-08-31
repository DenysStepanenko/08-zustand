'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { notesApi } from '@/lib/api/notes';
import css from './Notes.module.css';

interface NotesClientProps {
  categoryId?: string;
}

export default function NotesClient({ categoryId }: NotesClientProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', categoryId],
    queryFn: () => categoryId 
      ? notesApi.getNotesByCategory(categoryId)
      : notesApi.getNotes(),
  });

  if (isLoading) {
    return <div className={css.loading}>Loading notes...</div>;
  }

  if (error) {
    return <div className={css.error}>Error loading notes</div>;
  }

  const notes = data?.notes || [];

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>
          {categoryId ? `Notes in category` : 'All Notes'}
        </h1>
        <p className={css.count}>
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </p>
      </div>

      {notes.length === 0 ? (
        <div className={css.empty}>
          <p>No notes found.</p>
          <Link href="/notes/create" className={css.createLink}>
            Create your first note
          </Link>
        </div>
      ) : (
        <div className={css.grid}>
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className={css.noteCard}
            >
              <h2 className={css.noteTitle}>{note.title}</h2>
              <p className={css.notePreview}>
                {note.content.substring(0, 150)}
                {note.content.length > 150 ? '...' : ''}
              </p>
              <div className={css.noteMeta}>
                <span className={css.noteDate}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

