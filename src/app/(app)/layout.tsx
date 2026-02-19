import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { getEventCities, getEventUniversities } from '@/supabase_lib';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cities, universities] = await Promise.all([
    getEventCities(),
    getEventUniversities(),
  ]);

  return (
    <AuroraBackground className="min-h-screen flex flex-col">
      <Header cities={cities} universities={universities} />
      <main className="flex-1">{children}</main>
      <Footer />
    </AuroraBackground>
  );
}
