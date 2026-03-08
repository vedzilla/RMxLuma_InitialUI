import { getSocieties, getUniversities, getUserCount, getEventCities, getEventUniversities } from '@/supabase_lib';
import LandingPageClient from './LandingPageClient';

export default async function LandingPage() {
  const [societies, universities, userCount, cityNames, universityNames] = await Promise.all([
    getSocieties(),
    getUniversities(),
    getUserCount(),
    getEventCities(),
    getEventUniversities(),
  ]);

  const featuredUniversities = [...universities]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((u) => u.shortName);

  // Pick a random subset of societies for orbiting logos (up to 11)
  const shuffled = [...societies].sort(() => Math.random() - 0.5);
  const logoSocieties = shuffled.slice(0, 11).map((s) => ({
    name: s.name,
    imageUrl: s.imageUrl,
  }));

  // Use all society names for the flipper
  const societyNames = societies.map((s) => s.name);

  return (
    <LandingPageClient
      societyCount={societies.length}
      universityCount={universities.length}
      studentCount={userCount}
      societyNames={societyNames}
      logoSocieties={logoSocieties}
      cityNames={cityNames}
      universityNames={universityNames}
      featuredUniversities={featuredUniversities}
    />
  );
}
