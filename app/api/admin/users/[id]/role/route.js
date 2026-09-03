import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "ບໍ່ມີສິດ" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ service role key" }, { status: 500 });
  }

  const { role } = await request.json();
  if (!["user", "admin"].includes(role)) {
    return NextResponse.json({ error: "ບົດບາດບໍ່ຖືກຕ້ອງ" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("profiles")
    .upsert({ id: params.id, role }, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
