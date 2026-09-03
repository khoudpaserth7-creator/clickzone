import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "ບໍ່ມີສິດ" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ service role key" }, { status: 500 });
  }

  const body = await request.json();
  const { name, description, price, stock, images, category_id } = body;

  const { data, error } = await supabaseAdmin
    .from("products")
    .update({
      name,
      description: description || null,
      price: Number(price),
      stock: Number(stock) || 0,
      images: Array.isArray(images) ? images.filter(Boolean) : [],
      category_id: category_id || null,
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ product: data });
}

export async function DELETE(_request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "ບໍ່ມີສິດ" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ service role key" }, { status: 500 });
  }

  const { error } = await supabaseAdmin.from("products").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
