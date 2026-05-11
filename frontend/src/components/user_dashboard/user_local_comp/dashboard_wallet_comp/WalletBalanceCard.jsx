import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const WalletBalanceCard = () => {
  const [balance, setBalance] = useState(0);

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


      {/* TOP */}

      <div>
        <p className="text-sm font-medium text-white/75 mb-2">
          Available Creds
        </p>

        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none mb-1">
          {userCreds.toLocaleString()}
        </h2>

        <p className="text-sm text-white/60">
          ≈ ₹
          {values.inr.toFixed(
            2
          )}{" "}
          / $
          {values.usd.toFixed(
            2
          )}
        </p>

        {/* HR LINE */}

        <div className="w-full h-[1px] bg-white/20 my-5" />

        <p className="text-xs text-white/70 leading-relaxed max-w-md">
          Your rewards are securely tracked and optimized for smooth,
          reliable, and fast withdrawal processing.
        </p>
      </div>
    </div>
  );
};

export default WalletBalanceCard;