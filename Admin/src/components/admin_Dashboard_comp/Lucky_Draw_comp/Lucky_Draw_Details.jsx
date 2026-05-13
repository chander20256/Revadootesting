import React from "react";

function Lucky_Draw_Details({
  drawData,
  loading,
}) {
  /* -----------------------------
     BACKEND DATA
  ----------------------------- */

  const activeDraw = {
    reward:
      drawData?.rewardTitle ??
      "No Active Draw",

    tickets:
      drawData?.ticketsSold ??
      "0",

    participants:
      drawData?.participants ??
      "0",

    winners:
      drawData?.totalWinners ??
      "0",

    entryFee:
      drawData?.entryFee ??
      "0",

    duration:
      drawData?.duration ??
      "0",

    status:
      drawData?.status ??
      "Inactive",

    description:
      drawData?.description ??
      "No description available.",

    image:
      drawData?.rewardImage ??
      "",

    timer:
      drawData?.timer ?? {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      },
  };

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
            Active Event
          </p>

          <h2 className="text-2xl font-black text-black tracking-tight">
            Lucky Draw Details
          </h2>
        </div>

        <div
          className="
            inline-flex
            items-center
            justify-center
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
          {loading
            ? "Loading..."
            : activeDraw.status}
        </div>
      </div>

      {/* MAIN */}

      <div
        className="
          rounded-[28px]
          border
          border-gray-100
          bg-gray-50
          p-5
          sm:p-6
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-start
            xl:justify-between
            gap-6
          "
        >
          {/* LEFT */}

          <div className="flex-1">
            {/* IMAGE */}

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-orange-50
                border
                border-orange-100
                overflow-hidden
                flex
                items-center
                justify-center
              "
            >
              {activeDraw.image ? (
                <img
                  src={
                    activeDraw.image
                  }
                  alt="reward"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              ) : (
                <div className="text-4xl">
                  🎁
                </div>
              )}
            </div>

            {/* TITLE */}

            <h3 className="text-xl sm:text-3xl font-black text-black mt-5 tracking-tight">
              {loading
                ? "Loading..."
                : activeDraw.reward}
            </h3>

            {/* DESCRIPTION */}

            <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-2xl">
              {loading
                ? "Fetching lucky draw details..."
                : activeDraw.description}
            </p>

            {/* TIMER */}

            <div
              className="
                grid
                grid-cols-4
                gap-3
                mt-6
                max-w-[520px]
              "
            >
              {[
                {
                  value:
                    activeDraw.timer
                      .days,
                  label:
                    "Days",
                },

                {
                  value:
                    activeDraw.timer
                      .hours,
                  label:
                    "Hours",
                },

                {
                  value:
                    activeDraw.timer
                      .minutes,
                  label:
                    "Minutes",
                },

                {
                  value:
                    activeDraw.timer
                      .seconds,
                  label:
                    "Seconds",
                },
              ].map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="
                      bg-white
                      border
                      border-orange-100
                      rounded-2xl
                      py-4
                      px-2
                      text-center
                    "
                  >
                    <h4 className="text-lg sm:text-3xl font-black text-black leading-none">
                      {loading
                        ? "--"
                        : item.value}
                    </h4>

                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-500 font-black mt-2">
                      {item.label}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-col
              gap-3
              w-full
              xl:w-[220px]
            "
          >
            <button
              className="
                w-full
                px-6
                py-3.5
                rounded-2xl
                bg-orange-500
                hover:bg-orange-600
                text-white
                text-sm
                font-black
                transition-all
                duration-200
                shadow-lg
                shadow-orange-500/20
              "
            >
              Manage Draw
            </button>

            <button
              className="
                w-full
                px-6
                py-3.5
                rounded-2xl
                border
                border-gray-200
                bg-white
                hover:border-orange-200
                text-black
                text-sm
                font-black
                transition-all
                duration-200
              "
            >
              Pick Winners
            </button>

            <button
              className="
                w-full
                px-6
                py-3.5
                rounded-2xl
                border
                border-red-100
                bg-red-50
                hover:bg-red-100
                text-red-500
                text-sm
                font-black
                transition-all
                duration-200
              "
            >
              End Draw
            </button>
          </div>
        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-2
            xl:grid-cols-5
            gap-4
            mt-7
          "
        >
          {/* TICKETS */}

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-4
            "
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-black mb-2">
              Tickets Sold
            </p>

            <h4 className="text-lg sm:text-2xl font-black text-black">
              {loading
                ? "..."
                : activeDraw.tickets}
            </h4>
          </div>

          {/* PARTICIPANTS */}

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-4
            "
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-black mb-2">
              Participants
            </p>

            <h4 className="text-lg sm:text-2xl font-black text-black">
              {loading
                ? "..."
                : activeDraw.participants}
            </h4>
          </div>

          {/* WINNERS */}

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-4
            "
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-black mb-2">
              Winners
            </p>

            <h4 className="text-lg sm:text-2xl font-black text-black">
              {loading
                ? "..."
                : activeDraw.winners}
            </h4>
          </div>

          {/* ENTRY */}

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-4
            "
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-black mb-2">
              Entry Fee
            </p>

            <h4 className="text-lg sm:text-2xl font-black text-black">
              {loading
                ? "..."
                : `${activeDraw.entryFee} Creds`}
            </h4>
          </div>

          {/* DURATION */}

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-4
            "
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-black mb-2">
              Duration
            </p>

            <h4 className="text-lg sm:text-2xl font-black text-black">
              {loading
                ? "..."
                : `${activeDraw.duration} Days`}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lucky_Draw_Details;