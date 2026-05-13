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
    {
      name: "Giftcards",
      badge: "Recommended",
    },

    {
      name: "Crypto",
      badge: "Limited",
    },

    {
      name: "Cash",
      badge: "Beta",
    },
  ];

  /* -----------------------------
     GIFT CARD BRANDS
  ----------------------------- */

  const giftBrands = [
    {
      name: "Amazon",
      logo: "🛒",
      popular: true,
    },

    {
      name: "Flipkart",
      logo: "🛍️",
      popular: true,
    },

    {
      name: "Google Play",
      logo: "▶️",
      popular: false,
    },

    {
      name: "Steam",
      logo: "🎮",
      popular: false,
    },
  ];

  /* -----------------------------
     GIFT CARD VALUES
  ----------------------------- */

  const giftCardValues = [
    {
      value: "₹100",
      creds: "1000 Creds",
      bonus: "+25% Founder Bonus",
    },

    {
      value: "₹250",
      creds: "2500 Creds",
      bonus: "+25% Founder Bonus",
    },

    {
      value: "₹500",
      creds: "5000 Creds",
      bonus: "+25% Founder Bonus",
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
        `${selectedBrand.name} ${selectedCard.value} redemption requested`
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
        <div className="flex items-center gap-2 flex-wrap mb-2">
          
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
            Rewards Store
          </p>

          <span
            className="
              bg-orange-100
              text-orange-500
              text-[10px]
              font-black
              px-2.5
              py-1
              rounded-full
            "
          >
            First 100 Users Bonus
          </span>
        </div>

        <h3 className="text-xl font-black text-black">
          Redeem Your Rewards
        </h3>

        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          Founder users receive boosted reward values, premium gift card
          access, and limited-time redemption bonuses.
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
            Redemption Method
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
              (
                item,
                index
              ) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setMethod(
                      item.name
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
                    min-w-[100px]
                    py-3
                    px-4
                    rounded-xl
                    text-sm
                    font-bold
                    transition-all
                    duration-200
                    relative
                    ${
                      method ===
                      item.name
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-transparent text-gray-500 hover:bg-white"
                    }
                  `}
                >
                  <div className="flex flex-col items-center">
                    
                    <span>
                      {
                        item.name
                      }
                    </span>

                    <span
                      className={`
                        text-[10px]
                        mt-1
                        font-bold
                        ${
                          method ===
                          item.name
                            ? "text-white/80"
                            : "text-orange-500"
                        }
                      `}
                    >
                      {
                        item.badge
                      }
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* GIFT CARDS */}

        {method ===
          "Giftcards" && (
          <div className="space-y-5">
            
            {/* INFO */}

            <div
              className="
                bg-orange-50
                border
                border-orange-100
                rounded-2xl
                p-4
              "
            >
              <div className="flex items-start gap-3">
                
                <div className="text-2xl">
                  🎁
                </div>

                <div>
                  <h4 className="text-sm font-black text-black">
                    Most Popular Redemption Method
                  </h4>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Gift cards offer instant delivery, better reward value,
                    and exclusive founder bonuses for early users.
                  </p>
                </div>
              </div>
            </div>

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
                        transition-all
                        duration-200
                        relative
                        ${
                          selectedBrand?.name ===
                          brand.name
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-100 hover:border-orange-200"
                        }
                      `}
                    >
                      {brand.popular && (
                        <div
                          className="
                            absolute
                            top-2
                            right-2
                            text-[9px]
                            font-black
                            bg-orange-500
                            text-white
                            px-2
                            py-1
                            rounded-full
                          "
                        >
                          HOT
                        </div>
                      )}

                      <div className="flex flex-col items-center justify-center">
                        
                        <span className="text-3xl mb-2">
                          {
                            brand.logo
                          }
                        </span>

                        <p
                          className={`
                            text-sm
                            font-bold
                            ${
                              selectedBrand?.name ===
                              brand.name
                                ? "text-orange-500"
                                : "text-black"
                            }
                          `}
                        >
                          {
                            brand.name
                          }
                        </p>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* CARD VALUES */}

            {selectedBrand && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                  {
                    selectedBrand.name
                  }{" "}
                  Gift Cards
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
                          relative
                          overflow-hidden
                          ${
                            selectedCard?.value ===
                            card.value
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-100 hover:border-orange-200"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          
                          <div>
                            <p className="text-sm font-black text-black">
                              {
                                selectedBrand.name
                              }
                            </p>

                            <p className="text-orange-500 text-2xl font-black mt-2">
                              {
                                card.value
                              }
                            </p>

                            <p className="text-xs text-gray-400 mt-1 font-semibold">
                              {
                                card.creds
                              }
                            </p>

                            <div
                              className="
                                inline-flex
                                mt-3
                                bg-orange-100
                                text-orange-500
                                text-[10px]
                                font-black
                                px-2.5
                                py-1
                                rounded-full
                              "
                            >
                              {
                                card.bonus
                              }
                            </div>
                          </div>

                          <span className="text-4xl">
                            {
                              selectedBrand.logo
                            }
                          </span>
                        </div>
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
          <div className="space-y-4">
            
            <div
              className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                p-4
              "
            >
              <p className="text-sm font-bold text-black">
                Lower Priority Redemption
              </p>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Gift cards provide faster processing and higher reward value
                compared to cash and crypto withdrawals.
              </p>
            </div>

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
          Redeem Rewards
        </button>

        {/* FOOTER */}

        <div className="text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            Founder users receive boosted redemption rewards and priority
            processing during the early access phase.
          </p>
        </div>
      </form>
    </div>
  );
};

export default WithdrawForm;