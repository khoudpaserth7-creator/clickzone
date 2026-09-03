import { supabase } from "./supabaseClient";

// Used until real products exist in Supabase, or if a fetch fails —
// keeps the storefront always renderable. Shape matches the new schema:
// images (array), stock, category (joined object with name/image_url).
export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "ຫູຟັງ Bluetooth ໄຮ້ສາຍ",
    description: "ຫູຟັງໄຮ້ສາຍ ສຽງໃສ ຕັດສຽງລົບກວນ ໃຊ້ໄດ້ຕໍ່ເນື່ອງ 24 ຊົ່ວໂມງ ເຊື່ອມຕໍ່ Bluetooth 5.3",
    price: 185000,
    stock: 12,
    images: [],
    category: { name: "ຫູຟັງ" },
  },
  {
    id: "2",
    name: "ໂທລະສັບ ຈໍ 6.7 ນິ້ວ 128GB",
    description: "ຈໍ AMOLED 6.7 ນິ້ວ ຄວາມຈຸ 128GB ກ້ອງຫຼັງ 3 ໂຕ ແບັດເຕີຣີ 5000mAh",
    price: 2850000,
    stock: 4,
    images: [],
    category: { name: "ມືຖື" },
  },
  {
    id: "3",
    name: "ໂມງອັດສະລິຍະ ວັດຊີບພະຈອນ",
    description: "ໂມງອັດສະລິຍະ ວັດຊີບພະຈອນ ວັດອົກຊີເຈນໃນເລືອດ ກັນນ້ຳ IP68",
    price: 420000,
    stock: 0,
    images: [],
    category: { name: "ໂມງ" },
  },
  {
    id: "4",
    name: "ໂນ໊ດບຸກ 14 ນິ້ວ SSD 512GB",
    description: "RAM 16GB SSD 512GB ນ້ຳໜັກເບົາ 1.3kg ເໝາະສຳລັບການເຮັດວຽກ",
    price: 6950000,
    stock: 7,
    images: [],
    category: { name: "ຄອມພິວເຕີ" },
  },
];

export async function getProducts() {
  if (!supabase) return MOCK_PRODUCTS;

  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, stock, images, category:categories(name, image_url)")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return MOCK_PRODUCTS;
  }

  return data;
}

export async function getProductById(id) {
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, description, price, stock, images, category:categories(name, image_url)")
      .eq("id", id)
      .single();

    if (!error && data) return data;
  }

  return MOCK_PRODUCTS.find((p) => String(p.id) === String(id)) ?? null;
}
