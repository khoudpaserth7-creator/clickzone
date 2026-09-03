import Link from "next/link";
import Nav from "@/components/Nav";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import CategoryManager from "@/components/admin/CategoryManager";
import { getCategories } from "@/lib/categories";

export default async function AdminCategoriesPage() {
  if (!isAdminAuthed()) {
    return (
      <main className="bg-surface-1 min-h-screen">
        <Nav />
        <AdminLoginForm />
      </main>
    );
  }

  const categories = await getCategories();

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl p-4 md:p-8">
        <Link href="/admin" className="text-sm text-primary mb-4 inline-block">
          ← ກັບໜ້າຫຼັກ admin
        </Link>
        <h1 className="text-lg font-semibold text-ink mb-4">ຈັດການໝວດໝູ່</h1>
        <CategoryManager initialCategories={categories} />
      </div>
    </main>
  );
}
