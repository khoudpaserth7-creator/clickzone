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

  const { password } = await request.json();
  if (!password || password.length < 6) {
    return NextResponse.json({ error: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ໂຕ" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(params.id, { password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
