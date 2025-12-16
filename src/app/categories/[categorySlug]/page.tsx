import { mockEvents, getAllTags } from '@/data/mockEvents';
import CategoryPageClient from './CategoryPageClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    categorySlug: string;
  };
}

// Category descriptions and keywords
const categoryData: Record<string, { description: string; keywords: string[]; imageKeyword: string }> = {
  'Sports': {
    description: 'From competitive matches to casual sessions, join sports events to stay active, build teamwork, and connect with fellow athletes.',
    keywords: ['FOOTBALL', 'BASKETBALL', 'TENNIS', 'SWIMMING'],
    imageKeyword: 'sports',
  },
  'Business': {
    description: 'Network with entrepreneurs, attend workshops, and learn from industry leaders. Build your career and connect with like-minded professionals.',
    keywords: ['NETWORKING', 'STARTUPS', 'WORKSHOPS', 'CAREER'],
    imageKeyword: 'business',
  },
  'Culture': {
    description: 'Celebrate diversity through cultural events, performances, and gatherings. Experience traditions, art, and community.',
    keywords: ['FESTIVALS', 'PERFORMANCES', 'TRADITIONS', 'ARTS'],
    imageKeyword: 'culture',
  },
  'Wellbeing': {
    description: 'Prioritize your mental and physical health. Join wellness sessions, meditation, yoga, and self-care events.',
    keywords: ['YOGA', 'MEDITATION', 'MINDFULNESS', 'WELLNESS'],
    imageKeyword: 'wellness',
  },
  'Social': {
    description: 'Meet new people, make friends, and build your social circle. From mixers to game nights, find your community.',
    keywords: ['MIXERS', 'GAME NIGHTS', 'SOCIALS', 'COMMUNITY'],
    imageKeyword: 'social',
  },
  'Tech': {
    description: 'Join hackathons, learn new technologies, and meet fellow developers. From coding workshops to AI discussions, level up your skills.',
    keywords: ['HACKATHONS', 'CODING', 'AI/ML', 'WORKSHOPS'],
    imageKeyword: 'technology',
  },
  'Arts': {
    description: 'Express your creativity through art events, exhibitions, and workshops. Connect with artists and explore your artistic side.',
    keywords: ['EXHIBITIONS', 'WORKSHOPS', 'PERFORMANCES', 'CREATIVE'],
    imageKeyword: 'art',
  },
  'Food & Drink': {
    description: 'Explore culinary experiences, cooking classes, and food events. Taste new flavors and meet fellow food enthusiasts.',
    keywords: ['COOKING CLASSES', 'FOOD TOURS', 'TASTINGS', 'CULINARY'],
    imageKeyword: 'food',
  },
};

export default function CategoryPage({ params }: PageProps) {
  const categoryName = getAllTags().find(
    tag => tag.toLowerCase().replace(/\s+/g, '-') === params.categorySlug
  );

  if (!categoryName || !categoryData[categoryName]) {
    notFound();
  }

  const categoryInfo = categoryData[categoryName];
  const categoryEvents = mockEvents.filter(e => e.tags.includes(categoryName));
  const eventCount = categoryEvents.length;
  const subscriberCount = Math.floor(eventCount * 45); // Estimate subscribers

  return (
    <CategoryPageClient
      categoryName={categoryName}
      description={categoryInfo.description}
      keywords={categoryInfo.keywords}
      imageKeyword={categoryInfo.imageKeyword}
      eventCount={eventCount}
      subscriberCount={subscriberCount}
    />
  );
}

