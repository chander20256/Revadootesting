const WalletHeader = () => {
  return (
    <div
      className="
        mb-6
        sm:mb-8
        font-['DM_Sans',sans-serif]
        bg-white
        border
        border-gray-100
        rounded-3xl
        p-5
        sm:p-6
      "
    >
      <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-2">
        Rewards Dashboard
      </p>

      <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-2">
        Rewards Store
      </h1>

      <p className="text-sm text-gray-400 font-normal leading-relaxed max-w-2xl">
        Redeem your earned creds for gift cards, vouchers, cash rewards,
        and digital payouts securely from your Revadoo rewards store.
      </p>
    </div>
  );
};

export default WalletHeader;