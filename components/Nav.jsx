"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CartContext";

export default function Nav() {
  const { user } = useAuth();
  const { count } = useCart();

  return (
    <div>
      <div className="flex justify-between items-center px-4 md:px-8 h-7 bg-primary-on-nav text-canvas text-xs">
        <span>ຕິດຕໍ່ພວກເຮົາ 24/7</span>
        <span>Facebook • Click Zone</span>
      </div>

      <div className="px-4 md:px-8 py-3 bg-primary">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <div className="flex items-center justify-between md:justify-start md:gap-8">
            <Link
              href="/"
              className="inline-block bg-scarcity text-ink font-extrabold text-sm px-2.5 py-1 rounded-sm -rotate-3"
            >
              Click Zone
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-canvas text-sm">
              <Link href="/">ໜ້າຫຼັກ</Link>
              <Link href="/#categories">ໝວດສິນຄ້າ</Link>
              <Link href="/#products">ໂປຣໂມຊັນ</Link>
            </nav>

            <div className="flex md:hidden items-center gap-4 text-canvas">
              <CartLink count={count} />
              <AccountLink user={user} />
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 h-10 md:h-11 bg-canvas rounded-sm flex-1 md:max-w-md">
            <Search size={16} className="text-muted" />
            <input
              placeholder="ຄົ້ນຫາສິນຄ້າ, ແບຣນ..."
              className="text-sm w-full outline-none text-ink bg-transparent"
            />
          </div>

          <div className="hidden md:flex items-center gap-5 text-canvas ml-auto">
            <CartLink count={count} />
            <AccountLink user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CartLink({ count }) {
  return (
    <Link href="/cart" aria-label="ກະຕ່າສິນຄ້າ" className="relative">
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-scarcity text-ink text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

function AccountLink({ user }) {
  return (
    <Link href={user ? "/account" : "/login"} aria-label="ບັນຊີ">
      <User size={20} />
    </Link>
  );
}
