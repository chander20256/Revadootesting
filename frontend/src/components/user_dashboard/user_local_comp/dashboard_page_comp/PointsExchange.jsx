import React, {
  useMemo,
  useState,
} from "react";

const PointsExchange = () => {
  /* -----------------------------
     USER DATA
  ----------------------------- */

  const userData = (() => {
    try {
      const stored =
        localStorage.getItem("user");

      return stored
        ? JSON.parse(stored)
        : {};
    } catch (err) {
      return {};
    }
  })();

  const userCreds =
    Number(userData.creds) || 0;

  /* -----------------------------
     INPUT STATE
  ----------------------------- */

  const [inputCreds, setInputCreds] =
    useState(userCreds);

  /* -----------------------------
     CONVERSION SYSTEM
  ----------------------------- */

  const values = useMemo(() => {
    const creds =
      Number(inputCreds) || 0;

    // 1000 Creds = ₹100

    const inr =
      (creds / 1000) * 100;

    const usd =
      inr / 83;

    const euro =
      inr / 90;

    const btc =
      inr / 9000000;

    return {
      inr,
      usd,
      euro,
      btc,
    };
  }, [inputCreds]);

  return (
    <div
      className="w-full xl:w-[340px] rounded-3xl p-4"
      style={{
        background:
          "rgba(0,0,0,0.02)",

        border:
          "1px solid rgba(0,0,0,0.05)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* TOP */}

      <div>
        <p
          className="text-[10px] uppercase font-black"
          style={{
            color: "#FF6B00",
          }}
        >
          Creds Exchange
        </p>

        <div className="flex items-center justify-between mt-2 gap-3">
          <input
  type="number"
  value={inputCreds}
  onChange={(e) =>
    setInputCreds(
      e.target.value
    )
  }
  className="
    w-full
    outline-none
    text-lg
    font-black
    rounded-2xl
    px-3
    py-2
  "
  style={{
    color: "#030712",

    background:
      "#ffffff",

    border:
      "1px solid rgba(0,0,0,0.08)",
  }}
/>

          <p
            className="text-sm font-black whitespace-nowrap"
            style={{
              color: "#FF6B00",
            }}
          >
            Creds
          </p>
        </div>

        <p
          className="text-[11px] font-bold mt-1"
          style={{
            color: "#6b7280",
          }}
        >
          1000 Creds = ₹100
        </p>
      </div>

      {/* VALUES */}

      <div className="grid grid-cols-2 gap-3 mt-5">
        <div
          className="rounded-2xl p-3"
          style={{
            background:
              "#ffffff",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="text-[10px] uppercase font-black"
            style={{
              color: "#FF6B00",
            }}
          >
            INR
          </p>

          <h4
            className="text-sm font-black mt-1"
            style={{
              color: "#030712",
            }}
          >
            ₹
            {values.inr.toFixed(
              2
            )}
          </h4>
        </div>

        <div
          className="rounded-2xl p-3"
          style={{
            background:
              "#ffffff",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="text-[10px] uppercase font-black"
            style={{
              color: "#FF6B00",
            }}
          >
            USD
          </p>

          <h4
            className="text-sm font-black mt-1"
            style={{
              color: "#030712",
            }}
          >
            $
            {values.usd.toFixed(
              2
            )}
          </h4>
        </div>

        <div
          className="rounded-2xl p-3"
          style={{
            background:
              "#ffffff",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="text-[10px] uppercase font-black"
            style={{
              color: "#FF6B00",
            }}
          >
            EURO
          </p>

          <h4
            className="text-sm font-black mt-1"
            style={{
              color: "#030712",
            }}
          >
            €
            {values.euro.toFixed(
              2
            )}
          </h4>
        </div>

        <div
          className="rounded-2xl p-3"
          style={{
            background:
              "#ffffff",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="text-[10px] uppercase font-black"
            style={{
              color: "#FF6B00",
            }}
          >
            BTC
          </p>

          <h4
            className="text-sm font-black mt-1"
            style={{
              color: "#030712",
            }}
          >
            {values.btc.toFixed(
              8
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PointsExchange;