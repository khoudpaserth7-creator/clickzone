"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";

export default function ProductDetail({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const priceFormatted = Number(product.price).toLocaleString("en-US");
  const images = product.images?.length ? product.images : [];
  const stock = product.stock ?? 0;
  const outOfStock = stock <= 0;

  function requireLogin() {
    if (!user) {
      router.push(`/login?redirect=/products/${product.id}`);
      return true;
    }
    return false;
  }

  function handleAdd() {
    if (requireLogin()) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category?.name,
        image_url: images[0] ?? null,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    if (requireLogin()) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category?.name,
        image_url: images[0] ?? null,
      },
      qty
    );
    router.push("/cart");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      <div>
        <div className="relative rounded-md bg-surface-1 aspect-square overflow-hidden mb-2">
          {images[activeImage] ? (
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-sm">
              {product.category?.name}
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImage(i)}
                className="relative w-14 h-14 rounded-sm overflow-hidden border"
                style={{ borderColor: i === activeImage ? "#0457c8" : "#e4e5e8" }}
              >
                <Image src={img} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="text-xs font-medium text-muted mb-1">{product.category?.name}</div>
        <h1 className="text-xl md:text-2xl font-semibold text-ink mb-3">{product.name}</h1>
        <div className="text-2xl font-bold text-primary mb-2">{priceFormatted} ₭</div>

        <div className="text-sm mb-4">
          {outOfStock ? (
            <span className="text-red-600 font-medium">ສິນຄ້າໝົດ</span>
          ) : stock <= 5 ? (
            <span className="text-ink-muted">ເຫຼືອໃນສະຕັອກ {stock} ຊິ້ນ</span>
          ) : (
            <span className="text-ink-muted">ມີສິນຄ້າພ້ອມສົ່ງ</span>
          )}
        </div>

        {product.description && (
          <p className="text-sm text-ink-muted leading-relaxed mb-6">{product.description}</p>
        )}

        {!outOfStock && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-ink-muted">ຈຳນວນ</span>
            <div className="flex items-center border border-hairline rounded-sm">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-ink"
                aria-label="ຫຼຸດຈຳນວນ"
              >
                −
              </button>
              <span className="w-9 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(stock, q + 1))}
                className="w-9 h-9 text-ink"
                aria-label="ເພີ່ມຈຳນວນ"
              >
                +
              </button>
            </div>
          </div>
        )}

        {!user && (
          <p className="text-xs text-muted mb-3">ຕ້ອງເຂົ້າສູ່ລະບົບກ່ອນຈຶ່ງຈະສັ່ງຊື້ໄດ້</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="font-semibold text-sm rounded-full px-6 py-3 bg-primary text-canvas disabled:opacity-50"
          >
            ຊື້ເລີຍ
          </button>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="font-semibold text-sm rounded-full px-6 py-3 border border-primary text-primary bg-canvas disabled:opacity-50"
          >
            {added ? "ເພີ່ມແລ້ວ ✓" : "ໃສ່ກະຕ່າ"}
          </button>
        </div>
      </div>
    </div>
  );
}
