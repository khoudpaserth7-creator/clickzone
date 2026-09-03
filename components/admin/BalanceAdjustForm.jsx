"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BalanceAdjustForm({ userId, currentBalance }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [balance, setBalance] = useState(currentBalance);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch(`/api/admin/users/${userId}/balance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, note }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "ປັບຍອດເງິນບໍ່ສຳເລັດ");
      return;
    }

    setBalance(data.balance);
    setAmount("");
    setNote("");
    router.refresh();
  }

  return (
    <div className="bg-canvas border border-surface-2 rounded-md p-4">
      <div className="font-semibold text-ink mb-1">ຍອດເງິນ</div>
      <div className="text-2xl font-bold text-primary mb-3">
        {Number(balance).toLocaleString("en-US")} ₭
      </div>
      <form onSubmit={submit} className="space-y-2">
        <input
          type="number"
          step="0.01"
          placeholder="ຈຳນວນ (ໃສ່ລົບເພື່ອຫັກ ເຊັ່ນ -5000)"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />
        <input
          placeholder="ໝາຍເຫດ (ບໍ່ບັງຄັບ)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="h-10 px-5 rounded-full bg-primary text-canvas font-semibold text-sm disabled:opacity-60"
        >
          {saving ? "ກຳລັງບັນທຶກ..." : "ປັບຍອດເງິນ"}
        </button>
      </form>
    </div>
  );
}
