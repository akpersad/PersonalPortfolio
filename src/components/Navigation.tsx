'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, memo, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import ThemeToggle from '@/components/ThemeToggle';

const navigation = [
  { name: 'Work', label: 'work', href: '/work' },
  { name: 'About', label: 'about', href: '/about' },
  { name: 'Resume', label: 'resume', href: '/resume' },
  { name: 'Colophon', label: 'colophon', href: '/colophon' },
  { name: 'Contact', label: 'contact', href: '/contact' },
];

/* Accent underline that draws in on hover and stays put on the active link. */
const linkUnderline =
  'relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-accent after:origin-left motion-safe:after:transition-transform motion-safe:after:duration-200 motion-safe:after:ease-out-quint';

const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { trackNavigationClick } = useAnalytics();

  const handleNavigationClick = useCallback(
    (navItem: string, source: string) => {
      trackNavigationClick(navItem, source);
    },
    [trackNavigationClick]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="font-mono text-sm font-medium text-fg"
            aria-label="Andrew Persad, home"
            onClick={() => handleNavigationClick('Logo', 'header')}
          >
            <span className="text-accent-ink">AP</span>/andrew-persad
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <ul className="hidden items-baseline gap-6 md:flex">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`${linkUnderline} text-sm ${
                      isActive(item.href)
                        ? 'text-fg after:scale-x-100'
                        : 'text-fg-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100'
                    }`}
                    onClick={() =>
                      handleNavigationClick(item.name, 'desktop_nav')
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg hover:border-accent hover:text-accent-ink md:hidden"
            >
              <svg
                className="h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div id="mobile-nav" className="border-t border-line md:hidden">
            <ul className="space-y-1 pb-4 pt-2">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block rounded-md px-3 py-3 text-base ${
                      isActive(item.href)
                        ? 'bg-surface text-fg'
                        : 'text-fg-muted hover:bg-surface hover:text-fg'
                    }`}
                    onClick={() => {
                      handleNavigationClick(item.name, 'mobile_nav');
                      closeMobileMenu();
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navigation);
