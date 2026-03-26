import type { Metadata } from 'next';
import HelpPageClient from './HelpPageClient';

export const metadata: Metadata = {
  title: 'Help | Redefine Me',
  description: 'Find answers to common questions about using Redefine Me.',
};

export default function HelpPage() {
  return <HelpPageClient />;
}
