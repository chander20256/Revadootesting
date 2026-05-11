import { useState } from "react";

const WithdrawForm = () => {
  const [balance] =
    useState(2450);

  const [method, setMethod] =
    useState("Giftcards");

  const [
    withdrawAmount,
    setWithdrawAmount,
  ] = useState("");

  const [
    selectedBrand,
    setSelectedBrand,
  ] = useState(null);

  const [
    selectedCard,
    setSelectedCard,
  ] = useState(null);

  /* -----------------------------
     WITHDRAW METHODS
  ----------------------------- */

  const methods = [
    "Giftcards",
    "Crypto",
    "Cash",
  ];

  /* -----------------------------
     GIFT CARD BRANDS
  ----------------------------- */

  const giftBrands = [
    "Amazon",
    "Flipkart",
    "Google Play",
    "Steam",
  ];

  /* -----------------------------
     GIFT CARD VALUES
  ----------------------------- */

  const giftCardValues = [
    {
      value: "₹100",
      creds: "1000 Creds",
    },
    {
      value: "₹250",
      creds: "2500 Creds",
    },
    {
      value: "₹500",
      creds: "5000 Creds",
    },
  ];

  /* -----------------------------
     SUBMIT
  ----------------------------- */

  const handleWithdraw = (
    e
  ) => {
    e.preventDefault();

    /* GIFT CARDS */

    if (
      method ===
      "Giftcards"
    ) {
      if (
        !selectedBrand
      ) {
        alert(
          "Please select a gift card brand"
        );

        return;
      }

      if (
        !selectedCard
      ) {
        alert(
          "Please select a gift card value"
        );

        return;
      }

      alert(
        `${selectedBrand} ${selectedCard.value} withdrawal requested`
      );

      return;
    }

    /* CASH & CRYPTO */

    const amount =
      parseFloat(
        withdrawAmount
      );

    if (
      !amount ||
      amount <= 0
    ) {
      alert(
        "Please enter a valid amount"
      );

      return;
    }

    if (amount > balance) {
      alert(
        "Withdrawal amount exceeds available balance"
      );

      return;
    }

    alert(
      `Withdrawal request of ₹${amount} submitted successfully`
    );

    setWithdrawAmount("");
  };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        p-5
        sm:p-6
        font-['DM_Sans',sans-serif]
        w-full
      "
    >
      {/* HEADER */}

      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-2">
          Withdraw System
        </p>

        <h3 className="text-xl font-black text-black">
          Withdraw Rewards
        </h3>

        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          Choose your preferred withdrawal method and submit your payout request securely.
        </p>
      </div>

      <form
        onSubmit={
          handleWithdraw
        }
        className="space-y-5"
      >
        {/* TOGGLE */}

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Withdrawal Method
          </label>

          <div
            className="
              flex
              flex-wrap
              gap-2
              bg-gray-50
              p-2
              rounded-2xl
            "
          >
            {methods.map(
              (m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMethod(
                      m
                    );

                    setSelectedBrand(
                      null
                    );

                    setSelectedCard(
                      null
                    );
                  }}
                  className={`
                    flex-1
                    min-w-[90px]
                    py-3
                    px-4
                    rounded-xl
                    text-sm
                    font-bold
                    transition-all
                    duration-200
                    ${
                      method ===
                      m
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-transparent text-gray-500 hover:bg-white"
                    }
                  `}
                >
                  {m}
                </button>
              )
            )}
          </div>
        </div>

        {/* GIFT CARDS */}

        {method ===
          "Giftcards" && (
          <div className="space-y-5">
            
            {/* BRAND */}

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                Select Brand
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {giftBrands.map(
                  (
                    brand,
                    index
                  ) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(
                          brand
                        );

                        setSelectedCard(
                          null
                        );
                      }}
                      className={`
                        rounded-2xl
                        border
                        p-4
                        text-sm
                        font-bold
                        transition-all
                        duration-200
                        ${
                          selectedBrand ===
                          brand
                            ? "border-orange-500 bg-orange-50 text-orange-500"
                            : "border-gray-100 text-black hover:border-orange-200"
                        }
                      `}
                    >
                      {brand}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* CARD VALUES */}

            {selectedBrand && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                  {selectedBrand} Gift Cards
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {giftCardValues.map(
                    (
                      card,
                      index
                    ) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setSelectedCard(
                            card
                          )
                        }
                        className={`
                          text-left
                          rounded-2xl
                          border
                          p-4
                          transition-all
                          duration-200
                          ${
                            selectedCard?.value ===
                            card.value
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-100 hover:border-orange-200"
                          }
                        `}
                      >
                        <p className="text-sm font-black text-black">
                          {
                            selectedBrand
                          }
                        </p>

                        <p className="text-orange-500 text-xl font-black mt-2">
                          {
                            card.value
                          }
                        </p>

                        <p className="text-xs text-gray-400 mt-1 font-semibold">
                          {
                            card.creds
                          }
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CASH & CRYPTO */}

        {(method ===
          "Cash" ||
          method ===
            "Crypto") && (
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Withdrawal Amount
            </label>

            <div
              className="
                flex
                items-center
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                focus-within:border-orange-500
                transition-colors
              "
            >
              <span
                className="
                  px-4
                  text-orange-500
                  font-black
                  text-sm
                  border-r
                  border-gray-200
                  bg-gray-50
                  self-stretch
                  flex
                  items-center
                "
              >
                ₹
              </span>

              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={
                  withdrawAmount
                }
                onChange={(
                  e
                ) =>
                  setWithdrawAmount(
                    e.target
                      .value
                  )
                }
                required
                className="
                  flex-1
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  bg-transparent
                  outline-none
                  placeholder:text-gray-300
                  min-w-0
                "
              />
            </div>
          </div>
        )}

        {/* AVAILABLE */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            px-4
            py-3
          "
        >
          <div>
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Available Balance
            </p>

            <h4 className="text-lg font-black text-black mt-1">
              ₹
              {balance.toLocaleString()}
            </h4>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium">
              Selected
            </p>

            <p className="text-sm font-bold text-black mt-1">
              {method}
            </p>
          </div>
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            text-sm
            font-black
            py-3.5
            rounded-2xl
            transition-all
            duration-200
          "
        >
          Request Withdrawal
        </button>

        {/* FOOTER */}

        <div className="text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            Minimum withdrawal amount is ₹100. Processing time may vary
            depending on the selected payout method.
          </p>
        </div>
      </form>
    </div>
  );
};

export default WithdrawForm;