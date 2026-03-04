import { Suspense } from 'react';
import { getEvents, getEventTags, getSocieties } from '@/supabase_lib';
import DiscoverPageClient from './DiscoverPageClient';

export const dynamic = 'force-dynamic';

async function DiscoverPage() {
  const [events, tags, societies] = await Promise.all([
    getEvents(),
    getEventTags(),
    getSocieties(),
  ]);

  // Compute event count per society from the fetched events
  const societyEventCounts = new Map<string, number>();
  events.forEach(event => {
    const count = societyEventCounts.get(event.societyName) ?? 0;
    societyEventCounts.set(event.societyName, count + 1);
  });

  // Build society list: only those with events, sorted by event count, top 6
  const featuredSocieties = societies
    .map(s => ({
      ...s,
      eventCount: societyEventCounts.get(s.name) ?? 0,
      initials: s.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase(),
    }))
    .filter(s => s.eventCount > 0)
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 6);

  return (
    <Suspense fallback={<div className="max-w-[1120px] mx-auto px-[18px] py-8">Loading...</div>}>
      <DiscoverPageClient
        events={events}
        tags={tags}
        societies={featuredSocieties}
      />
    </Suspense>
  );
}

export default DiscoverPage;
