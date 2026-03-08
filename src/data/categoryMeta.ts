import {
  GraduationCap,
  Palette,
  Briefcase,
  Heart,
  Globe,
  Film,
  UtensilsCrossed,
  Code,
  Music,
  Flame,
  HelpCircle,
  Users,
  Trophy,
  Leaf,
  Cpu,
  Plane,
  HeartPulse,
  Wrench,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';

interface CategoryMeta {
  icon: LucideIcon;
  color: string;
}

const categoryMetaMap: Record<string, CategoryMeta> = {
  academic: { icon: GraduationCap, color: '#F05247' },
  arts: { icon: Palette, color: '#3B82F6' },
  career: { icon: Briefcase, color: '#22C55E' },
  charity: { icon: Heart, color: '#F59E0B' },
  cultural: { icon: Globe, color: '#8B5CF6' },
  film: { icon: Film, color: '#14B8A6' },
  'food & drink': { icon: UtensilsCrossed, color: '#F05247' },
  hackathon: { icon: Code, color: '#3B82F6' },
  music: { icon: Music, color: '#22C55E' },
  outdoor: { icon: Flame, color: '#F59E0B' },
  quiz: { icon: HelpCircle, color: '#8B5CF6' },
  social: { icon: Users, color: '#14B8A6' },
  sports: { icon: Trophy, color: '#F05247' },
  sustainability: { icon: Leaf, color: '#3B82F6' },
  tech: { icon: Cpu, color: '#22C55E' },
  trip: { icon: Plane, color: '#F59E0B' },
  wellbeing: { icon: HeartPulse, color: '#8B5CF6' },
  workshop: { icon: Wrench, color: '#14B8A6' },
};

const fallback: CategoryMeta = { icon: LayoutGrid, color: '#64748B' };

export function getCategoryMeta(category: string): CategoryMeta {
  return categoryMetaMap[category.toLowerCase()] ?? fallback;
}

export { LayoutGrid };
