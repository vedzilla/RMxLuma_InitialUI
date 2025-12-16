'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { mockEvents } from '@/data/mockEvents';
import { filterEvents, sortEvents, getTrendingEvents, SortOption } from '@/utils/eventUtils';
import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';
import SortDropdown from '@/components/SortDropdown';
import EventGrid from '@/components/EventGrid';
import EventCard from '@/components/EventCard';
import CategoryCard from '@/components/CategoryCard';
import SocietyCard from '@/components/SocietyCard';
import EventModal from '@/components/EventModal';
import { getAllTags } from '@/data/mockEvents';

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>('soonest');

  // Get selected event from URL
  const selectedEventSlug = searchParams.get('event');
  const selectedEvent = selectedEventSlug
    ? mockEvents.find(e => e.slug === selectedEventSlug)
    : null;

  const openEvent = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('event', slug);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const closeEvent = () => {
    router.push('/', { scroll: false });
  };

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let events = filterEvents(mockEvents, searchQuery, selectedTag);
    events = sortEvents(events, sortBy);
    return events;
  }, [searchQuery, selectedTag, sortBy]);

  // Get popular/trending events
  const popularEvents = useMemo(() => {
    return getTrendingEvents(mockEvents, 6);
  }, []);

  const categories = getAllTags();
  const featuredSocieties = [
    { name: 'UoM Boxing', category: 'Sports', count: 8, initials: 'BX' },
    { name: 'Masood Entrepreneurship Centre', category: 'Business', count: 12, initials: 'MEC' },
    { name: 'Hindu Society', category: 'Culture', count: 6, initials: 'HS' },
    { name: 'UoM Running', category: 'Sports', count: 10, initials: 'RN' },
    { name: 'Photo Society', category: 'Arts', count: 7, initials: 'PH' },
    { name: 'Manchester Picks', category: 'City events', count: 15, initials: 'MP' },
  ];

  return (
    <>
      <div className="max-w-[1120px] mx-auto px-[18px]">
      {/* Hero */}
      <div className="pt-[22px] pb-2">
        <h1 className="m-0 text-[36px] font-semibold text-text tracking-[-0.03em] leading-[1.1]">
          Discover events in Manchester
        </h1>
        <div className="mt-2 text-muted text-[15px] font-normal leading-[1.5] tracking-[-0.01em]">
          Society events + curated city events. Register externally — we personalise what you see.
        </div>

        {/* Search Row */}
        <div className="flex flex-wrap gap-3 mt-4 items-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="hidden md:block">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-3">
          <FilterPills selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        </div>
      </div>

      {/* Popular Events Section */}
      {!searchQuery && !selectedTag && (
        <div className="mt-[26px]">
          <div className="flex items-baseline justify-between gap-[10px]">
            <h2 className="m-0 text-[18px] font-semibold text-text tracking-[-0.02em] leading-[1.2]">
              Popular events
            </h2>
            <Link href="#" className="text-text no-underline font-medium text-sm hover:underline hover:text-muted transition-colors">
              See all
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
            {popularEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => openEvent(event.slug)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Browse by Category Section */}
      {!searchQuery && !selectedTag && (
        <div className="mt-[26px]">
          <div className="flex items-baseline justify-between gap-[10px]">
            <h2 className="m-0 text-[18px] font-semibold text-text tracking-[-0.02em] leading-[1.2]">
              Browse by category
            </h2>
            <Link href="#" className="text-text no-underline font-medium text-sm hover:underline hover:text-muted transition-colors">
              View all
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.slice(0, 8).map(category => (
              <CategoryCard
                key={category}
                categoryName={category}
                onClick={() => setSelectedTag(selectedTag === category ? undefined : category)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Featured Societies Section */}
      {!searchQuery && !selectedTag && (
        <div className="mt-[26px]">
          <div className="flex items-baseline justify-between gap-[10px]">
            <h2 className="m-0 text-[18px] font-semibold text-text tracking-[-0.02em] leading-[1.2]">
              Featured societies
            </h2>
            <Link href="#" className="text-text no-underline font-medium text-sm hover:underline hover:text-muted transition-colors">
              View all
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {featuredSocieties.map(society => (
              <SocietyCard
                key={society.name}
                name={society.name}
                category={society.category}
                eventCount={society.count}
                initials={society.initials}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filtered Results */}
      {(searchQuery || selectedTag) && (
        <div className="mt-[26px]">
          <div className="flex items-baseline justify-between gap-[10px]">
            <h2 className="m-0 text-[18px] font-semibold text-text tracking-[-0.02em] leading-[1.2]">
              Search results
            </h2>
            <span className="text-sm text-muted">{filteredEvents.length} events</span>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => openEvent(event.slug)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeEvent} />
      )}

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeEvent} />
      )}
    </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="max-w-[1120px] mx-auto px-[18px] py-8">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}

