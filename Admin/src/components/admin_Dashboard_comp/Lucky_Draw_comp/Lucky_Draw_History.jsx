import React from "react";

function Lucky_Draw_History({
  historyData = [],
  loading,
}) {
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
        font-['DM_Sans',sans-serif]
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        "
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500 mb-2">
            Draw History
          </p>

          <h2 className="text-2xl font-black text-black tracking-tight">
            Completed Lucky Draws
          </h2>
        </div>

        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            text-xs
            font-black
            text-orange-500
            uppercase
            tracking-wider
            w-fit
          "
        >
          {historyData.length} Records
        </div>
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto
          rounded-[24px]
          border
          border-gray-100
        "
      >
        <table className="w-full min-w-[950px]">
          {/* HEAD */}

          <thead className="bg-gray-50">
            <tr>
              {[
                "Reward",
                "Winner Ticket",
                "Tickets Sold",
                "Participants",
                "Creds Burned",
                "Ended On",
                "Status",
              ].map(
                (
                  item,
                  index
                ) => (
                  <th
                    key={index}
                    className="
                      px-5
                      py-4
                      text-left
                      text-[11px]
                      uppercase
                      tracking-widest
                      text-gray-400
                      font-black
                      whitespace-nowrap
                    "
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* BODY */}

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="
                    text-center
                    py-16
                    text-sm
                    font-bold
                    text-gray-400
                  "
                >
                  Loading lucky draw history...
                </td>
              </tr>
            ) : historyData.length ===
              0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="
                    text-center
                    py-16
                    text-sm
                    font-bold
                    text-gray-400
                  "
                >
                  No completed draws found.
                </td>
              </tr>
            ) : (
              historyData.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={
                      item._id ||
                      index
                    }
                    className="
                      border-t
                      border-gray-100
                      hover:bg-orange-50/40
                      transition-all
                      duration-200
                    "
                  >
                    {/* REWARD */}

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-4">
                        {/* IMAGE */}

                        <div
                          className="
                            w-14
                            h-14
                            rounded-2xl
                            border
                            border-gray-100
                            bg-gray-50
                            overflow-hidden
                            shrink-0
                          "
                        >
                          {item.rewardImage ? (
                            <img
                              src={
                                item.rewardImage
                              }
                              alt="reward"
                              className="
                                w-full
                                h-full
                                object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                                w-full
                                h-full
                                flex
                                items-center
                                justify-center
                                text-2xl
                              "
                            >
                              🎁
                            </div>
                          )}
                        </div>

                        {/* TITLE */}

                        <div>
                          <h3 className="text-sm font-black text-black">
                            {
                              item.rewardTitle
                            }
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            Draw ID:{" "}
                            {
                              item.drawId
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* WINNER */}

                    <td className="px-5 py-5 whitespace-nowrap">
                      <div
                        className="
                          inline-flex
                          items-center
                          px-4
                          py-2
                          rounded-2xl
                          bg-orange-50
                          border
                          border-orange-100
                          text-sm
                          font-black
                          text-orange-500
                        "
                      >
                        {
                          item.winningTicket
                        }
                      </div>
                    </td>

                    {/* TICKETS */}

                    <td className="px-5 py-5">
                      <h4 className="text-sm font-black text-black">
                        {
                          item.ticketsSold
                        }
                      </h4>
                    </td>

                    {/* PARTICIPANTS */}

                    <td className="px-5 py-5">
                      <h4 className="text-sm font-black text-black">
                        {
                          item.participants
                        }
                      </h4>
                    </td>

                    {/* CREDS */}

                    <td className="px-5 py-5">
                      <h4 className="text-sm font-black text-black">
                        {
                          item.credsBurned
                        }
                      </h4>
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-5 whitespace-nowrap">
                      <h4 className="text-sm font-bold text-gray-500">
                        {
                          item.endedAt
                        }
                      </h4>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-5">
                      <div
                        className="
                          inline-flex
                          items-center
                          px-4
                          py-2
                          rounded-2xl
                          bg-green-50
                          border
                          border-green-100
                          text-xs
                          font-black
                          uppercase
                          tracking-wider
                          text-green-600
                        "
                      >
                        Completed
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lucky_Draw_History;