import { memo } from "react";

type TagFilterProps = {
  tags: string[];
  activeTag: string;
  onChange: (tag: string) => void;
};

function TagFilter({ tags, activeTag, onChange }: TagFilterProps) {
  return (
    <div aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = tag === activeTag;

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            aria-pressed={isActive}
            className={`rounded-xs border px-4 py-2 text-xs font-medium transition duration-fast focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 ${
              isActive
                ? "border-accent bg-accent text-on-dark"
                : "border-soft bg-card text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export default memo(TagFilter);
