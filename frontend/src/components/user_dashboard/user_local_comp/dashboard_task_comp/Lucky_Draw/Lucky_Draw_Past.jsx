import React from "react";

function Lucky_Draw_Past() {
  const pastDraws = [
    {
      reward:
        "₹500 Amazon Gift Card",

      winners:
        "1 Winner",

      date:
        "12 May 2026",

      tickets:
        "4,283",

      status:
        "Completed",

      icon: "🛒",
    },

    {
      reward:
        "Netflix Premium Subscription",

      winners:
        "5 Winners",

      date:
        "05 May 2026",

      tickets:
        "3,912",

      status:
        "Completed",

      icon: "📺",
    },

    {
      reward:
        "₹300 Flipkart Voucher",

      winners:
        "2 Winners",

      date:
        "28 Apr 2026",

      tickets:
        "5,102",

      status:
        "Completed",

      icon: "🛍️",
    },

    {
      reward:
        "Google Play Redeem Code",

      winners:
        "3 Winners",

      date:
        "21 Apr 2026",

      tickets:
        "2,981",

      status:
        "Completed",

      icon: "🎮",
    },
  ];

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-[28px]
        sm:rounded-[32px]
        p-4
        sm:p-6
        lg:p-8
        font-['DM_Sans',sans-serif]
        h-full
      "
    >
      {/* TOP */}

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
          Past Lucky Draws
        </p>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-tight">
          Previous Events
        </h2>
      </div>

      {/* LIST */}

      <div className="space-y-3 sm:space-y-4">
        {pastDraws.map(
          (item, index) => (
            <div
              key={index}
              className="
                rounded-[22px]
                sm:rounded-[28px]
                border
                border-gray-100
                bg-gray-50
                p-4
                sm:p-5
                transition-all
                duration-200
                hover:border-orange-200
              "
            >
              {/* TOP */}

              <div className="flex items-start gap-3 sm:gap-4">
                {/* ICON */}

                <div
                  className="
                    w-12
                    h-12
                    sm:w-16
                    sm:h-16
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                    text-2xl
                    sm:text-3xl
                    shrink-0
                  "
                >
                  {item.icon}
                </div>

                {/* CONTENT */}

                <div className="min-w-0">
                  <h3
                    className="
                      text-base
                      sm:text-lg
                      lg:text-xl
                      font-black
                      text-black
                      leading-tight
                    "
                  >
                    {item.reward}
                  </h3>

                  <p className="text-xs sm:text-sm text-orange-500 font-bold mt-2">
                    {item.status}
                  </p>
                </div>
              </div>

              {/* STATS */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-4
                "
              >
                {/* WINNERS */}

                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                    sm:p-4
                  "
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                    Winners
                  </p>

                  <h4 className="text-xs sm:text-sm font-black text-black">
                    {item.winners}
                  </h4>
                </div>

                {/* DATE */}

                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                    sm:p-4
                  "
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                    Date
                  </p>

                  <h4 className="text-xs sm:text-sm font-black text-black">
                    {item.date}
                  </h4>
                </div>

                {/* SOLD */}

                <div
                  className="
                    col-span-2
                    rounded-2xl
                    bg-orange-50
                    border
                    border-orange-100
                    p-3
                    sm:p-4
                  "
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-orange-400 mb-1">
                    Tickets Sold
                  </p>

                  <h4 className="text-sm sm:text-base font-black text-orange-500">
                    {item.tickets} Tickets
                  </h4>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Lucky_Draw_Past;