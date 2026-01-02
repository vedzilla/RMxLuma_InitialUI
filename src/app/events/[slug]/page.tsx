import { notFound } from 'next/navigation';
import { mockEvents } from '@/data/mockEvents';
import EventDetail from '@/components/EventDetail';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function EventPage({ params }: PageProps) {
  const event = mockEvents.find(e => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EventDetail event={event} />
    </div>
  );
}

export function generateStaticParams() {
  return mockEvents.map(event => ({
    slug: event.slug,
  }));
}





