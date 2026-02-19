import { notFound } from 'next/navigation';
import { getEvents, getEventUniversities, getEventTags } from '@/supabase_lib';
import UniversityPageClient from './UniversityPageClient';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ uniSlug: string }>;
}

export default async function UniversityPage({ params }: PageProps) {
  const { uniSlug } = await params;
  const [universities, tags, events] = await Promise.all([
    getEventUniversities(),
    getEventTags(),
    getEvents(),
  ]);

  const universityName = universities.find(
    uni => uni.toLowerCase().replace(/\s+/g, '-') === uniSlug.toLowerCase()
  );

  if (!universityName) {
    notFound();
  }

  const universityEvents = events.filter(
    e => e.university.toLowerCase() === universityName.toLowerCase()
  );

  return <UniversityPageClient universityName={universityName} events={universityEvents} tags={tags} />;
}
