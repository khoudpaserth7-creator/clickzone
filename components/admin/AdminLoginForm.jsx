"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ");
      return;
    }
    router.refresh();
  }

  return (
    <div className="max-w-sm mx-auto mt-16 bg-canvas border border-surface-2 rounded-md p-6">
      <h1 className="text-lg font-semibold text-ink mb-1">ຜູ້ດູແລລະບົບ</h1>
      <p className="text-sm text-ink-muted mb-6">ໃສ່ລະຫັດຜ່ານ admin ເພື່ອເຂົ້າໃຊ້ງານ</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="ລະຫັດຜ່ານ admin"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-full bg-primary text-canvas font-semibold text-sm disabled:opacity-60"
        >
          {loading ? "ກຳລັງກວດສອບ..." : "ເຂົ້າສູ່ລະບົບ"}
        </button>
      </form>
    </div>
  );
}
