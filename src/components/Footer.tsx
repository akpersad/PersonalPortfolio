'use client';

import Link from 'next/link';
import { memo, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

const Footer = () => {
  const { trackExternalLinkClick } = useAnalytics();

  const handleExternalLinkClick = useCallback(
    (platform: string, url: string) => {
      trackExternalLinkClick(platform, url, 'footer');
    },
    [trackExternalLinkClick]
  );

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-sm font-medium text-fg">
              <span className="text-accent-ink">AP</span>/andrew-persad
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              Lead software engineer. I build scalable, accessible front-ends
              and design systems.
            </p>
          </div>

          <ul className="flex items-center gap-6">
            <li>
              <a
                href="https://github.com/akpersad"
                className="text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-out-quint"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleExternalLinkClick(
                    'GitHub',
                    'https://github.com/akpersad'
                  )
                }
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/andrew-persad-aa496432/"
                className="text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-out-quint"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleExternalLinkClick(
                    'LinkedIn',
                    'https://www.linkedin.com/in/andrew-persad-aa496432/'
                  )
                }
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link
                href="/colophon"
                className="text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-out-quint"
              >
                Colophon
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-line pt-4">
          <p className="annotation">
            © {new Date().getFullYear()} Andrew Persad · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
