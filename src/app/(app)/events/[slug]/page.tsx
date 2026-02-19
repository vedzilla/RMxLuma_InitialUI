import { notFound } from 'next/navigation';
import { getEventBySlug, getEvents } from '@/supabase_lib';
import EventDetail from '@/components/EventDetail';

export const revalidate = 300;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const [event, allEvents] = await Promise.all([
    getEventBySlug(slug),
    getEvents({ upcomingOnly: false }),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EventDetail event={event} allEvents={allEvents} />
    </div>
  );
}
