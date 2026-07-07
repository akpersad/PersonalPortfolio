import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Andrew Persad',
  description:
    'Resume of Andrew Persad, Lead Software Engineer: Deloitte Digital delivery for HP, Eli Lilly, and Amazon, with design systems, accessibility, and performance as the through line.',
  alternates: {
    canonical: 'https://andrewpersad.com/resume',
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
