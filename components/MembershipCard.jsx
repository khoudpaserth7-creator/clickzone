export default function MembershipCard() {
  return (
    <div className="rounded-md p-4 bg-canvas border border-surface-2">
      <div className="font-semibold text-base mb-1 text-ink">Click Zone Plus</div>
      <div className="text-sm mb-3 text-ink-muted">
        ສະໝັກສະມາຊິກ ຮັບສ່ວນຫຼຸດ 5% ທຸກອໍເດີ
      </div>
      <button className="font-semibold text-sm rounded-full px-5 py-2 bg-primary text-canvas">
        ສະໝັກເລີຍ
      </button>
    </div>
  );
}
