"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import { AuthInput, AuthButton } from "@/components/AuthForm";
import { supabase } from "@/lib/supabaseClient";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError("ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ Supabase — ກວດ .env.local");
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push(redirect);
  }

  return (
    <div className="bg-canvas border border-surface-2 rounded-md p-6 mt-6">
      <h1 className="text-lg font-semibold text-ink mb-1">ເຂົ້າສູ່ລະບົບ</h1>
      <p className="text-sm text-ink-muted mb-6">ເຂົ້າສູ່ບັນຊີ Click Zone ຂອງທ່ານ</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <AuthInput
          type="email"
          placeholder="ອີເມວ"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="ລະຫັດຜ່ານ"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <AuthButton type="submit" disabled={loading}>
          {loading ? "ກຳລັງເຂົ້າສູ່ລະບົບ..." : "ເຂົ້າສູ່ລະບົບ"}
        </AuthButton>
      </form>

      <p className="text-sm text-ink-muted mt-4">
        ຍັງບໍ່ມີບັນຊີ?{" "}
        <Link href="/signup" className="text-primary font-medium">
          ສະໝັກສະມາຊິກ
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-md p-4 md:p-8">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
