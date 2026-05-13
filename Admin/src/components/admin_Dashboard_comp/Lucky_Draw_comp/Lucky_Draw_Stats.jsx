import React from "react";

function Lucky_Draw_Stats({
  statsData,
  loading,
}) {
  const stats = [
    {
      title:
        "Current Draw",

      value:
        statsData?.currentDraw ??
        "0",

      label:
        "Running Event",

      icon: "🎯",
    },

    {
      title:
        "Tickets Sold",

      value:
        statsData?.ticketsSold ??
        "0",

      label:
        "Total Entries",

      icon: "🎟️",
    },

    {
      title:
        "Participants",

      value:
        statsData?.participants ??
        "0",

      label:
        "Unique Users",

      icon: "👥",
    },

    {
      title:
        "Creds Burned",

      value:
        statsData?.credsBurned ??
        "0",

      label:
        "Economy Control",

      icon: "🔥",
    },

    {
      title:
        "Time Left",

      value:
        statsData?.timeLeft ??
        "00D : 00H",

      label:
        "Draw Countdown",

      icon: "⏳",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        xl:grid-cols-5
        gap-4
        font-['DM_Sans',sans-serif]
      "
    >
      {stats.map(
        (item, index) => (
          <div
            key={index}
            className="
              bg-white
              border
              border-gray-100
              rounded-[24px]
              sm:rounded-[28px]
              p-4
              sm:p-5
            "
          >
            {/* TOP */}

            <div className="flex items-center justify-between">
              <div className="text-3xl sm:text-4xl">
                {item.icon}
              </div>

              <div
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-orange-50
                  border
                  border-orange-100
                  text-orange-500
                  text-[10px]
                  sm:text-xs
                  font-black
                  uppercase
                  tracking-wider
                "
              >
                Live
              </div>
            </div>

            {/* CONTENT */}

            <div className="mt-5">
              <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-400 font-black">
                {item.title}
              </p>

              <h2 className="text-xl sm:text-3xl font-black text-black mt-2 tracking-tight break-words leading-tight">
                {loading
                  ? "..."
                  : item.value}
              </h2>

              <p className="text-xs sm:text-sm text-orange-500 font-bold mt-3">
                {item.label}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Lucky_Draw_Stats;