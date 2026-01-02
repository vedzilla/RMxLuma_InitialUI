import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuroraBackground } from '@/components/ui/aurora-background';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Redefine Me — Discover',
  description: 'Society events + curated city events. Register externally — we personalise what you see.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <AuroraBackground>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuroraBackground>
      </body>
    </html>
  );
}

