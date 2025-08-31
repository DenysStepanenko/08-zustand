import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/notes/filter/All');
}

