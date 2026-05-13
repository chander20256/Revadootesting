import React from "react";

function Lucky_Draw_History() {
  const history = [
    {
      id: "#LD1024",

      reward:
        "₹500 Amazon Gift Card",

      tickets:
        "5 Tickets",

      date:
        "12 May 2026",

      status:
        "Completed",
    },

    {
      id: "#LD1023",

      reward:
        "Netflix Premium Subscription",

      tickets:
        "2 Tickets",

      date:
        "05 May 2026",

      status:
        "Completed",
    },

    {
      id: "#LD1022",

      reward:
        "₹300 Flipkart Voucher",

      tickets:
        "3 Tickets",

      date:
        "28 Apr 2026",

      status:
        "Lost",
    },

    {
      id: "#LD1021",

      reward:
        "Google Play Redeem Code",

      tickets:
        "1 Ticket",

      date:
        "21 Apr 2026",

      status:
        "Completed",
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
      "
    >
      {/* TOP */}

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
          Lucky Draw History
        </p>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight">
          Participation History
        </h2>
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              {[
                "Draw ID",
                "Reward",
                "Tickets",
                "Date",
                "Status",
              ].map(
                (
                  item,
                  index
                ) => (
                  <th
                    key={index}
                    className="
                      text-left
                      text-xs
                      uppercase
                      tracking-widest
                      text-gray-400
                      font-black
                      px-4
                      pb-2
                    "
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {history.map(
              (
                item,
                index
              ) => (
                <tr
                  key={index}
                  className="
                    bg-gray-50
                  "
                >
                  <td className="px-4 py-4 rounded-l-2xl">
                    <p className="text-sm font-black text-orange-500">
                      {item.id}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-bold text-black">
                      {item.reward}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-500">
                      {item.tickets}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-500">
                      {item.date}
                    </p>
                  </td>

                  <td className="px-4 py-4 rounded-r-2xl">
                    <span
                      className={`
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-2
                        rounded-xl
                        text-xs
                        font-black
                        ${
                          item.status ===
                          "Completed"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-red-50 text-red-500 border border-red-100"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}

      <div className="lg:hidden space-y-4">
        {history.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="
                rounded-[24px]
                border
                border-gray-100
                bg-gray-50
                p-4
              "
            >
              {/* TOP */}

              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-orange-500">
                    {item.id}
                  </p>

                  <h3 className="text-sm font-black text-black mt-2 leading-relaxed">
                    {item.reward}
                  </h3>
                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    px-3
                    py-1.5
                    rounded-xl
                    text-[11px]
                    font-black
                    shrink-0
                    ${
                      item.status ===
                      "Completed"
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : "bg-red-50 text-red-500 border border-red-100"
                    }
                  `}
                >
                  {item.status}
                </span>
              </div>

              {/* INFO */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-4
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                  "
                >
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
                    Tickets
                  </p>

                  <h4 className="text-xs font-black text-black">
                    {item.tickets}
                  </h4>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                  "
                >
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
                    Date
                  </p>

                  <h4 className="text-xs font-black text-black">
                    {item.date}
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

export default Lucky_Draw_History;