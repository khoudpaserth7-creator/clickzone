# Click Zone

ເວັບຂາຍສິນຄ້າອອນລາຍ (Next.js + Tailwind CSS + Supabase)

## Setup

```bash
npm install
```

`.env.local` ມີຄ່າຫຼັກໄວ້ໃຫ້ແລ້ວ — ແຕ່ **ຕ້ອງເພີ່ມ 2 ຄ່ານີ້ເອງກ່ອນໃຊ້ລະບົບ admin**:

- `SUPABASE_SERVICE_ROLE_KEY` — Supabase Dashboard > Project Settings > API > `service_role` (secret)
- `ADMIN_PASSWORD` — ຕັ້ງລະຫັດຜ່ານເອງສຳລັບເຂົ້າ `/admin`

⚠️ ສອງຄ່ານີ້**ຫ້າມ**ຂຶ້ນຕົ້ນດ້ວຍ `NEXT_PUBLIC_` ເດັດຂາດ — ຖ້າໃສ່ຜິດ `service_role` ຈະຫຼຸດອອກສູ່ browser
ແລະໃຜກໍ່ຈະແກ້/ລຶບຖານຂໍ້ມູນທັງໝົດໄດ້.

## ຕັ້ງຄ່າຖານຂໍ້ມູນ

ໄປທີ່ Supabase Dashboard > SQL Editor > New query, ວາງ SQL ຈາກ `supabase/schema.sql` ແລ້ວກົດ Run
ເພື່ອສ້າງຕາຕະລາງ `categories` ແລະ `products` (ຖ້າຍັງບໍ່ໄດ້ສ້າງ). ຖ້າຍັງບໍ່ມີສິນຄ້າ ໜ້າເວັບຈະສະແດງ
ຂໍ້ມູນຕົວຢ່າງ (mock) ໄປພາງກ່ອນອັດຕະໂນມັດ.

## Dev

```bash
npm run dev
```

ເປີດ http://localhost:3000 — ໜ້າ admin ຢູ່ http://localhost:3000/admin

## Deploy ໄປ Vercel

1. Push ໂຄດຂຶ້ນ GitHub (`.env.local` ຈະບໍ່ຖືກ push ເພາະຢູ່ໃນ `.gitignore` ແລ້ວ)
2. Import repo ໃນ Vercel
3. ໃນ Vercel Project Settings > Environment Variables ໃສ່ໃຫ້ຄົບ 4 ຕົວ:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
4. Deploy (ຫຼື Redeploy ຖ້າເພີ່ມ env var ຫຼັງຈາກ deploy ຄັ້ງທຳອິດແລ້ວ)

## ໂຄງສ້າງໂປຣເຈັກ

- `app/page.jsx` — ໜ້າ Home (responsive)
- `app/products/[id]/page.jsx` — ໜ້າລາຍລະອຽດສິນຄ້າ (ຫຼາຍຮູບ, ສະຕັອກ, ຕ້ອງ login ກ່ອນຊື້)
- `app/login`, `app/signup`, `app/account` — ລະບົບສະມາຊິກ (Supabase Auth)
- `app/cart` — ກະຕ່າສິນຄ້າ (localStorage), ຕ້ອງ login ກ່ອນກົດສັ່ງຊື້
- `app/admin` — ໜ້າຫຼັກ admin (ລ໋ອກດ້ວຍລະຫັດຜ່ານ `ADMIN_PASSWORD`)
- `app/admin/products` — ເພີ່ມ/ລຶບສິນຄ້າ: ຊື່, ລາຍລະອຽດ, ລາຄາ, ສະຕັອກ, ໝວດໝູ່, ຫຼາຍລິ້ງຮູບ
- `app/admin/categories` — ເພີ່ມ/ລຶບໝວດໝູ່: ຊື່ + ລິ້ງໂລໂກ້/ຮູບ
- `app/admin/users` — ລາຍຊື່ສະມາຊິກ (ວັນສະໝັກ, ເຄື່ອນໄຫວລ່າສຸດ, ບົດບາດ, ຍອດເງິນ)
- `app/admin/users/[id]` — ປັບຍອດເງິນ (ພ້ອມປະຫວັດ), ປ່ຽນລະຫັດຜ່ານ, ຕັ້ງບົດບາດ user/admin
- `app/account` — ໜ້າໂປຣໄຟລ໌ລູກຄ້າ: avatar, ວັນສະໝັກ, ຍອດເງິນ, ຄວາມເຄື່ອນໄຫວຫຼ້າສຸດ
- `app/api/admin/*` — API routes ສຳລັບ admin (protected, ໃຊ້ service_role key ຝັ່ງ server ເທົ່ານັ້ນ)
- `lib/supabaseClient.js` — Supabase client ຝັ່ງ browser (anon key ເທົ່ານັ້ນ)
- `lib/supabaseAdmin.js` — Supabase client ຝັ່ງ server ເທົ່ານັ້ນ (service_role key) — ຫ້າມ import ຈາກ
  "use client" component ເດັດຂາດ
- `lib/adminAuth.js` — ກວດ cookie ວ່າ login admin ຢູ່ບໍ່
- `lib/products.js`, `lib/categories.js` — ຟັງຊັນດຶງຂໍ້ມູນ, fallback ເປັນ mock ຖ້າຍັງບໍ່ມີຕາຕະລາງ
- `supabase/schema.sql` — SQL ສ້າງຕາຕະລາງ `categories`, `products`, `profiles`, `wallet_transactions`
  ພ້ອມ trigger ສ້າງ profile ອັດຕະໂນມັດຕອນສະໝັກ ແລະ function ປັບຍອດເງິນ

## ຄວາມປອດໄພ

- `.env.local` / Vercel env vars ທີ່ຂຶ້ນຕົ້ນ `NEXT_PUBLIC_` ເປີດເຜີຍໄດ້ (anon key ຖືກຈຳກັດດ້ວຍ RLS —
  ອ່ານໄດ້ຢ່າງດຽວ, ຂຽນບໍ່ໄດ້)
- `SUPABASE_SERVICE_ROLE_KEY` ແລະ `ADMIN_PASSWORD` **ຫ້າມມີ `NEXT_PUBLIC_` ນຳໜ້າເດັດຂາດ** — ໃຊ້ໄດ້ແຕ່
  ຝັ່ງ server (API routes) ເທົ່ານັ້ນ, ບໍ່ເຄີຍຖືກສົ່ງໄປ browser
- ການຂຽນຂໍ້ມູນ (ເພີ່ມ/ແກ້/ລຶບສິນຄ້າ, ໝວດໝູ່) ເຮັດຜ່ານ `/api/admin/*` ເທົ່ານັ້ນ, ກວດ cookie admin ກ່ອນທຸກຄັ້ງ
- ລູກຄ້າທົ່ວໄປຕ້ອງ login (Supabase Auth) ກ່ອນຈຶ່ງຈະ "ໃສ່ກະຕ່າ" ຫຼື "ຊື້ເລີຍ" ໄດ້ — ຖ້າຍັງບໍ່ login
  ຈະຖືກສົ່ງໄປໜ້າ `/login` ອັດຕະໂນມັດ
