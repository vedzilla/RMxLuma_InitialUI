import { notFound } from 'next/navigation';
import { getEvents, getCities, getEventTags } from '@/supabase_lib';
import CityPageClient from './CityPageClient';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ citySlug: string }>;
}

export default async function CityPage({ params }: PageProps) {
  const { citySlug } = await params;
  const [cities, tags, events] = await Promise.all([
    getCities(),
    getEventTags(),
    getEvents(),
  ]);

  const city = cities.find(c => c.slug === citySlug.toLowerCase());

  if (!city) {
    notFound();
  }

  const cityEvents = events.filter(e => e.city.toLowerCase() === city.name.toLowerCase());

  return <CityPageClient cityName={city.name} events={cityEvents} tags={tags} />;
}
