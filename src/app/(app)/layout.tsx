import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </AuroraBackground>
  );
}

