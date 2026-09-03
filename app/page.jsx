import { Suspense } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MembershipCard from "@/components/MembershipCard";
import CategoryRail from "@/components/CategoryRail";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function HomePage() {
  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-[1280px] p-4 md:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
          <Hero />
          <MembershipCard />
        </div>
        <div id="categories">
          <CategoryRail />
        </div>
        <div id="products">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
