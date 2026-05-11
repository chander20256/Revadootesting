import React from "react";

import WalletHeader from "./WalletHeader";
import WithdrawForm from "./WithdrawForm";
import WalletBalanceCard from "./WalletBalanceCard";

import PointsExchange from "../dashboard_page_comp/PointsExchange";

function Wallet_main() {
  return (
    <div>
      <WalletHeader />

      {/* TOP SECTION */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-5
          items-stretch
        "
      >
        {/* LEFT */}

        <div className="w-full lg:w-[65%]">
          <WalletBalanceCard />
        </div>

        {/* RIGHT */}

        <div className="w-full lg:w-[35%]">
          <PointsExchange />
        </div>
      </div>

      {/* WITHDRAW FORM */}

      <div className="mt-5">
        <WithdrawForm />
      </div>
    </div>
  );
}

export default Wallet_main;