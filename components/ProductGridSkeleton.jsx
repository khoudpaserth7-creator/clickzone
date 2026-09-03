export default function ProductGridSkeleton() {
  return (
    <div>
      <div className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-ink">ສິນຄ້າຍອດນິຍົມ</div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md bg-surface-2 animate-pulse aspect-[0.8/1]"
          />
        ))}
      </div>
    </div>
  );
}
