import Link from "next/link";
import Nav from "@/components/Nav";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminHome() {
  if (!isAdminAuthed()) {
    return (
      <main className="bg-surface-1 min-h-screen">
        <Nav />
        <AdminLoginForm />
      </main>
    );
  }

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-ink">ຈັດການຮ້ານ Click Zone</h1>
          <AdminLogoutButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/products"
            className="block bg-canvas border border-surface-2 rounded-md p-5 hover:border-primary"
          >
            <div className="font-semibold text-ink mb-1">ສິນຄ້າ</div>
            <div className="text-sm text-ink-muted">ເພີ່ມ / ແກ້ໄຂ / ລຶບສິນຄ້າ, ຮູບ, ລາຄາ, ສະຕັອກ</div>
          </Link>
          <Link
            href="/admin/categories"
            className="block bg-canvas border border-surface-2 rounded-md p-5 hover:border-primary"
          >
            <div className="font-semibold text-ink mb-1">ໝວດໝູ່</div>
            <div className="text-sm text-ink-muted">ເພີ່ມ / ແກ້ໄຂ / ລຶບໝວດໝູ່ ແລະໂລໂກ້</div>
          </Link>
          <Link
            href="/admin/users"
            className="block bg-canvas border border-surface-2 rounded-md p-5 hover:border-primary sm:col-span-2"
          >
            <div className="font-semibold text-ink mb-1">ສະມາຊິກ</div>
            <div className="text-sm text-ink-muted">
              ປັບຍອດເງິນ, ປ່ຽນລະຫັດຜ່ານ, ເບິ່ງວັນສະໝັກ/ເຄື່ອນໄຫວ, ຕັ້ງບົດບາດ admin/ຜູ້ໃຊ້ທົ່ວໄປ
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
