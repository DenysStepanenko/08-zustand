import { Metadata } from 'next';
import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = slug?.[0] || 'All';
  const filterName = categoryId === 'All' ? 'Все заметки' : `Заметки категории "${categoryId}"`;
  
  return {
    title: `${filterName} | NoteHub`,
    description: `Просматривайте и управляйте заметками в категории "${categoryId}" в NoteHub. Находите нужные заметки быстро и удобно.`,
    openGraph: {
      title: `${filterName} | NoteHub`,
      description: `Просматривайте и управляйте заметками в категории "${categoryId}" в NoteHub. Находите нужные заметки быстро и удобно.`,
      url: `https://notehub.vercel.app/notes/filter/${categoryId}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub - ${filterName}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryId = slug?.[0];
  const filterCategoryId = categoryId === 'All' ? undefined : categoryId;

  return <NotesClient categoryId={filterCategoryId} />;
}

