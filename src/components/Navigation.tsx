'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, memo, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

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

  return (
    <nav
      className="bg-light-neutral border-b border-medium-green sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link
            href="/"
            className="text-xl font-semibold text-text-primary hover:text-primary-green transition-colors"
            onClick={() => handleNavigationClick('Logo', 'header')}
          >
            Andrew Persad
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'text-nav-active-text bg-nav-active-bg shadow-sm border border-medium-green'
                    : 'text-text-primary hover:text-text-primary hover:bg-nav-active-bg/30'
                }`}
                onClick={() => handleNavigationClick(item.name, 'desktop_nav')}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-text-primary hover:text-primary-green focus:outline-none focus:text-primary-green"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-medium-green">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href))
                      ? 'text-nav-active-text bg-nav-active-bg shadow-sm border border-medium-green'
                      : 'text-text-primary hover:text-text-primary hover:bg-nav-active-bg/30'
                  }`}
                  onClick={() => {
                    handleNavigationClick(item.name, 'mobile_nav');
                    closeMobileMenu();
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Navigation);
