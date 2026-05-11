import React, {
  useState,
} from "react";

import Swal from "sweetalert2";

import {
  FaCheckCircle,
  FaTicketAlt,
} from "react-icons/fa";

const API_BASE_URL =
  "https://revadoobackend.onrender.com/api/admin";

function Creds_claim() {
  const [code, setCode] =
    useState("");

  // CLAIM CODE

  const handleClaim =
    async () => {
      try {
        const trimmedCode =
          code.trim();

        // EMPTY

        if (!trimmedCode) {
          Swal.fire({
            icon: "warning",

            title:
              "Enter Code",

            text:
              "Please enter a reward code",

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        /* -----------------------------
           GET USER ID
        ----------------------------- */

        let userId = null;

        /* DIRECT STORAGE */

        userId =
          localStorage.getItem(
            "userId"
          );

        /* FALLBACK CHECK */

        if (!userId) {
          const possibleKeys = [
            "user",
            "authUser",
            "userData",
            "currentUser",
          ];

          for (const key of possibleKeys) {
            const stored =
              localStorage.getItem(
                key
              );

            if (stored) {
              try {
                const parsed =
                  JSON.parse(
                    stored
                  );

                // SUPPORT BOTH
                // _id AND id

                if (
                  parsed?._id ||
                  parsed?.id
                ) {
                  userId =
                    parsed._id ||
                    parsed.id;

                  break;
                }
              } catch (error) {
                console.log(
                  error
                );
              }
            }
          }
        }

        // LOGIN CHECK

        if (!userId) {
          Swal.fire({
            icon: "error",

            title:
              "Login Required",

            text:
              "Please login first",

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        /* -----------------------------
           CLAIM REQUEST
        ----------------------------- */

        const response =
          await fetch(
            `${API_BASE_URL}/creds/claim`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                code:
                  trimmedCode,

                userId,
              }),
            }
          );

        const data =
          await response.json();

        /* -----------------------------
           SUCCESS
        ----------------------------- */

        if (data.success) {
          Swal.fire({
            icon: "success",

            title:
              "Reward Claimed",

            text: `+${data.reward} Creds Added`,

            confirmButtonColor:
              "#FF6B00",
          });

          setCode("");
        }

        /* -----------------------------
           FAILED
        ----------------------------- */

        else {
          Swal.fire({
            icon: "error",

            title:
              "Claim Failed",

            text:
              data.message,

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
            "Unable to connect to backend",

          confirmButtonColor:
            "#FF6B00",
        });
      }
    };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        p-5
        sm:p-7
        lg:p-8
      "
      style={{
        background: "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 40px rgba(0,0,0,0.05)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      

      <div className="relative z-10">
        {/* HEADER */}

        <div className="max-w-2xl">
          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-black
              leading-tight
            "
            style={{
              color: "#030712",
            }}
          >
            Enter Your
            <span
              style={{
                color: "#FF6B00",
              }}
            >
              {" "}
              Code
            </span>
          </h2>

          <p
            className="
              mt-3
              text-sm
              sm:text-base
              leading-7
              max-w-xl
            "
            style={{
              color: "#6b7280",
            }}
          >
            Use today’s Telegram
            reward code to unlock
            random creds, EXP boosts,
            and exclusive Revadoo
            rewards instantly.
          </p>
        </div>

        {/* CLAIM BOX */}

        <div
          className="
            mt-7
            rounded-3xl
            p-4
            sm:p-5
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
              flex
              flex-col
              md:flex-row
              gap-4
            "
          >
            {/* INPUT */}

            <div className="flex-1 relative">
              <FaTicketAlt
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                "
                color="#FF6B00"
                size={15}
              />

              <input
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value
                  )
                }
                placeholder="Enter reward code"
                className="
    w-full
    h-14
    rounded-2xl
    pl-12
    pr-4
    text-[16px]
    sm:text-base
    outline-none
    transition-all
    duration-300
  "
                style={{
                  background:
                    "#ffffff",

                  border:
                    "1px solid rgba(255,107,0,0.12)",

                  color:
                    "#111827",

                  WebkitAppearance:
                    "none",

                  appearance:
                    "none",
                }}
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={
                handleClaim
              }
              className="
                h-14
                px-6
                rounded-2xl
                text-white
                font-bold
                text-sm
                flex
                items-center
                justify-center
                gap-2
                whitespace-nowrap
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
              "
              style={{
                background:
                  "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                boxShadow:
                  "0 10px 25px rgba(255,107,0,0.20)",
              }}
            >
              <FaCheckCircle />
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creds_claim;