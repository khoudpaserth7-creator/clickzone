"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleSelect({ userId, currentRole }) {
  const [role, setRole] = useState(currentRole);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleChange(e) {
    const newRole = e.target.value;
    setError(null);
    setSaving(true);

    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "ປ່ຽນບົດບາດບໍ່ສຳເລັດ");
      return;
    }

    setRole(newRole);
    router.refresh();
  }

  return (
    <div className="bg-canvas border border-surface-2 rounded-md p-4">
      <div className="font-semibold text-ink mb-3">ບົດບາດ</div>
      <select
        value={role}
        onChange={handleChange}
        disabled={saving}
        className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary bg-canvas"
      >
        <option value="user">ຜູ້ໃຊ້ທົ່ວໄປ</option>
        <option value="admin">ຜູ້ດູແລລະບົບ</option>
      </select>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      <p className="text-xs text-muted mt-2">
        ໝາຍເຫດ: ບົດບາດນີ້ເປັນປ້າຍກຳກັບໃນລະບົບເທົ່ານັ້ນ — ຍັງບໍ່ໄດ້ໃຫ້ສິດເຂົ້າ /admin ໂດຍກົງ
        (ຕອນນີ້ /admin ຍັງລ໋ອກດ້ວຍລະຫັດຜ່ານ admin ແຍກຕ່າງຫາກ)
      </p>
    </div>
  );
}
