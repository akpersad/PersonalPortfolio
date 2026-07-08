import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Andrew Persad',
  description:
    'Get in touch with Andrew Persad, Lead Software Engineer. Available for lead roles, remote, hybrid, or on-site.',
  alternates: {
    canonical: 'https://andrewpersad.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
