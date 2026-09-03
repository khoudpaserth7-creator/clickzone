import Link from "next/link";
import Nav from "@/components/Nav";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import ProductManager from "@/components/admin/ProductManager";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

export default async function AdminProductsPage() {
  if (!isAdminAuthed()) {
    return (
      <main className="bg-surface-1 min-h-screen">
        <Nav />
        <AdminLoginForm />
      </main>
    );
  }

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl p-4 md:p-8">
        <Link href="/admin" className="text-sm text-primary mb-4 inline-block">
          ← ກັບໜ້າຫຼັກ admin
        </Link>
        <h1 className="text-lg font-semibold text-ink mb-4">ຈັດການສິນຄ້າ</h1>
        <ProductManager initialProducts={products} categories={categories} />
      </div>
    </main>
  );
}
