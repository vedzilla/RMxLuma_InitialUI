'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockEvents } from '@/data/mockEvents';
import { filterEvents, sortEvents, SortOption } from '@/utils/eventUtils';
import SortDropdown from '@/components/SortDropdown';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import SocietyCard from '@/components/SocietyCard';

interface CategoryPageClientProps {
  categoryName: string;
  description: string;
  keywords: string[];
  imageKeyword: string;
  eventCount: number;
  subscriberCount: number;
}

export default function CategoryPageClient({
  categoryName,
  description,
  keywords,
  imageKeyword,
  eventCount,
  subscriberCount,
}: CategoryPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortOption>('soonest');

  // Get selected event from URL
  const selectedEventSlug = searchParams.get('event');
  const selectedEvent = selectedEventSlug
    ? mockEvents.find(e => e.slug === selectedEventSlug)
    : null;

  const openEvent = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('event', slug);
    router.push(`/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}?${params.toString()}`, { scroll: false });
  };

  const closeEvent = () => {
    router.push(`/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`, { scroll: false });
  };

  // Filter events by category
  const categoryEvents = useMemo(() => {
    // Filter by the category page category
    let events = mockEvents.filter(e => e.tags.includes(categoryName));
    events = sortEvents(events, sortBy);
    return events;
  }, [sortBy, categoryName]);

  // Get popular societies for this category
  const popularSocieties = useMemo(() => {
    const societies = new Map<string, { name: string; count: number; category: string }>();
    categoryEvents.forEach(event => {
      const existing = societies.get(event.societyName);
      if (existing) {
        existing.count += 1;
      } else {
        societies.set(event.societyName, {
          name: event.societyName,
          count: 1,
          category: categoryName,
        });
      }
    });
    return Array.from(societies.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [categoryEvents, categoryName]);

  // Get image URL based on keyword
  const imageUrl = `https://images.unsplash.com/photo-${imageKeyword === 'sports' ? '1571008887538-b36bb32f4571' : imageKeyword === 'business' ? '1556761175-5973dc0f32e7' : imageKeyword === 'culture' ? '1606220945770-b5b6c2c55bf1' : imageKeyword === 'wellness' ? '1506126613408-eca07ce68773' : imageKeyword === 'social' ? '1521737604893-d14cc237f11d' : imageKeyword === 'technology' ? '1677442136019-21780ecad995' : imageKeyword === 'art' ? '1502920917128-1aa500764cbd' : '1556910103-1c02745aae4d'}?w=800`;

  return (
    <>
      <div className="max-w-[1120px] mx-auto px-[18px] py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Category Info */}
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold text-text mb-6 tracking-[-0.03em]">
              {categoryName}
            </h1>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-muted">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M3 8h14M8 4v4" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span className="font-semibold text-text">{eventCount} Events</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M5 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <span className="font-semibold text-text">{subscriberCount.toLocaleString()} Subscribers</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted mb-8 leading-relaxed">
              {description}
            </p>

            {/* Subscribe Button */}
            <button className="px-6 py-3 bg-text text-surface rounded-lg font-semibold hover:bg-muted transition-colors">
              Subscribe
            </button>
          </div>

          {/* Right: Visual Card */}
          <div className="bg-bg border border-border rounded-[var(--radius)] p-8 relative min-h-[500px]">
            {/* Small icon in top-left */}
            <div className="absolute top-6 left-6">
              {categoryName === 'Sports' && (
                <div className="w-8 h-8 rounded bg-[#3B82F6] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M10 2 L10 18 M2 10 L18 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Business' && (
                <div className="w-8 h-8 rounded bg-[#6366F1] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <rect x="4" y="6" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 6 V4 C6 3.4 6.4 3 7 3 H13 C13.6 3 14 3.4 14 4 V6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M8 10 H12" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Culture' && (
                <div className="w-8 h-8 rounded bg-[#A855F7] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Wellbeing' && (
                <div className="w-8 h-8 rounded bg-[#10B981] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M10 6 V10 L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Social' && (
                <div className="w-8 h-8 rounded bg-[#F59E0B] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M5 13 C5 11.5 6.5 10 8 10 H12 C13.5 10 15 11.5 15 13" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Tech' && (
                <div className="w-8 h-8 rounded bg-[#EF4444] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <rect x="5" y="4" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M8 4 V2 H12 V4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Arts' && (
                <div className="w-8 h-8 rounded bg-[#EC4899] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <path d="M4 16 L8 4 L12 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 12 L10 12" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="14" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M14 8 V14" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
              {categoryName === 'Food & Drink' && (
                <div className="w-8 h-8 rounded bg-[#F97316] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white">
                    <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 8 C6 5 7.5 3 10 3 C12.5 3 14 5 14 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M7 12 L13 12 L12 17 L8 17 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Circular Image - centered */}
            <div className="flex items-center justify-center my-8">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-surface shadow-lg">
                <Image
                  src={imageUrl}
                  alt={categoryName}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
            </div>

            {/* Keywords - vertical on the right */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {keywords.map((keyword, idx) => (
                <div
                  key={idx}
                  className="text-muted font-semibold text-xs tracking-wider uppercase"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  {keyword}
                </div>
              ))}
            </div>

            {/* Bottom Labels */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs">
              <span className="text-muted font-medium">DISCOVER</span>
              <span className="font-bold text-text uppercase">{categoryName.toUpperCase()} EVENTS</span>
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="mb-8">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Popular Calendars/Societies */}
        {popularSocieties.length > 0 && (
          <div className="mb-12">
            <div className="flex items-baseline justify-between gap-[10px] mb-6">
              <h2 className="m-0 text-[18px] font-semibold text-text tracking-[-0.02em] leading-[1.2]">
                Popular Calendars
              </h2>
              <Link href="#" className="text-text no-underline font-medium text-sm hover:underline hover:text-muted transition-colors">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
              {popularSocieties.map(society => (
                <SocietyCard
                  key={society.name}
                  name={society.name}
                  category={society.category}
                  eventCount={society.count}
                  initials={society.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                />
              ))}
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div>
          <div className="flex items-baseline justify-between gap-[10px] mb-6">
            <h2 className="m-0 text-[18px] font-semibold text-text tracking-[-0.02em] leading-[1.2]">
              Events
            </h2>
            <span className="text-sm text-muted">{categoryEvents.length} events</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
            {categoryEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => openEvent(event.slug)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeEvent} />
      )}
    </>
  );
}

