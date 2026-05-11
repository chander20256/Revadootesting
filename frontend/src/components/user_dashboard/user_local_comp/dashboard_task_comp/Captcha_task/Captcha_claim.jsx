import React, {
  useState,
  useEffect,
} from "react";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import {
  FaCoins,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import Swal from "sweetalert2";

function Captcha_claim() {
  const [verified, setVerified] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [reward, setReward] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(0);

  const [cooldownActive, setCooldownActive] =
    useState(false);

  /* -----------------------------
     COUNTDOWN TIMER
  ----------------------------- */

  useEffect(() => {
    let interval;

    if (
      cooldownActive &&
      timeLeft > 0
    ) {
      interval =
        setInterval(() => {
          setTimeLeft(
            (prev) => {
              if (prev <= 1) {
                clearInterval(
                  interval);

                setCooldownActive(
                  false
                );

                return 0;
              }

              return prev - 1;
            }
          );
        }, 1000);
    }

    return () =>
      clearInterval(
        interval
      );
  }, [
    cooldownActive,
    timeLeft,
  ]);

  /* -----------------------------
     RESTORE COOLDOWN
  ----------------------------- */

  useEffect(() => {
    const checkCooldown =
      async () => {
        try {
          const userId =
            localStorage.getItem(
              "userId"
            );

          if (!userId) return;

          const response =
            await fetch(
              `https://revadoobackend.onrender.com/api/hcaptcha/status/${userId}`
            );

          const data =
            await response.json();

          if (
            data.cooldown
          ) {
            setCooldownActive(
              true
            );

            setTimeLeft(
              data.remainingSeconds
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

    checkCooldown();
  }, []);

  /* -----------------------------
     VERIFY CAPTCHA
  ----------------------------- */

  const handleVerify =
    async (token) => {
      setLoading(true);

      try {
        const response =
          await fetch(
            "https://revadoobackend.onrender.com/api/hcaptcha/verify",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                token,

                userId:
                  localStorage.getItem(
                    "userId"
                  ),
              }),
            }
          );

        const data =
          await response.json();

        /* COOLDOWN */

        if (data.cooldown) {
          setVerified(false);

          setCooldownActive(
            true
          );

          setTimeLeft(
            data.remainingMinutes *
              60
          );

          Swal.fire({
            icon: "warning",

            title:
              "Cooldown Active",

            text: `Please wait ${data.remainingMinutes} minutes before claiming again`,

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        /* SUCCESS */

        if (data.success) {
          setVerified(true);

          setReward(
            data.reward
          );

          setCooldownActive(
            true
          );

          setTimeLeft(
            30 * 60
          );

          localStorage.setItem(
            "balance",
            data.newBalance
          );

          Swal.fire({
            icon: "success",

            title: `+${data.reward} Creds Earned`,

            text:
              "Reward added to your balance",

            confirmButtonColor:
              "#FF6B00",
          });
        } else {
          setVerified(false);

          Swal.fire({
            icon: "error",

            title:
              "Verification Failed",

            text:
              data.message ||
              "Captcha verification failed",

            confirmButtonColor:
              "#FF6B00",
          });
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",

          title:
            "Server Error",

          text:
            "Something went wrong",

          confirmButtonColor:
            "#FF6B00",
        });
      } finally {
        setLoading(false);
      }
    };

  /* -----------------------------
     FORMAT TIMER
  ----------------------------- */

  const formatTime =
    (seconds) => {
      const mins =
        Math.floor(
          seconds / 60
        );

      const secs =
        seconds % 60;

      return `${mins}:${
        secs < 10
          ? "0"
          : ""
      }${secs}`;
    };

  return (
    <section
      className="
        w-full
      "
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* CAPTCHA BOX */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          bg-white
          p-4
          sm:rounded-[32px]
          sm:p-6
          lg:p-8
        "
        style={{
          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.05)",
        }}
      >
        <div className="relative z-10">
          {/* HEADER */}

          <div className="text-center">
            <h2
              className="
                text-2xl
                font-black
                sm:text-4xl
              "
              style={{
                color:
                  "#030712",
              }}
            >
              Solve Captcha &
              Earn Rewards
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                leading-7
                sm:text-base
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Complete captcha
              verification and
              instantly receive
              random creds rewards.
            </p>
          </div>

          {/* STATS */}

          <div
            className="
              mt-6
              grid
              grid-cols-3
              gap-3
            "
          >
            {[
              {
                icon:
                  <FaCoins />,

                title:
                  "1-10",

                desc:
                  "Creds",
              },

              {
                icon:
                  <FaClock />,

                title:
                  "30 Min",

                desc:
                  "Cooldown",
              },

              {
                icon:
                  <FaCheckCircle />,

                title:
                  "Instant",

                desc:
                  "Rewards",
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    p-3
                    text-center
                    sm:p-4
                  "
                  style={{
                    background:
                      "rgba(255,107,0,0.03)",

                    border:
                      "1px solid rgba(255,107,0,0.08)",
                  }}
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      text-sm
                      sm:h-11
                      sm:w-11
                    "
                    style={{
                      background:
                        "rgba(255,107,0,0.08)",

                      color:
                        "#FF6B00",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
                      mt-3
                      text-sm
                      font-black
                      sm:text-lg
                    "
                    style={{
                      color:
                        "#030712",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      text-[10px]
                      sm:text-xs
                    "
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              )
            )}
          </div>

          {/* CAPTCHA */}

          <div
            className="
              mt-8
              flex
              justify-center
            "
          >
            <div
              className="
                w-full
                max-w-[320px]
                rounded-[24px]
                p-4
                sm:max-w-[400px]
                sm:p-5
              "
              style={{
                background:
                  "rgba(255,107,0,0.03)",

                border:
                  "1px dashed rgba(255,107,0,0.15)",
              }}
            >
              <div className="flex justify-center">
                <HCaptcha
                  sitekey="f79a5b60-3b96-4d46-92ec-b5c47bda3d2c"
                  onVerify={
                    handleVerify
                  }
                />
              </div>

              {/* BUTTON */}

              <button
                disabled={
                  loading ||
                  cooldownActive
                }
                className="
                  mt-4
                  h-11
                  w-full
                  rounded-2xl
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  sm:h-12
                  sm:text-base
                "
                style={{
                  background:
                    verified
                      ? "#16A34A"
                      : "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                  boxShadow:
                    verified
                      ? "0 10px 25px rgba(22,163,74,0.18)"
                      : "0 10px 25px rgba(255,107,0,0.18)",
                }}
              >
                {loading
                  ? "Verifying..."
                  : cooldownActive
                  ? `Next Claim In ${formatTime(
                      timeLeft
                    )}`
                  : verified
                  ? `+${reward} Creds Added`
                  : "Verify & Claim"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Captcha_claim;