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

  const { amount, note } = await request.json();
  const numericAmount = Number(amount);

  if (!numericAmount || Number.isNaN(numericAmount)) {
    return NextResponse.json({ error: "ຈຳນວນເງິນບໍ່ຖືກຕ້ອງ" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.rpc("admin_adjust_balance", {
    p_user_id: params.id,
    p_amount: numericAmount,
    p_note: note || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("balance")
    .eq("id", params.id)
    .single();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ balance: profile.balance });
}
