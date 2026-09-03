import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const priceFormatted = Number(product.price).toLocaleString("en-US");
  const thumb = product.images?.[0];
  const outOfStock = (product.stock ?? 0) <= 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-md p-3 bg-canvas border border-surface-2 hover:border-primary transition-colors"
    >
      <div className="relative rounded-sm bg-surface-1 mb-2 aspect-square overflow-hidden">
        {thumb ? (
          <Image
            src={thumb}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted">
            {product.category?.name ?? ""}
          </div>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-canvas/70 flex items-center justify-center text-xs font-semibold text-ink">
            ສິນຄ້າໝົດ
          </div>
        )}
      </div>
      <div className="text-sm font-semibold leading-snug mb-1 text-ink line-clamp-2">
        {product.name}
      </div>
      <div className="text-xs mb-1 text-muted">{product.category?.name}</div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-primary">{priceFormatted} ₭</div>
        {!outOfStock && product.stock <= 5 && (
          <div className="text-[11px] text-scarcity bg-ink px-1.5 py-0.5 rounded-sm">
            ເຫຼືອ {product.stock}
          </div>
        )}
      </div>
    </Link>
  );
}
