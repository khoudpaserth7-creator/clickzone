import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ຍັງບໍ່ໄດ້ຕັ້ງ ADMIN_PASSWORD ໃນ environment variables" },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "true", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
