"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("lo-LA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initialsFromEmail(email) {
  return (email || "?").slice(0, 2).toUpperCase();
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!user || !supabase) {
      setProfileLoading(false);
      return;
    }

    let cancelled = false;

    Promise.all([
      supabase.from("profiles").select("role, balance, created_at").eq("id", user.id).single(),
      supabase
        .from("wallet_transactions")
        .select("id, amount, note, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]).then(([profileRes, txRes]) => {
      if (cancelled) return;
      if (profileRes.data) setProfile(profileRes.data);
      if (txRes.data) setTransactions(txRes.data);
      setProfileLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl p-4 md:p-8">
        {loading ? (
          <div className="text-sm text-ink-muted mt-6">ກຳລັງໂຫຼດ...</div>
        ) : !user ? (
          <div className="bg-canvas border border-surface-2 rounded-md p-6 mt-6">
            <h1 className="text-lg font-semibold text-ink mb-1">ຍັງບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ</h1>
            <p className="text-sm text-ink-muted mb-4">ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອເບິ່ງບັນຊີຂອງທ່ານ</p>
            <Link
              href="/login"
              className="inline-block font-semibold text-sm rounded-full px-5 py-2 bg-primary text-canvas"
            >
              ເຂົ້າສູ່ລະບົບ
            </Link>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {/* profile header */}
            <div className="bg-canvas border border-surface-2 rounded-md p-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-canvas flex items-center justify-center font-bold text-lg flex-shrink-0">
                {initialsFromEmail(user.email)}
              </div>
              <div className="min-w-0">
                <div className="text-base font-semibold text-ink truncate">{user.email}</div>
                <div className="text-xs text-muted">
                  ສະມາຊິກຕັ້ງແຕ່ {formatDate(profile?.created_at ?? user.created_at)}
                </div>
                {profile?.role === "admin" && (
                  <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-scarcity text-ink">
                    ຜູ້ດູແລລະບົບ
                  </span>
                )}
              </div>
            </div>

            {/* wallet */}
            <div className="bg-canvas border border-surface-2 rounded-md p-6">
              <div className="text-sm text-ink-muted mb-1">ຍອດເງິນໃນບັນຊີ</div>
              {profileLoading ? (
                <div className="text-sm text-ink-muted">ກຳລັງໂຫຼດ...</div>
              ) : (
                <div className="text-2xl font-bold text-primary">
                  {Number(profile?.balance ?? 0).toLocaleString("en-US")} ₭
                </div>
              )}
            </div>

            {/* recent activity */}
            <div className="bg-canvas border border-surface-2 rounded-md p-6">
              <div className="text-sm font-semibold text-ink mb-3">ຄວາມເຄື່ອນໄຫວຫຼ້າສຸດ</div>
              {transactions.length === 0 ? (
                <p className="text-sm text-ink-muted">ຍັງບໍ່ມີຄວາມເຄື່ອນໄຫວ</p>
              ) : (
                <div className="space-y-2">
                  {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between text-sm">
                      <div>
                        <span
                          className={`font-semibold ${
                            t.amount >= 0 ? "text-green-700" : "text-red-600"
                          }`}
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
              )}
            </div>

            {/* quick links */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/cart"
                className="bg-canvas border border-surface-2 rounded-md p-4 text-center text-sm font-medium text-ink hover:border-primary"
              >
                ກະຕ່າສິນຄ້າ
              </Link>
              <Link
                href="/"
                className="bg-canvas border border-surface-2 rounded-md p-4 text-center text-sm font-medium text-ink hover:border-primary"
              >
                ຊື້ສິນຄ້າຕໍ່
              </Link>
            </div>

            <button
              onClick={signOut}
              className="w-full h-11 rounded-full border border-primary text-primary bg-canvas font-semibold text-sm"
            >
              ອອກຈາກລະບົບ
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
