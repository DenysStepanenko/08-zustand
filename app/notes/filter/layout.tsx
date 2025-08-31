import css from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children, sidebar }: LayoutProps) {
  return (
    <div className={css.layout}>
      {sidebar}
      <div className={css.content}>
        {children}
      </div>
    </div>
  );
}

