import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Andrew Persad',
  description:
    'Get in touch with Andrew Persad, Lead Frontend Engineer. Available for Lead Frontend Engineer roles and consulting opportunities.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
