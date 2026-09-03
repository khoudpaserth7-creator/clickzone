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

  const body = await request.json();
  const { name, description, price, stock, images, category_id } = body;

  if (!name || price === undefined || price === "") {
    return NextResponse.json({ error: "ຕ້ອງໃສ່ຊື່ ແລະລາຄາ" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name,
      description: description || null,
      price: Number(price),
      stock: Number(stock) || 0,
      images: Array.isArray(images) ? images.filter(Boolean) : [],
      category_id: category_id || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ product: data });
}
