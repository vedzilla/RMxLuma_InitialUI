'use client';

interface FilterPillsProps {
  tags: string[];
  selectedTag?: string;
  onTagSelect: (tag: string | undefined) => void;
}

export default function FilterPills({ tags, selectedTag, onTagSelect }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagSelect(undefined)}
        className={`px-3 py-[10px] rounded-full text-[13px] font-bold cursor-pointer transition-all ${
          !selectedTag
            ? 'bg-text text-surface border border-text'
            : 'bg-surface text-muted border border-border hover:bg-bg'
        }`}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagSelect(selectedTag === tag ? undefined : tag)}
          className={`px-3 py-[10px] rounded-full text-[13px] font-bold cursor-pointer transition-all ${
            selectedTag === tag
              ? 'bg-text text-surface border border-text'
              : 'bg-surface text-muted border border-border hover:bg-bg'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
