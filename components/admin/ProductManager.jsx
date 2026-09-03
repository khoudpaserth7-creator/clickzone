"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category_id: "",
  images: [""],
};

export default function ProductManager({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function updateImage(i, value) {
    setForm((f) => {
      const images = [...f.images];
      images[i] = value;
      return { ...f, images };
    });
  }

  function addImageField() {
    setForm((f) => ({ ...f, images: [...f.images, ""] }));
  }

  function removeImageField(i) {
    setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images: form.images.filter(Boolean),
        category_id: form.category_id || null,
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "ບັນທຶກບໍ່ສຳເລັດ");
      return;
    }

    const category = categories.find((c) => c.id === data.product.category_id);
    setProducts((prev) => [{ ...data.product, category }, ...prev]);
    setForm(emptyForm);
    router.refresh();
  }

  async function handleDelete(id) {
    if (!confirm("ລຶບສິນຄ້ານີ້?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="bg-canvas border border-surface-2 rounded-md p-4 space-y-3"
      >
        <div className="font-semibold text-ink">ເພີ່ມສິນຄ້າ</div>

        <input
          placeholder="ຊື່ສິນຄ້າ"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
        />

        <textarea
          placeholder="ລາຍລະອຽດສິນຄ້າ"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary resize-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            step="0.01"
            placeholder="ລາຄາ (₭)"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
          />
          <input
            type="number"
            placeholder="ຈຳນວນສະຕັອກ"
            required
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
          />
        </div>

        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary bg-canvas"
        >
          <option value="">ບໍ່ມີໝວດໝູ່</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="space-y-2">
          <div className="text-sm text-ink-muted">ລິ້ງຮູບພາບ (ໃສ່ໄດ້ຫຼາຍລູບ)</div>
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder={`ລິ້ງຮູບທີ ${i + 1}`}
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
                className="flex-1 h-10 px-3 rounded-sm border border-hairline-soft text-sm outline-none focus:border-primary"
              />
              {form.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(i)}
                  className="text-xs text-red-600 px-2"
                >
                  ລຶບ
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-xs text-primary underline"
          >
            + ເພີ່ມລິ້ງຮູບ
          </button>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="h-10 px-5 rounded-full bg-primary text-canvas font-semibold text-sm disabled:opacity-60"
        >
          {saving ? "ກຳລັງບັນທຶກ..." : "ເພີ່ມສິນຄ້າ"}
        </button>
      </form>

      <div className="space-y-2">
        {products.length === 0 && <p className="text-sm text-ink-muted">ຍັງບໍ່ມີສິນຄ້າ</p>}
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 bg-canvas border border-surface-2 rounded-md p-3"
          >
            <div className="w-12 h-12 rounded-sm bg-surface-1 overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] text-muted">
              {p.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                "ບໍ່ມີຮູບ"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink truncate">{p.name}</div>
              <div className="text-xs text-muted">
                {p.category?.name || "ບໍ່ມີໝວດໝູ່"} • ສະຕັອກ {p.stock}
              </div>
            </div>
            <div className="text-sm font-bold text-primary flex-shrink-0">
              {Number(p.price).toLocaleString("en-US")} ₭
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-xs text-red-600 underline flex-shrink-0"
            >
              ລຶບ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
