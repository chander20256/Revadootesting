import React from "react";

function Lucky_Draw_Stats({
  statsData,
  drawData,
  loading,
}) {
  /* -----------------------------
     TIME LEFT
  ----------------------------- */

  const safeDays =
    Math.max(
      0,
      Number(
        drawData?.timer
          ?.days || 0
      )
    );

  const safeHours =
    Math.max(
      0,
      Number(
        drawData?.timer
          ?.hours || 0
      )
    );

  const safeMinutes =
    Math.max(
      0,
      Number(
        drawData?.timer
          ?.minutes || 0
      )
    );

  const timeLeft =
    drawData?.timer
      ? `${String(
          safeDays
        ).padStart(
          2,
          "0"
        )}D : ${String(
          safeHours
        ).padStart(
          2,
          "0"
        )}H : ${String(
          safeMinutes
        ).padStart(
          2,
          "0"
        )}M`
      : "00D : 00H : 00M";

  /* -----------------------------
     STATUS LABEL
  ----------------------------- */

  const statusLabel =
    drawData?.status ===
    "active"
      ? "Live"
      : drawData?.status ===
        "picking"
      ? "Picking"
      : drawData?.status ===
        "completed"
      ? "Completed"
      : "Offline";

  /* -----------------------------
     STATS
  ----------------------------- */

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
        timeLeft,

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
        lg:grid-cols-3
        2xl:grid-cols-5
        gap-4
        font-['DM_Sans',sans-serif]
      "
    >
      {stats.map(
        (
          item,
          index
        ) => (
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
              transition-all
              duration-200
              hover:border-orange-200
            "
          >
            {/* TOP */}

            <div className="flex items-center justify-between gap-3">
              {/* ICON */}

              <div className="text-3xl sm:text-4xl shrink-0">
                {item.icon}
              </div>

              {/* STATUS */}

              <div
                className="
                  px-2.5
                  sm:px-3
                  py-1
                  sm:py-1.5
                  rounded-full
                  bg-orange-50
                  border
                  border-orange-100
                  text-orange-500
                  text-[9px]
                  sm:text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  whitespace-nowrap
                "
              >
                {statusLabel}
              </div>
            </div>

            {/* CONTENT */}

            <div className="mt-5">
              {/* TITLE */}

              <p
                className="
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-widest
                  text-gray-400
                  font-black
                  leading-relaxed
                "
              >
                {item.title}
              </p>

              {/* VALUE */}

              <h2
                className="
                  text-lg
                  sm:text-2xl
                  xl:text-3xl
                  font-black
                  text-black
                  mt-2
                  tracking-tight
                  break-words
                  leading-tight
                "
              >
                {loading
                  ? "..."
                  : item.value}
              </h2>

              {/* LABEL */}

              <p
                className="
                  text-[11px]
                  sm:text-sm
                  text-orange-500
                  font-bold
                  mt-3
                  leading-relaxed
                "
              >
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