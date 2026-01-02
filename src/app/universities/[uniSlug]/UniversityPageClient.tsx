'use client';

import { useState, useMemo } from 'react';
import { mockEvents } from '@/data/mockEvents';
import { filterEvents, sortEvents, SortOption } from '@/utils/eventUtils';
import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';
import SortDropdown from '@/components/SortDropdown';
import EventGrid from '@/components/EventGrid';
import Link from 'next/link';

interface UniversityPageClientProps {
  universityName: string;
}

export default function UniversityPageClient({ universityName }: UniversityPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>('soonest');

  // Filter events by university
  const universityEvents = useMemo(() => {
    let events = filterEvents(mockEvents, searchQuery, selectedTag, undefined, universityName);
    events = sortEvents(events, sortBy);
    return events;
  }, [searchQuery, selectedTag, sortBy, universityName]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
          {universityName} events
        </h1>
        <p className="text-lg text-muted mb-6">
          Discover society events at {universityName}. Get the app for personalized recommendations.
        </p>
        <Link
          href="/about"
          className="inline-block px-6 py-3 border border-border text-text rounded-lg font-semibold hover:bg-bg transition-colors"
        >
          Get the app
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
        <FilterPills selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      </div>

      {/* Events */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">Events</h2>
          <span className="text-sm text-muted">{universityEvents.length} events</span>
        </div>
        <EventGrid events={universityEvents} />
      </div>
    </div>
  );
}





