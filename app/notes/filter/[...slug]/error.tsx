'use client';

import { useEffect } from 'react';
import css from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Something went wrong!</h2>
      <p className={css.message}>{error.message}</p>
      <button className={css.button} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

