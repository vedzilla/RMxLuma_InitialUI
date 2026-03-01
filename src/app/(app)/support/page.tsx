import type { Metadata } from 'next';
import SupportPageClient from './SupportPageClient';

export const metadata: Metadata = {
  title: 'Support | Redefine Me',
  description: 'Get help, browse FAQs, or contact the Redefine Me team.',
};

export default function SupportPage() {
  return <SupportPageClient />;
}
