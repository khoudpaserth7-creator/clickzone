import { getProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <div>
      <div className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-ink">ສິນຄ້າຍອດນິຍົມ</div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
