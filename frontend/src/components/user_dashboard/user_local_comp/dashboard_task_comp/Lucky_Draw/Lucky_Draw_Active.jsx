import React, {
  useState,
} from "react";

function Lucky_Draw_Active() {
  /* -----------------------------
     STATE
  ----------------------------- */

  const [tickets, setTickets] =
    useState(1);

  const maxTickets = 5;

  const ticketPrice = 500;

  /* -----------------------------
     FUNCTIONS
  ----------------------------- */

  const increaseTickets =
    () => {
      if (
        tickets <
        maxTickets
      ) {
        setTickets(
          tickets + 1
        );
      }
    };

  const decreaseTickets =
    () => {
      if (tickets > 1) {
        setTickets(
          tickets - 1
        );
      }
    };

  const handleJoin =
    () => {
      alert(
        `You joined the lucky draw with ${tickets} ticket${
          tickets > 1
            ? "s"
            : ""
        } for ${
          tickets *
          ticketPrice
        } creds`
      );
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
        lg:p-8
        font-['DM_Sans',sans-serif]
        h-full
      "
    >
      {/* TOP */}

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
          Active Lucky Draw
        </p>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-tight">
          Weekly Reward Event
        </h2>
      </div>

      {/* PYRAMID STATS */}

      <div className="mt-2">
        {/* TOP CARD */}

        <div className="flex justify-center">
          <div
            className="
              w-full
              max-w-[320px]
              bg-orange-50
              border
              border-orange-100
              rounded-[22px]
              sm:rounded-[28px]
              p-5
              sm:p-6
              text-center
            "
          >
            <div className="text-5xl sm:text-6xl mb-4">
              🎁
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-black tracking-tight leading-tight">
              Prize Pool
            </h3>

            <p className="text-base sm:text-xl font-semibold text-gray-500 mt-4">
              ₹500 Amazon Card
            </p>

            <p className="text-xs sm:text-sm text-orange-500 font-bold mt-2">
              Premium Reward
            </p>
          </div>
        </div>

        {/* BOTTOM 3 CARDS */}

        <div
          className="
            grid
            grid-cols-3
            gap-3
            sm:gap-5
            mt-4
          "
        >
          {/* ENTRY FEE */}

          <div
            className="
              bg-gray-50
              border
              border-gray-100
              rounded-[20px]
              sm:rounded-[28px]
              p-3
              sm:p-5
              text-center
            "
          >
            <div className="text-3xl sm:text-5xl mb-3">
              🎟️
            </div>

            <h3 className="text-xs sm:text-xl font-black text-black leading-tight">
              Entry Fee
            </h3>

            <p className="text-[11px] sm:text-base font-semibold text-gray-500 mt-3">
              500 Creds
            </p>

            <p className="text-[10px] sm:text-xs text-orange-500 font-bold mt-2">
              Per Ticket
            </p>
          </div>

          {/* MAX TICKETS */}

          <div
            className="
              bg-gray-50
              border
              border-gray-100
              rounded-[20px]
              sm:rounded-[28px]
              p-3
              sm:p-5
              text-center
            "
          >
            <div className="text-3xl sm:text-5xl mb-3">
              🎫
            </div>

            <h3 className="text-xs sm:text-xl font-black text-black leading-tight">
              Max Tickets
            </h3>

            <p className="text-[11px] sm:text-base font-semibold text-gray-500 mt-3">
              {maxTickets} Tickets
            </p>

            <p className="text-[10px] sm:text-xs text-orange-500 font-bold mt-2">
              Per User
            </p>
          </div>

          {/* SOLD */}

          <div
            className="
              bg-gray-50
              border
              border-gray-100
              rounded-[20px]
              sm:rounded-[28px]
              p-3
              sm:p-5
              text-center
            "
          >
            <div className="text-3xl sm:text-5xl mb-3">
              🏆
            </div>

            <h3 className="text-xs sm:text-xl font-black text-black leading-tight">
              Tickets Sold
            </h3>

            <p className="text-[11px] sm:text-base font-semibold text-gray-500 mt-3">
              248 Entries
            </p>

            <p className="text-[10px] sm:text-xs text-orange-500 font-bold mt-2">
              Active Users
            </p>
          </div>
        </div>
      </div>

      {/* INFO */}

      <div
        className="
          mt-6
          sm:mt-8
          rounded-2xl
          border
          border-orange-100
          bg-orange-50
          p-4
          sm:px-5
          sm:py-4
          flex
          flex-col
          gap-4
        "
      >
        <div>
          <h4 className="text-sm sm:text-base font-black text-black">
            Join The Revadoo Lucky Draw
          </h4>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            Use your earned creds to participate in premium reward
            events and increase your chances of winning exclusive gift
            cards and digital rewards.
          </p>
        </div>

        {/* ACTION AREA */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            gap-3
          "
        >
          {/* COUNTER */}

          <div
            className="
              flex
              items-center
              justify-between
              bg-white
              border
              border-orange-100
              rounded-2xl
              px-3
              py-2
              w-full
              sm:w-[180px]
            "
          >
            <button
              onClick={
                decreaseTickets
              }
              disabled={
                tickets === 1
              }
              className="
                w-9
                h-9
                rounded-xl
                bg-orange-50
                text-orange-500
                text-lg
                font-black
                hover:bg-orange-100
                transition-all
                duration-200
                disabled:opacity-40
              "
            >
              −
            </button>

            <div className="text-center">
              <h3 className="text-sm font-black text-black">
                {tickets}{" "}
                Ticket
                {tickets > 1
                  ? "s"
                  : ""}
              </h3>

              <p className="text-[10px] text-gray-400 font-bold">
                Max{" "}
                {
                  maxTickets
                }
              </p>
            </div>

            <button
              onClick={
                increaseTickets
              }
              disabled={
                tickets ===
                maxTickets
              }
              className="
                w-9
                h-9
                rounded-xl
                bg-orange-500
                text-white
                text-lg
                font-black
                hover:bg-orange-600
                transition-all
                duration-200
                disabled:opacity-40
              "
            >
              +
            </button>
          </div>

          {/* JOIN BUTTON */}

          <button
            onClick={
              handleJoin
            }
            className="
              flex-1
              bg-orange-500
              hover:bg-orange-600
              text-white
              text-sm
              font-black
              px-6
              py-3.5
              rounded-2xl
              transition-all
              duration-200
            "
          >
            Join For{" "}
            {tickets *
              ticketPrice}{" "}
            Creds
          </button>
        </div>

        {/* LIMIT INFO */}

        <div
          className="
            bg-white
            border
            border-orange-100
            rounded-2xl
            px-4
            py-3
          "
        >
          <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-medium">
            Each account can purchase a maximum of{" "}
            <span className="font-black text-orange-500">
              {maxTickets} tickets
            </span>{" "}
            per lucky draw event to ensure fair participation for all
            users.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Lucky_Draw_Active;