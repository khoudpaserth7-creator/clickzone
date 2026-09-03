"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  function handleCheckout() {
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }
    // checkout flow comes later
  }

  return (
    <main className="bg-surface-1 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-[900px] p-4 md:p-8">
        <h1 className="text-lg md:text-xl font-semibold text-ink mb-4">ກະຕ່າສິນຄ້າ</h1>

        {items.length === 0 ? (
          <div className="bg-canvas border border-surface-2 rounded-md p-8 text-center">
            <p className="text-sm text-ink-muted mb-4">ຍັງບໍ່ມີສິນຄ້າໃນກະຕ່າ</p>
            <Link
              href="/"
              className="inline-block font-semibold text-sm rounded-full px-5 py-2 bg-primary text-canvas"
            >
              ເລືອກຊື້ສິນຄ້າ
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-canvas border border-surface-2 rounded-md p-3"
              >
                <div className="w-16 h-16 rounded-sm bg-surface-1 flex items-center justify-center text-[10px] text-muted flex-shrink-0">
                  {item.category}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{item.name}</div>
                  <div className="text-sm text-primary font-bold">
                    {Number(item.price).toLocaleString("en-US")} ₭
                  </div>
                </div>
                <div className="flex items-center border border-hairline rounded-sm">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-8 h-8 text-ink"
                    aria-label="ຫຼຸດຈຳນວນ"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-8 h-8 text-ink"
                    aria-label="ເພີ່ມຈຳນວນ"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-muted underline flex-shrink-0"
                >
                  ລຶບ
                </button>
              </div>
            ))}

            <div className="bg-canvas border border-surface-2 rounded-md p-4 flex items-center justify-between">
              <span className="text-sm text-ink-muted">ລວມທັງໝົດ</span>
              <span className="text-lg font-bold text-primary">
                {total.toLocaleString("en-US")} ₭
              </span>
            </div>

            <button
              onClick={handleCheckout}
              title={
                user ? "ລະບົບຊຳລະເງິນຈະເພີ່ມໃນຂັ້ນຕອນຕໍ່ໄປ" : "ເຂົ້າສູ່ລະບົບກ່ອນສັ່ງຊື້"
              }
              className="w-full h-12 rounded-full bg-primary text-canvas font-semibold text-sm"
            >
              {user ? "ດຳເນີນການສັ່ງຊື້ (ໄວໆນີ້)" : "ເຂົ້າສູ່ລະບົບເພື່ອສັ່ງຊື້"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
