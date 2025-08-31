import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub - Ваш персональный менеджер заметок',
  description: 'NoteHub - современное приложение для создания, организации и управления заметками. Создавайте, редактируйте и находите свои заметки быстро и удобно.',
  openGraph: {
    title: 'NoteHub - Ваш персональный менеджер заметок',
    description: 'NoteHub - современное приложение для создания, организации и управления заметками. Создавайте, редактируйте и находите свои заметки быстро и удобно.',
    url: 'https://notehub.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Персональный менеджер заметок',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}

