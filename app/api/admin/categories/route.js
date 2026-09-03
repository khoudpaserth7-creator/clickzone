import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "ບໍ່ມີສິດ" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ service role key" }, { status: 500 });
  }

  const { name, image_url } = await request.json();
  if (!name) {
    return NextResponse.json({ error: "ຕ້ອງໃສ່ຊື່ໝວດໝູ່" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("categories")
    .insert({ name, image_url: image_url || null })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ category: data });
}
