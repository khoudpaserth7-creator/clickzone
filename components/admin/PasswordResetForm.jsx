"use client";

import { useState } from "react";

export default function PasswordResetForm({ userId }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setDone(false);
    setSaving(true);

    const res = await fetch(`/api/admin/users/${userId}/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "ປ່ຽນລະຫັດຜ່ານບໍ່ສຳເລັດ");
      return;
    }

    setPassword("");
    setDone(true);
  }

  return (
    <div className="bg-canvas border border-surface-2 rounded-md p-4">
      <div className="font-semibold text-ink mb-3">ປ່ຽນລະຫັດຜ່ານໃຫ້ຜູ້ໃຊ້</div>
      <form onSubmit={submit} className="space-y-2">
        <input
          type="password"
          placeholder="ລະຫັດຜ່ານໃໝ່ (ຢ່າງໜ້ອຍ 6 ໂຕ)"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        {done && <p className="text-xs text-green-700">ປ່ຽນລະຫັດຜ່ານສຳເລັດແລ້ວ</p>}
        <button
          type="submit"
          disabled={saving}
          className="h-10 px-5 rounded-full bg-primary text-canvas font-semibold text-sm disabled:opacity-60"
        >
          {saving ? "ກຳລັງບັນທຶກ..." : "ປ່ຽນລະຫັດຜ່ານ"}
        </button>
      </form>
    </div>
  );
}
