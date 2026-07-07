'use client';

import { useCallback } from 'react';

/* The current theme class is set on <html> before paint by the inline script
   in layout.tsx. This button only flips the class and persists the choice, so
   it renders identically on server and client (icons swap via CSS). */
const ThemeToggle = () => {
  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Storage unavailable (private mode); the toggle still works for the session.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg hover:border-accent hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-out-quint"
    >
      {/* moon: shown in light mode */}
      <svg
        className="h-4 w-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {/* sun: shown in dark mode */}
      <svg
        className="hidden h-4 w-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
