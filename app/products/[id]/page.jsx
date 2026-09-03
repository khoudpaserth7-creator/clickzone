import Nav from "@/components/Nav";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-[1280px] p-4 md:p-8">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}
