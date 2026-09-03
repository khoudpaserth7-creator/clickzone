"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { AuthInput, AuthButton } from "@/components/AuthForm";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError("ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ Supabase — ກວດ .env.local");
      return;
    }
    if (password.length < 6) {
      setError("ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ໂຕອັກສອນ");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setDone(true);
  }

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-md p-4 md:p-8">
        <div className="bg-canvas border border-surface-2 rounded-md p-6 mt-6">
          <h1 className="text-lg font-semibold text-ink mb-1">ສະໝັກສະມາຊິກ</h1>
          <p className="text-sm text-ink-muted mb-6">ສ້າງບັນຊີ Click Zone ຂອງທ່ານ</p>

          {done ? (
            <div className="text-sm text-ink">
              ສະໝັກສຳເລັດ! ກວດອີເມວຂອງທ່ານເພື່ອຢືນຢັນບັນຊີ, ຈາກນັ້ນ{" "}
              <Link href="/login" className="text-primary font-medium">
                ເຂົ້າສູ່ລະບົບ
              </Link>
              ໄດ້ເລີຍ.
            </div>
          ) : (
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
                placeholder="ລະຫັດຜ່ານ (ຢ່າງໜ້ອຍ 6 ໂຕ)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <AuthButton type="submit" disabled={loading}>
                {loading ? "ກຳລັງສະໝັກ..." : "ສະໝັກສະມາຊິກ"}
              </AuthButton>
            </form>
          )}

          <p className="text-sm text-ink-muted mt-4">
            ມີບັນຊີແລ້ວ?{" "}
            <Link href="/login" className="text-primary font-medium">
              ເຂົ້າສູ່ລະບົບ
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
