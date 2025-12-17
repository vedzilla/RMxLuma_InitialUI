import { getAllUniversities } from '@/data/mockEvents';
import UniversityPageClient from './UniversityPageClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    uniSlug: string;
  };
}

export default function UniversityPage({ params }: PageProps) {
  const universityName = getAllUniversities().find(
    uni => uni.toLowerCase().replace(/\s+/g, '-') === params.uniSlug
  );

  if (!universityName) {
    notFound();
  }

  return <UniversityPageClient universityName={universityName} />;
}

