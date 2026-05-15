import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Swal from "sweetalert2";

import Lucky_Draw_Picking from "./Lucky_Draw_Picking";

import Lucky_Draw_Result from "./Lucky_Draw_Result";

function Lucky_Draw_Active() {
  /* =============================
     STATE
  ============================= */

  const [loading, setLoading] =
    useState(true);

  const [joining, setJoining] =
    useState(false);

  const [tickets, setTickets] =
    useState(1);

  const [drawData, setDrawData] =
    useState(null);

  const [timeLeft, setTimeLeft] =
    useState({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });

    const [drawStatus, setDrawStatus] =
  useState("active");

  /* =============================
     API
  ============================= */

  const API =
    "https://revadoobackend.onrender.com/api/admin/lucky-draw";

  /* =============================
     TOKEN
  ============================= */

  const token =
    localStorage.getItem(
      "token"
    );

  /* =============================
     FETCH ACTIVE DRAW
  ============================= */

  const fetchLuckyDraw =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `${API}/current`
          );

        if (data.success) {
          setDrawData(data);
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",

          title:
            "Failed To Load",

          text:
            error.response?.data
              ?.message ||
            "Unable to load lucky draw",

          confirmButtonColor:
            "#f97316",
        });
      } finally {
        setLoading(false);
      }
    };

  /* =============================
     INITIAL LOAD
  ============================= */

  useEffect(() => {
    fetchLuckyDraw();
  }, []);

  /* =============================
     LIVE TIMER
  ============================= */

useEffect(() => {
  if (
    !drawData?.endsAt
  )
    return;

  /* MOVE ENDTIME OUTSIDE */

  const endTime =
    new Date(
      drawData.endsAt
    ).getTime();

  const interval =
    setInterval(() => {
      const now =
        new Date().getTime();

      const distance =
        endTime - now;

      /* STOP NEGATIVE TIMER */

      if (distance <= 0) {
  clearInterval(
    interval
  );

  setTimeLeft({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  /* SHOW PICKING SCREEN */

  setDrawStatus(
    "picking"
  );

  /* REFRESH RESULT */

  setTimeout(
    async () => {
      try {
        const { data } =
          await axios.get(
            `${API}/current`
          );

        if (
          data?.status ===
          "completed"
        ) {
          setDrawData(
            data
          );

          setDrawStatus(
            "completed"
          );
        }
      } catch (error) {
        console.log(
          error
        );
      }
    },

    12000
  );

  return;
}

      const days =
        Math.floor(
          distance /
            (1000 *
              60 *
              60 *
              24)
        );

      const hours =
        Math.floor(
          (distance %
            (1000 *
              60 *
              60 *
              24)) /
            (1000 *
              60 *
              60)
        );

      const minutes =
        Math.floor(
          (distance %
            (1000 *
              60 *
              60)) /
            (1000 *
              60)
        );

      const seconds =
        Math.floor(
          (distance %
            (1000 *
              60)) /
            1000
        );

      setTimeLeft({
        days: String(
          days
        ).padStart(2, "0"),

        hours: String(
          hours
        ).padStart(2, "0"),

        minutes: String(
          minutes
        ).padStart(2, "0"),

        seconds: String(
          seconds
        ).padStart(2, "0"),
      });
    }, 1000);

  return () =>
    clearInterval(interval);
}, [drawData]);

/* =============================
   VALUES
============================= */
// eslint-disable-next-line no-unused-vars
const maxTickets =
  drawData?.maxTicketsPerUser ||
  5;

const remainingTickets =
  drawData?.remainingTickets ||
  0;

const ticketPrice =
  drawData?.entryFee || 0;

const totalPrice =
  tickets *
  ticketPrice;

  /* =============================
     FUNCTIONS
  ============================= */

  const increaseTickets =
  () => {
    if (
      tickets <
      remainingTickets
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

  /* =============================
     PURCHASE
  ============================= */

  const handleJoin =
  async () => {
    try {
      /* LOGIN CHECK */

      if (!token) {
        Swal.fire({
          icon: "warning",

          title:
            "Login Required",

          text:
            "Please login first",

          confirmButtonColor:
            "#f97316",
        });

        return;
      }

      /* DRAW CHECK */

      if (!drawData?._id) {
        return;
      }

      /* REMAINING TICKETS CHECK */

      if (
        remainingTickets <= 0
      ) {
        Swal.fire({
          icon: "warning",

          title:
            "Ticket Limit Reached",

          text:
            "You already purchased the maximum allowed tickets for this lucky draw.",

          confirmButtonColor:
            "#f97316",
        });

        return;
      }

      /* USER TRYING TO BUY MORE */

      if (
        tickets >
        remainingTickets
      ) {
        Swal.fire({
          icon: "warning",

          title:
            "Not Enough Ticket Slots",

          text: `You only have ${remainingTickets} ticket slot${
            remainingTickets > 1
              ? "s"
              : ""
          } remaining.`,

          confirmButtonColor:
            "#f97316",
        });

        return;
      }

      setJoining(true);

      /* PURCHASE */

      const { data } =
        await axios.post(
          `${API}/purchase`,
          {
            drawId:
              drawData._id,

            tickets,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      /* SUCCESS */

      if (data.success) {
        Swal.fire({
          icon: "success",

          title:
            "Successfully Joined",

          html: `
            <div style="font-size:14px;">
              <p>
                You purchased
                <b>${tickets}</b>
                ticket${
                  tickets > 1
                    ? "s"
                    : ""
                }
              </p>

              <p style="margin-top:10px;">
                Remaining Creds:
                <b>${data.remainingCreds}</b>
              </p>

              <p style="margin-top:10px;">
                Remaining Ticket Slots:
                <b>${
                  remainingTickets -
                  tickets
                }</b>
              </p>
            </div>
          `,

          confirmButtonColor:
            "#f97316",
        });

        /* RESET */

        setTickets(1);

        /* REFRESH DRAW */

        fetchLuckyDraw();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title:
          "Purchase Failed",

        text:
          error.response?.data
            ?.message ||
          "Failed to purchase tickets",

        confirmButtonColor:
          "#f97316",
      });
    } finally {
      setJoining(false);
    }
  };

  /* =============================
     LOADING
  ============================= */

  if (loading) {
    return (
      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-[28px]
          p-8
          flex
          items-center
          justify-center
          min-h-[500px]
        "
      >
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-orange-200
              border-t-orange-500
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-5 text-sm font-bold text-gray-500">
            Loading Lucky
            Draw...
          </p>
        </div>
      </div>
    );
  }

  /* =============================
   PICKING STATE
============================= */

if (
  drawStatus ===
  "picking"
) {
  return (
    <Lucky_Draw_Picking />
  );
}

/* =============================
   RESULT STATE
============================= */

if (
  drawStatus ===
  "completed"
) {
  return (
    <Lucky_Draw_Result
      drawData={
        drawData
      }
    />
  );
}

  if (!drawData) {
    
    return (
      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-[28px]
          p-8
          text-center
        "
      >
        <div className="text-6xl mb-5">
          🎁
        </div>

        <h2 className="text-2xl font-black text-black">
          No Active Lucky
          Draw
        </h2>

        <p className="text-gray-500 mt-3">
          New reward events
          will appear soon.
        </p>
      </div>
    );
  }

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
          {
            drawData.rewardTitle
          }
        </h2>
      </div>

      {/* MAIN CARD */}

      <div className="mt-2">
        <div className="flex justify-center">
          <div
            className="
              w-full
              max-w-[420px]
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
            {/* IMAGE */}

            {drawData.rewardImage ? (
              <img
  src={
    drawData.rewardImage
  }
  alt="reward"
  className="
    w-28
    h-28
    sm:w-36
    sm:h-36
    lg:w-44
    lg:h-44
    object-cover
    rounded-[32px]
    mx-auto
    mb-6
    shadow-lg
    shadow-orange-200/40
    border
    border-orange-100
  "
/>
            ) : (
              <div className="text-5xl sm:text-6xl mb-4">
                🎁
              </div>
            )}

           <h3 className="text-xl sm:text-3xl font-black text-black tracking-tight leading-tight">
  Prize Pool
</h3>

<p className="text-base sm:text-xl font-semibold text-gray-700 mt-4 leading-relaxed">
  {
    drawData.description
      ? drawData.description
      : drawData.rewardTitle
  }
</p>

<p className="text-xs sm:text-sm text-orange-500 font-bold mt-3 uppercase tracking-wider">
  Premium Reward Event
</p>

            {/* TIMER */}

            <div
              className="
                mt-5
                grid
                grid-cols-4
                gap-2
              "
            >
              {[
                {
                  value:
                    timeLeft.days,

                  label: "Days",
                },

                {
                  value:
                    timeLeft.hours,

                  label: "Hours",
                },

                {
                  value:
                    timeLeft.minutes,

                  label: "Min",
                },

                {
                  value:
                    timeLeft.seconds,

                  label: "Sec",
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
                      py-3
                      text-center
                    "
                  >
                    <h4 className="text-lg sm:text-2xl font-black text-black leading-none">
                      {item.value}
                    </h4>

                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-500 font-black mt-2">
                      {item.label}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-3
            gap-3
            sm:gap-5
            mt-4
          "
        >
          {/* ENTRY */}

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
              {
                drawData.entryFee
              }{" "}
              Creds
            </p>

            <p className="text-[10px] sm:text-xs text-orange-500 font-bold mt-2">
              Per Ticket
            </p>
          </div>

          {/* WINNERS */}

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
              Winners
            </h3>

            <p className="text-[11px] sm:text-base font-semibold text-gray-500 mt-3">
              {
                drawData.totalWinners
              }{" "}
              Users
            </p>

            <p className="text-[10px] sm:text-xs text-orange-500 font-bold mt-2">
              Selected
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
              🎫
            </div>

            <h3 className="text-xs sm:text-xl font-black text-black leading-tight">
              Tickets Sold
            </h3>

            <p className="text-[11px] sm:text-base font-semibold text-gray-500 mt-3">
              {
                drawData.ticketsSold
              }
            </p>

            <p className="text-[10px] sm:text-xs text-orange-500 font-bold mt-2">
              Live Entries
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
            Join The Revadoo
            Lucky Draw
          </h4>
        </div>

        {/* ACTION */}

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
  {remainingTickets} Left
</p>
            </div>

            <button
              onClick={
                increaseTickets
              }
             disabled={
  tickets >=
  remainingTickets
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

          {/* BUTTON */}

          <button
            onClick={
              handleJoin
            }
            disabled={joining}
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
              disabled:opacity-50
            "
          >
            {joining
              ? "Processing..."
              : `Join For ${totalPrice} Creds`}
          </button>
        </div>

        {/* INFO */}

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
  Each account can
  purchase a
  maximum of{" "}
  <span className="font-black text-orange-500">
    {maxTickets} tickets
  </span>{" "}
  per lucky draw
  event.

  {remainingTickets > 0 ? (
    <>
      {" "}
      You currently have{" "}
      <span className="font-black text-orange-500">
        {remainingTickets} ticket
        {remainingTickets > 1
          ? "s"
          : ""}
      </span>{" "}
      remaining.
    </>
  ) : (
    <>
      {" "}
      <span className="font-black text-red-500">
        You have reached your ticket limit for this event.
      </span>
    </>
  )}
</p>
        </div>
      </div>
    </div>
  );
}

export default Lucky_Draw_Active;