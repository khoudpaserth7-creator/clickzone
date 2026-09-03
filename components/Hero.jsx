"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-md p-4 bg-promo-gradient"
    >
      <div className="text-xs font-medium mb-1 text-canvas/85">
        ໂປຣໂມຊັນປະຈຳເດືອນ
      </div>
      <div className="font-bold mb-2 text-scarcity text-[34px] leading-[1.05] max-w-[75%]">
        ຫຼຸດແຮງ ຮັບຊັບ
      </div>
      <div className="text-sm mb-3 text-canvas max-w-[85%]">
        ມືຖື ຄອມພິວເຕີ ແລະອຸປະກອນໄອທີ ລາຄາຖືກ ຈັດສົ່ງໄວ ຮັບປະກັນສິນຄ້າແທ້ 100%
      </div>
      <div className="flex items-center gap-3">
        <button className="font-semibold text-sm rounded-full px-5 py-2 bg-canvas text-primary">
          ຊື້ເລີຍ
        </button>
        <span className="text-xs font-semibold rounded-sm px-2 py-1 bg-scarcity text-ink">
          ໝົດອາຍຸ 30/9
        </span>
      </div>
    </motion.div>
  );
}
