'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { notesApi } from '@/lib/api/notes';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: notesApi.getCategories,
  });

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Filter by category</h2>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/All" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id} className={css.menuItem}>
            <Link href={`/notes/filter/${category.id}`} className={css.menuLink}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

