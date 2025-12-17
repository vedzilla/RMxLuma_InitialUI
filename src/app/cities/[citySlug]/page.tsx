import { mockEvents, getAllCities } from '@/data/mockEvents';
import CityPageClient from './CityPageClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    citySlug: string;
  };
}

export default function CityPage({ params }: PageProps) {
  const cityName = getAllCities().find(
    city => city.toLowerCase().replace(/\s+/g, '-') === params.citySlug
  );

  if (!cityName) {
    notFound();
  }

  return <CityPageClient cityName={cityName} />;
}

