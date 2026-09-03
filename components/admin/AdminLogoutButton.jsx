"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="text-sm text-muted underline">
      ອອກຈາກລະບົບ admin
    </button>
  );
}
