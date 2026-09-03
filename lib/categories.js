import { supabase } from "./supabaseClient";

export const MOCK_CATEGORIES = [
  { id: "c1", name: "ມືຖື", image_url: null },
  { id: "c2", name: "ຄອມພິວເຕີ", image_url: null },
  { id: "c3", name: "ຫູຟັງ", image_url: null },
  { id: "c4", name: "ໂທລະທັດ", image_url: null },
  { id: "c5", name: "ໂມງ", image_url: null },
  { id: "c6", name: "ອຸປະກອນເສີມ", image_url: null },
];

export async function getCategories() {
  if (!supabase) return MOCK_CATEGORIES;

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, image_url")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return MOCK_CATEGORIES;
  }

  return data;
}
