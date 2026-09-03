import { getCategories } from "@/lib/categories";

const FALLBACK_ICON = "🏷️";

export default async function CategoryRail() {
  const categories = await getCategories();

  return (
    <div>
      <div className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-ink">ໝວດສິນຄ້າ</div>
      <div className="flex md:justify-between gap-4 md:gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex flex-col items-center gap-1 flex-shrink-0 w-16 md:w-20 snap-start"
          >
            <div className="rounded-full flex items-center justify-center text-xl md:text-2xl w-14 h-14 md:w-20 md:h-20 bg-surface-2 overflow-hidden">
              {c.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image_url} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                FALLBACK_ICON
              )}
            </div>
            <span className="text-xs text-center text-ink-muted">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
