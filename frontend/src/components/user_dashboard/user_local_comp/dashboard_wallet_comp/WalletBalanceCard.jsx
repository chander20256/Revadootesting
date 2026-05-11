import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const WalletBalanceCard = () => {
  const [ setBalance] = useState(0);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        `https://revadoobackend.onrender.com/api/wallet/balance/${user.id}`
      );

      setBalance(
        res.data.balance
      );
    } catch (error) {
      console.error(
        "Error fetching balance:",
        error
      );
    }
  };

  /* -----------------------------
     CREDS SYSTEM
  ----------------------------- */

  const userCreds =
    Number(user?.creds) || 0;

  /* -----------------------------
     CONVERSION SYSTEM
  ----------------------------- */

  const values = useMemo(() => {
    const creds =
      Number(userCreds) || 0;

    // 1000 Creds = ₹100

    const inr =
      (creds / 1000) * 100;

    const usd =
      inr / 83;

    return {
      inr,
      usd,
    };
  }, [userCreds]);

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-orange-500
        rounded-2xl
        p-6
        sm:p-8
        font-['DM_Sans',sans-serif]
        w-full
        h-full
        min-h-[220px]
        flex
        flex-col
        justify-between
      "
    >
      {/* Decorative circles */}

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />

      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col justify-between h-full">
        
        {/* TOP */}

        <div>
          <p className="text-sm font-semibold text-white/75 uppercase tracking-wider mb-2">
            Available Creds
          </p>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-3">
            {userCreds.toLocaleString()}
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white/15 px-3 py-1.5 rounded-full">
              <p className="text-xs font-semibold text-white">
                ₹
                {values.inr.toFixed(
                  2
                )}
              </p>
            </div>

            <div className="bg-white/15 px-3 py-1.5 rounded-full">
              <p className="text-xs font-semibold text-white">
                $
                {values.usd.toFixed(
                  2
                )}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="mt-5">
          <div className="w-full h-[1px] bg-white/15 mb-4" />

          <p className="text-sm text-white/75 leading-relaxed max-w-lg">
            Your earnings are securely tracked and automatically prepared
            for fast withdrawal processing and reward redemption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;