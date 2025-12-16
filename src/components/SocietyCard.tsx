interface SocietyCardProps {
  name: string;
  category: string;
  eventCount: number;
  initials: string;
}

export default function SocietyCard({ name, category, eventCount, initials }: SocietyCardProps) {
  return (
    <div className="bg-surface border border-border rounded-[var(--radius)] p-4 flex items-center gap-3 cursor-pointer transition-all duration-[0.12s] shadow-[var(--shadowSoft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:border-text">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(99,102,241,0.08)] to-[rgba(15,23,42,0.05)] border border-border grid place-items-center text-text font-semibold text-base flex-shrink-0">
        {initials}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-[15px] text-text tracking-[-0.01em] mb-1">
          {name}
        </div>
        <div className="text-xs text-muted font-medium">
          {category} • {eventCount} upcoming events
        </div>
      </div>
    </div>
  );
}

