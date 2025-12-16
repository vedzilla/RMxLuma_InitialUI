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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>('soonest');

  // Get city name from slug
  const cityName = getAllCities().find(
    city => city.toLowerCase().replace(/\s+/g, '-') === params.citySlug
  );

  if (!cityName) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">City not found</h1>
        <Link href="/" className="text-accent hover:underline">Return home</Link>
      </div>
    );
  }

  // Filter events by city
  const cityEvents = useMemo(() => {
    let events = filterEvents(mockEvents, searchQuery, selectedTag, cityName);
    events = sortEvents(events, sortBy);
    return events;
  }, [searchQuery, selectedTag, sortBy, cityName]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
          Events in {cityName}
        </h1>
        <p className="text-lg text-muted mb-6">
          Discover society events happening in {cityName}. Get the app for personalized recommendations.
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
          <span className="text-sm text-muted">{cityEvents.length} events</span>
        </div>
        <EventGrid events={cityEvents} />
      </div>
    </div>
  );
}

