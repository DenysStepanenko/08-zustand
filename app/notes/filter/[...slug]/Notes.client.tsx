'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import { notesApi } from '@/lib/api/notes';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

interface NotesClientProps {
  categoryId?: string;
}

export default function NotesClient({ categoryId }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);
  
  const perPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', categoryId, debouncedSearch, currentPage],
    queryFn: () => categoryId 
      ? notesApi.getNotesByCategory(categoryId, debouncedSearch, currentPage, perPage)
      : notesApi.getNotes(debouncedSearch, currentPage, perPage),
  });

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div className={css.loading}>Loading notes...</div>;
  }

  if (error) {
    return <div className={css.error}>Error loading notes</div>;
  }

  const notes = data?.notes || [];
  const totalNotes = data?.total || 0;
  const totalPages = Math.ceil(totalNotes / perPage);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>
          {categoryId ? `Notes in category: ${categoryId}` : 'All Notes'}
        </h1>
        <p className={css.count}>
          {totalNotes} {totalNotes === 1 ? 'note' : 'notes'}
        </p>
      </div>

      <SearchBox 
        value={search}
        onChange={handleSearchChange}
        placeholder="Search notes..."
      />

      {notes.length === 0 ? (
        <div className={css.empty}>
          <p>No notes found.</p>
          <Link href="/notes/action/create" className={css.createLink}>
            Create your first note
          </Link>
        </div>
      ) : (
        <>
          <NoteList notes={notes} />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

