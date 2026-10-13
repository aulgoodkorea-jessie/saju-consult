export function ChoiceCard({
  title,
  body,
  selected,
  accent = "pine",
  image,
  onSelect,
}: {
  title: string;
  body: string;
  selected: boolean;
  accent?: "pine" | "lilac";
  image?: { src: string; alt: string };
  onSelect: () => void;
}) {
  const border = selected ? (accent === "lilac" ? "border-lilac" : "border-pine") : "border-line";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`block min-h-12 w-full rounded-card border bg-paper p-4 text-left ${border}`}
    >
      <span className="flex items-center gap-3">
        {image ? (
          <img src={image.src} alt={image.alt} className="h-16 w-16 shrink-0 rounded-card object-cover" />
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-3">
            <span className="text-lg font-semibold">{title}</span>
            {selected ? <span className="text-sm">✓ 선택됨</span> : null}
          </span>
          <span className="mt-1 block">{body}</span>
        </span>
      </span>
    </button>
  );
}
