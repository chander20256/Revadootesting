import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

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
     TIMER SYSTEM
  ========================================= */

  useEffect(() => {
    let interval;

    if (
      isRunning &&
      currentTimer > 0
    ) {
      interval =
        setInterval(
          async () => {
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

              try {
                await axios.post(
                  "https://revadoobackend.onrender.com/api/ptc/cancel",

                  {},

                  {
                    headers:
                      {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                  }
                );
              } catch (error) {
                console.log(
                  error
                );
              }

              Swal.fire({
                icon:
                  "warning",

                title:
                  "Timer Reset",

                text: "You returned before completion.",

                confirmButtonColor:
                  "#FF6B00",
              });

              return;
            }

            /* TAB CLOSED */

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

              try {
                await axios.post(
                  "https://revadoobackend.onrender.com/api/ptc/cancel",

                  {},

                  {
                    headers:
                      {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                  }
                );
              } catch (error) {
                console.log(
                  error
                );
              }

              Swal.fire({
                icon:
                  "error",

                title:
                  "Ad Closed",

                text: "You closed the ad before completion.",

                confirmButtonColor:
                  "#FF6B00",
              });

              return;
            }

            /* TIMER */

            setCurrentTimer(
              (
                prev
              ) => {
                const newTime =
                  prev - 1;

                document.title =
                  `⏳ ${newTime}s Left | Revadoo`;

                return newTime;
              }
            );
          },

          1000
        );
    }

    /* COMPLETE */

    if (
      currentTimer ===
        0 &&
      isRunning
    ) {
      clearInterval(
        interval
      );

      setIsRunning(false);

      const completeTask =
        async () => {
          try {
            const response =
              await axios.post(
                "https://revadoobackend.onrender.com/api/ptc/complete",

                {
                  adId:
                    ad._id,
                },

                {
                  headers:
                    {
                      Authorization: `Bearer ${localStorage.getItem(
                        "token"
                      )}`,
                    },
                }
              );

            if (
              response.data
                .success
            ) {
              setCompleted(
                true
              );

              document.title =
                "🎉 Reward Ready | Revadoo";

              Swal.fire({
                icon:
                  "success",

                title:
                  "Reward Claimed!",

                text: `You earned ${response.data.reward} Creds.`,

                confirmButtonColor:
                  "#FF6B00",
              });
            }
          } catch (error) {
            console.log(
              error
            );

            Swal.fire({
              icon:
                "error",

              title:
                "Verification Failed",

              text:
                error
                  ?.response
                  ?.data
                  ?.message ||
                "PTC verification failed.",

              confirmButtonColor:
                "#FF6B00",
            });
          }
        };

      completeTask();
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
    ad._id,
  ]);

  /* =========================================
     START TASK
  ========================================= */

  const handleStart =
    async () => {
      let openedTab = null;

      try {
        /* OPEN TAB INSTANT */

        openedTab =
          window.open(
            ad.adUrl,
            "_blank"
          );

        if (!openedTab) {
          Swal.fire({
            icon:
              "error",

            title:
              "Popup Blocked",

            text: "Please allow popups.",

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        setAdWindow(
          openedTab
        );

        /* START SESSION */

        const response =
          await axios.post(
            "https://revadoobackend.onrender.com/api/ptc/start",

            {
              adId:
                ad._id,
            },

            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          );

        if (
          !response.data
            .success
        ) {
          openedTab.close();

          return;
        }

        /* START TIMER */

        setCurrentTimer(
          ad.timer
        );

        setIsRunning(true);

        document.title =
          `⏳ ${ad.timer}s Left | Revadoo`;

        Swal.fire({
          icon: "info",

          title:
            "PTC Started",

          text: `Stay on the ad page for ${ad.timer} seconds.`,

          timer: 1500,

          showConfirmButton:
            false,
        });
      } catch (error) {
        console.log(
          error
        );

        if (
          openedTab &&
          !openedTab.closed
        ) {
          openedTab.close();
        }

        setIsRunning(false);

        setCurrentTimer(
          ad.timer
        );

        document.title =
          "Revadoo";

        Swal.fire({
          icon: "error",

          title:
            "PTC Failed",

          text:
            error?.response
              ?.data
              ?.message ||
            "Unable to start PTC.",

          confirmButtonColor:
            "#FF6B00",
        });
      }
    };

  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-[22px]
        sm:rounded-[28px]
        p-3
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
            ? "1px solid rgba(255,107,0,0.18)"
            : "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      {/* TOP */}

      <div className="flex items-center justify-between">
        <div
          className="
            h-8
            sm:h-10
            px-3
            rounded-xl
            flex
            items-center
            justify-center
            text-[9px]
            sm:text-[11px]
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

        <button
          onClick={() =>
            toggleFavorite(
              ad._id
            )
          }
          className="
            w-8
            h-8
            rounded-xl
            flex
            items-center
            justify-center
          "
          style={{
            background:
              "rgba(0,0,0,0.04)",
          }}
        >
          {isFavorite
            ? "⭐"
            : "☆"}
        </button>
      </div>

      {/* CONTENT */}

      <div className="flex flex-col flex-1 mt-4">
        <h2
          className="
            text-[12px]
            sm:text-[16px]
            font-black
            leading-snug
            line-clamp-2
            min-h-[42px]
            sm:min-h-[50px]
          "
        >
          {ad.title}
        </h2>

        {/* BADGES */}

        <div className="flex flex-wrap gap-2 mt-3">
          <div
            className="
              px-2.5
              h-7
              rounded-xl
              flex
              items-center
              text-[9px]
              sm:text-[11px]
              font-bold
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

          <div
            className="
              px-2.5
              h-7
              rounded-xl
              flex
              items-center
              text-[9px]
              sm:text-[11px]
              font-bold
            "
            style={{
              background:
                "rgba(255,107,0,0.10)",

              color:
                "#FF6B00",
            }}
          >
            💰 {ad.reward}
          </div>

          <div
            className="
              px-2.5
              h-7
              rounded-xl
              flex
              items-center
              text-[9px]
              sm:text-[11px]
              font-bold
            "
            style={{
              background:
                "rgba(0,0,0,0.05)",

              color:
                "#6b7280",
            }}
          >
            ⏱ {ad.timer}s
          </div>
        </div>

        <div className="flex-1" />

        {/* RESET TEXT */}

        <div className="h-8 flex items-center justify-center mt-3">
          {completed && (
            <p
              className="
                text-[9px]
                sm:text-[11px]
                font-semibold
                text-center
              "
              style={{
                color:
                  "#9ca3af",
              }}
            >
              Reclaim again at
              12:00 AM
            </p>
          )}
        </div>

        {/* BUTTON */}

        <button
          onClick={
            handleStart
          }
          disabled={
            isRunning ||
            completed
          }
          className="
            h-10
            sm:h-11
            w-full
            rounded-2xl
            text-[11px]
            sm:text-sm
            font-black
            transition-all
            duration-300
            flex
            items-center
            justify-center
            mt-1
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
              isRunning ||
              completed
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isRunning ? (
            <div
              className="
                flex
                items-center
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

              {currentTimer}s Left
            </div>
          ) : completed ? (
            "Completed"
          ) : (
            "Visit Ad"
          )}
        </button>
      </div>
    </article>
  );
}

export default PTC_Card;