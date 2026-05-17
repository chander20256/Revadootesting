import React, {
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

function PTC_Card({
  ad,

  isFavorite,

  toggleFavorite,
}) {
  const [
    currentTimer,
    setCurrentTimer,
  ] = useState(
    ad.timer || 0
  );

  const [
    isRunning,
    setIsRunning,
  ] = useState(false);

  const [
    completed,
    setCompleted,
  ] = useState(false);

  const [
    adWindow,
    setAdWindow,
  ] = useState(null);

  /* =========================================
     COMPLETION SOUND
  ========================================= */

  const playCompleteSound =
    () => {
      const audio =
        new Audio(
          "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        );

      audio.play();
    };

  /* =========================================
     TIMER + TAB CHECK
  ========================================= */

  useEffect(() => {
    let interval;

    if (
      isRunning &&
      currentTimer > 0
    ) {
      interval =
        setInterval(() => {
          /* USER RETURNED */

          if (
            !document.hidden
          ) {
            clearInterval(
              interval
            );

            setIsRunning(
              false
            );

            setCurrentTimer(
              ad.timer
            );

            document.title =
              "Revadoo";

            Swal.fire({
              icon: "warning",

              title:
                "Timer Reset",

              text: "You returned before timer completion.",

              confirmButtonColor:
                "#FF6B00",
            });

            return;
          }

          /* USER CLOSED TAB */

          if (
            adWindow &&
            adWindow.closed
          ) {
            clearInterval(
              interval
            );

            setIsRunning(
              false
            );

            setCurrentTimer(
              ad.timer
            );

            document.title =
              "Revadoo";

            Swal.fire({
              icon: "error",

              title:
                "Ad Closed",

              text: "You closed the ad before completion.",

              confirmButtonColor:
                "#FF6B00",
            });

            return;
          }

          /* COUNTDOWN */

          setCurrentTimer(
            (prev) => {
              const newTime =
                prev - 1;

              document.title =
                `⏳ ${newTime}s Left | Revadoo`;

              return newTime;
            }
          );
        }, 1000);
    }

    /* COMPLETE */

    if (
      currentTimer === 0 &&
      isRunning
    ) {
      clearInterval(
        interval
      );

      setIsRunning(false);

      setCompleted(true);

      /* TAB TITLE */

      document.title =
        "🎉 Reward Ready | Revadoo";

      /* SOUND */

      playCompleteSound();

      /* SUCCESS ALERT */

      Swal.fire({
        icon: "success",

        title:
          "Reward Ready!",

        text: `You successfully completed ${ad.title}.`,

        confirmButtonColor:
          "#FF6B00",
      });

      /* TEST MODE RESET */

      setTimeout(() => {
        setCompleted(false);

        setCurrentTimer(
          ad.timer
        );

        document.title =
          "Revadoo";
      }, 3000);
    }

    return () =>
      clearInterval(
        interval
      );
  }, [
    isRunning,
    currentTimer,
    adWindow,
    ad.timer,
    ad.title,
  ]);

  /* =========================================
     HANDLE START
  ========================================= */

  const handleStart =
    () => {
      const newTab =
        window.open(
          ad.adUrl,
          "_blank"
        );

      if (!newTab) {
        Swal.fire({
          icon: "error",

          title:
            "Popup Blocked",

          text: "Please allow popups for Revadoo.",

          confirmButtonColor:
            "#FF6B00",
        });

        return;
      }

      setAdWindow(
        newTab
      );

      setCurrentTimer(
        ad.timer
      );

      setIsRunning(true);

      Swal.fire({
        icon: "info",

        title:
          "PTC Started",

        text: `Stay on the ad page for ${ad.timer} seconds.`,

        timer: 2000,

        showConfirmButton: false,
      });
    };

  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-[18px]
        sm:rounded-[28px]
        p-2.5
        sm:p-5
        transition-all
        duration-300
        flex
        flex-col
        h-full
      "
      style={{
        background:
          "#ffffff",

        border:
          isFavorite
            ? "1px solid rgba(255,107,0,0.25)"
            : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-2">
        {/* PROVIDER */}

        <div
          className="
            min-w-[34px]
            h-8
            sm:min-w-[48px]
            sm:h-12
            px-2
            rounded-xl
            flex
            items-center
            justify-center
            text-[8px]
            sm:text-xs
            font-black
            uppercase
          "
          style={{
            background:
              "rgba(255,107,0,0.10)",

            color:
              "#FF6B00",
          }}
        >
          {ad.provider}
        </div>

        {/* FAVORITE */}

        <button
          onClick={() =>
            toggleFavorite(
              ad._id
            )
          }
        >
          {isFavorite
            ? "⭐"
            : "☆"}
        </button>
      </div>

      {/* CONTENT */}

      <div className="mt-3 flex-1 flex flex-col">
        {/* TITLE */}

        <h2
          className="
            text-[11px]
            sm:text-lg
            font-black
            leading-snug
          "
        >
          {ad.title}
        </h2>

        {/* TYPE */}

        <div
          className="
            mt-2
            inline-flex
            px-2
            py-1
            rounded-full
            text-[8px]
            sm:text-xs
            font-bold
            w-fit
          "
          style={{
            background:
              "rgba(59,130,246,0.10)",

            color:
              "#2563eb",
          }}
        >
          {ad.adType}
        </div>

        {/* REWARD */}

        <div className="flex gap-1 mt-2 flex-wrap">
          <div
            className="
              px-2
              py-1
              rounded-full
              text-[8px]
              sm:text-xs
              font-bold
            "
            style={{
              background:
                "rgba(255,107,0,0.10)",

              color:
                "#FF6B00",
            }}
          >
            {ad.reward} Creds
          </div>

          <div
            className="
              px-2
              py-1
              rounded-full
              text-[8px]
              sm:text-xs
              font-bold
            "
            style={{
              background:
                "rgba(0,0,0,0.05)",

              color:
                "#6b7280",
            }}
          >
            {ad.timer}s
          </div>
        </div>

        <div className="flex-1" />

        {/* TEST TEXT */}

        <p
          className="
            text-[9px]
            sm:text-[10px]
            mt-3
            mb-2
            font-medium
          "
          style={{
            color:
              "#9ca3af",
          }}
        >
          Test mode enabled for
          repeated PTC testing.
        </p>

        {/* BUTTON */}

        <button
          onClick={
            handleStart
          }
          disabled={
            isRunning
          }
          className="
            h-9
            sm:h-10
            w-full
            rounded-xl
            text-[10px]
            sm:text-sm
            font-bold
            transition-all
            duration-300
          "
          style={{
            background:
              completed
                ? "#ef4444"
                : isRunning
                ? "#FF6B00"
                : "#22c55e",

            color:
              "#ffffff",

            cursor:
              isRunning
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isRunning ? (
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  animate-pulse
                "
                style={{
                  background:
                    "#ffffff",
                }}
              />

              {currentTimer}s
              Left
            </div>
          ) : completed ? (
            "Reward Ready"
          ) : (
            "Visit"
          )}
        </button>
      </div>

      {/* FAVORITE BADGE */}

      {isFavorite && (
        <div
          className="
            absolute
            top-0
            right-0
            px-2
            py-1
            rounded-bl-xl
            text-[7px]
            sm:text-[10px]
            font-black
            uppercase
          "
          style={{
            background:
              "#FF6B00",

            color:
              "#ffffff",
          }}
        >
          Fav
        </div>
      )}
    </article>
  );
}

export default PTC_Card;