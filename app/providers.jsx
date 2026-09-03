"use client";

import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
