"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryManager({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleAdd(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image_url: imageUrl }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "ບັນທຶກບໍ່ສຳເລັດ");
      return;
    }

    setCategories((prev) => [...prev, data.category]);
    setName("");
    setImageUrl("");
    router.refresh();
  }

  async function handleDelete(id) {
    if (!confirm("ລຶບໝວດໝູ່ນີ້?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="bg-canvas border border-surface-2 rounded-md p-4 space-y-3"
      >
        <div className="font-semibold text-ink">ເພີ່ມໝວດໝູ່</div>
        <input
          placeholder="ຊື່ໝວດໝູ່"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />
        <input
          placeholder="ລິ້ງຮູບ/ໂລໂກ້ (URL) — ບໍ່ບັງຄັບ"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="h-10 px-5 rounded-full bg-primary text-canvas font-semibold text-sm disabled:opacity-60"
        >
          {saving ? "ກຳລັງບັນທຶກ..." : "ເພີ່ມ"}
        </button>
      </form>

      <div className="space-y-2">
        {categories.length === 0 && (
          <p className="text-sm text-ink-muted">ຍັງບໍ່ມີໝວດໝູ່</p>
        )}
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 bg-canvas border border-surface-2 rounded-md p-3"
          >
            <div className="w-10 h-10 rounded-full bg-surface-1 overflow-hidden flex-shrink-0 flex items-center justify-center text-xs text-muted">
              {c.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                "🏷️"
              )}
            </div>
            <div className="flex-1 text-sm text-ink">{c.name}</div>
            <button onClick={() => handleDelete(c.id)} className="text-xs text-red-600 underline">
              ລຶບ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
