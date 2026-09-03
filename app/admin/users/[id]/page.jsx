import Link from "next/link";
import Nav from "@/components/Nav";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import BalanceAdjustForm from "@/components/admin/BalanceAdjustForm";
import PasswordResetForm from "@/components/admin/PasswordResetForm";
import RoleSelect from "@/components/admin/RoleSelect";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

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

export default async function AdminUserDetailPage({ params }) {
  if (!isAdminAuthed()) {
    return (
      <main className="bg-surface-1 min-h-screen">
        <Nav />
        <AdminLoginForm />
      </main>
    );
  }

  if (!supabaseAdmin) {
    return (
      <main className="bg-surface-1 min-h-screen">
        <Nav />
        <div className="mx-auto max-w-2xl p-8 text-sm text-red-600">
          ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ SUPABASE_SERVICE_ROLE_KEY
        </div>
      </main>
    );
  }

  const [{ data: userData, error: userError }, { data: profile }, { data: transactions }] =
    await Promise.all([
      supabaseAdmin.auth.admin.getUserById(params.id),
      supabaseAdmin.from("profiles").select("role, balance").eq("id", params.id).single(),
      supabaseAdmin
        .from("wallet_transactions")
        .select("id, amount, note, created_at")
        .eq("user_id", params.id)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

  if (userError || !userData?.user) notFound();
  const user = userData.user;

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl p-4 md:p-8">
        <Link href="/admin/users" className="text-sm text-primary mb-4 inline-block">
          ← ກັບລາຍຊື່ສະມາຊິກ
        </Link>

        <div className="bg-canvas border border-surface-2 rounded-md p-4 mb-4">
          <h1 className="text-lg font-semibold text-ink mb-1">{user.email}</h1>
          <div className="text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
            <span>ສະໝັກ: {formatDate(user.created_at)}</span>
            <span>ເຄື່ອນໄຫວລ່າສຸດ: {formatDate(user.last_sign_in_at)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <BalanceAdjustForm userId={user.id} currentBalance={profile?.balance ?? 0} />
          <RoleSelect userId={user.id} currentRole={profile?.role ?? "user"} />
        </div>

        <div className="mb-4">
          <PasswordResetForm userId={user.id} />
        </div>

        <div className="bg-canvas border border-surface-2 rounded-md p-4">
          <div className="font-semibold text-ink mb-3">ປະຫວັດການປັບຍອດເງິນ</div>
          {(!transactions || transactions.length === 0) && (
            <p className="text-sm text-ink-muted">ຍັງບໍ່ມີປະຫວັດ</p>
          )}
          <div className="space-y-2">
            {transactions?.map((t) => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <div>
                  <span
                    className={`font-semibold ${t.amount >= 0 ? "text-green-700" : "text-red-600"}`}
                  >
                    {t.amount >= 0 ? "+" : ""}
                    {Number(t.amount).toLocaleString("en-US")} ₭
                  </span>
                  {t.note && <span className="text-muted ml-2">({t.note})</span>}
                </div>
                <span className="text-xs text-muted">{formatDate(t.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
