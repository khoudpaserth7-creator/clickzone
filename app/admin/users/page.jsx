import Link from "next/link";
import Nav from "@/components/Nav";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("lo-LA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminUsersPage() {
  if (!isAdminAuthed()) {
    return (
      <main className="bg-surface-1 min-h-screen">
        <Nav />
        <AdminLoginForm />
      </main>
    );
  }

  let users = [];
  let loadError = null;

  if (!supabaseAdmin) {
    loadError = "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ SUPABASE_SERVICE_ROLE_KEY";
  } else {
    const [{ data: authData, error: authError }, { data: profiles, error: profileError }] =
      await Promise.all([
        supabaseAdmin.auth.admin.listUsers({ perPage: 200 }),
        supabaseAdmin.from("profiles").select("id, role, balance"),
      ]);

    if (authError) {
      loadError = authError.message;
    } else {
      const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
      users = authData.users
        .map((u) => ({
          id: u.id,
          email: u.email,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at,
          role: profileMap.get(u.id)?.role || "user",
          balance: profileMap.get(u.id)?.balance ?? 0,
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    if (profileError && !loadError) loadError = profileError.message;
  }

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl p-4 md:p-8">
        <Link href="/admin" className="text-sm text-primary mb-4 inline-block">
          ← ກັບໜ້າຫຼັກ admin
        </Link>
        <h1 className="text-lg font-semibold text-ink mb-4">ຈັດການສະມາຊິກ</h1>

        {loadError && <p className="text-sm text-red-600 mb-4">{loadError}</p>}

        <div className="space-y-2">
          {users.map((u) => (
            <Link
              key={u.id}
              href={`/admin/users/${u.id}`}
              className="block bg-canvas border border-surface-2 rounded-md p-4 hover:border-primary"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-ink">{u.email}</div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    u.role === "admin" ? "bg-scarcity text-ink" : "bg-surface-2 text-ink-muted"
                  }`}
                >
                  {u.role === "admin" ? "ຜູ້ດູແລລະບົບ" : "ຜູ້ໃຊ້ທົ່ວໄປ"}
                </span>
              </div>
              <div className="text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
                <span>ສະໝັກ: {formatDate(u.created_at)}</span>
                <span>ເຄື່ອນໄຫວລ່າສຸດ: {formatDate(u.last_sign_in_at)}</span>
                <span className="text-primary font-semibold">
                  ຍອດເງິນ: {Number(u.balance).toLocaleString("en-US")} ₭
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
