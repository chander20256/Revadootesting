import React, { useState } from "react";

import Swal from "sweetalert2";

import {
  FaPlus,
  FaCopy,
  FaTicketAlt,
  FaCoins,
  FaUsers,
} from "react-icons/fa";

const API_BASE_URL =
  "https://revadoobackend.onrender.com/api/admin";

function Creds_generate() {
  const [code, setCode] =
    useState("");

  const [reward, setReward] =
    useState("");

  const [maxClaims, setMaxClaims] =
    useState("");

  const [expiryDate, setExpiryDate] =
    useState("");

  const [generated, setGenerated] =
    useState(null);

  // GENERATE CODE

 const generateCode = async () => {
  try {
    // RANDOM PART

    const generateRandomPart =
      () => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        let result = "";

        for (
          let i = 0;
          i < 4;
          i++
        ) {
          result += chars.charAt(
            Math.floor(
              Math.random() *
                chars.length
            )
          );
        }

        return result;
      };

    const randomCode = `REVA-${generateRandomPart()}`;

    const totalClaims =
      Number(maxClaims) || 1;

    // BACKEND REQUEST

    const response =
      await fetch(
  `${API_BASE_URL}/creds/create`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            code: randomCode,

            reward:
              reward ||
              "Random Creds",

            maxClaims:
              totalClaims,

            expiryDate,
          }),
        }
      );

    const data =
      await response.json();

    // SUCCESS

    if (data.success) {
      setGenerated(data.data);

      setCode(randomCode);

      Swal.fire({
        icon: "success",

        title:
          "Code Generated",

        text: `${randomCode} created successfully`,

        confirmButtonColor:
          "#FF6B00",
      });

      // RESET

      setReward("");

      setMaxClaims("");

      setExpiryDate("");
    } else {
      Swal.fire({
        icon: "error",

        title: "Failed",

        text:
          data.message ||
          "Something went wrong",

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

  // COPY CODE

  const copyCode = async () => {
    if (!generated) return;

    await navigator.clipboard.writeText(
      generated.code
    );

    Swal.fire({
      icon: "success",
      title: "Copied",
      text: "Code copied successfully",
      confirmButtonColor: "#FF6B00",
    });
  };

  return (
    <div
      className="space-y-6"
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* TOP CARD */}

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
        }}
      >
        {/* GLOW */}

        <div
          className="
            absolute
            top-[-100px]
            right-[-100px]
            w-[220px]
            h-[220px]
            rounded-full
            blur-3xl
            opacity-10
          "
          style={{
            background: "#FF6B00",
          }}
        />

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
              Generate
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {" "}
                Creds Code
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
              Create Revadoo reward
              codes with limited
              claims, expiry control,
              and branded REVA
              generation.
            </p>
          </div>

          {/* FORM */}

          <div
            className="
              mt-8
              grid
              grid-cols-1
              lg:grid-cols-4
              gap-5
            "
          >
            {/* GENERATED CODE */}

            <div>
              <label
                className="
                  text-sm
                  font-semibold
                "
              >
                Generated Code
              </label>

              <div className="relative mt-2">
                <FaTicketAlt
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                  "
                  color="#FF6B00"
                />

                <input
                  type="text"
                  value={code}
                  readOnly
                  placeholder="Generated code"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    pl-12
                    pr-4
                    outline-none
                    text-sm
                    font-semibold
                  "
                  style={{
                    border:
                      "1px solid rgba(255,107,0,0.12)",
                  }}
                />
              </div>
            </div>

            {/* REWARD */}

            <div>
              <label
                className="
                  text-sm
                  font-semibold
                "
              >
                Reward Type
              </label>

              <div className="relative mt-2">
                <FaCoins
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                  "
                  color="#FF6B00"
                />

                <input
                  type="text"
                  value={reward}
                  onChange={(e) =>
                    setReward(
                      e.target.value
                    )
                  }
                  placeholder="500 Creds"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    pl-12
                    pr-4
                    outline-none
                    text-sm
                  "
                  style={{
                    border:
                      "1px solid rgba(255,107,0,0.12)",
                  }}
                />
              </div>
            </div>

            {/* CLAIM LIMIT */}

            <div>
              <label
                className="
                  text-sm
                  font-semibold
                "
              >
                Total Claims
              </label>

              <div className="relative mt-2">
                <FaUsers
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                  "
                  color="#FF6B00"
                />

                <input
                  type="number"
                  value={maxClaims}
                  onChange={(e) =>
                    setMaxClaims(
                      e.target.value
                    )
                  }
                  placeholder="Example: 2"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    pl-12
                    pr-4
                    outline-none
                    text-sm
                  "
                  style={{
                    border:
                      "1px solid rgba(255,107,0,0.12)",
                  }}
                />
              </div>
            </div>

            {/* EXPIRY */}

            <div>
              <label
                className="
                  text-sm
                  font-semibold
                "
              >
                Expiry Date
              </label>

              <div className="mt-2">
                <input
                  type="datetime-local"
                  value={expiryDate}
                  onChange={(e) =>
                    setExpiryDate(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    px-4
                    outline-none
                    text-sm
                  "
                  style={{
                    border:
                      "1px solid rgba(255,107,0,0.12)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-6 flex flex-wrap gap-4">
            {/* GENERATE */}

            <button
              onClick={generateCode}
              className="
                h-14
                px-6
                rounded-2xl
                text-white
                font-bold
                text-sm
                flex
                items-center
                gap-3
                transition-all
                duration-300
                hover:scale-[1.02]
              "
              style={{
                background:
                  "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                boxShadow:
                  "0 10px 25px rgba(255,107,0,0.20)",
              }}
            >
              <FaPlus />
              Generate Code
            </button>

            {/* COPY */}

            <button
              onClick={copyCode}
              disabled={!generated}
              className="
                h-14
                px-6
                rounded-2xl
                font-bold
                text-sm
                flex
                items-center
                gap-3
                transition-all
                duration-300
              "
              style={{
                background:
                  "rgba(255,107,0,0.08)",

                color: "#FF6B00",

                opacity:
                  generated ? 1 : 0.5,
              }}
            >
              <FaCopy />
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creds_generate;