'use client';

import { SortOption } from '@/utils/eventUtils';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="px-4 py-2 text-sm font-medium text-text bg-surface border border-border rounded-lg outline-none cursor-pointer hover:bg-bg transition-colors"
      aria-label="Sort events"
    >
      <option value="soonest">Soonest</option>
      <option value="trending">Trending</option>
      <option value="newest">Newest</option>
    </select>
  );
}

