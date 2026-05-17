import React from "react";

function PTC_header() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        p-4
        sm:p-6
        lg:p-12
      "
      style={{
        background:
          "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 40px rgba(0,0,0,0.05)",
      }}
    >
      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          gap-6
          lg:gap-10
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT SIDE */}

        <div
          className="
            flex
            flex-col
            gap-5
            max-w-4xl
          "
        >
          {/* TOP BADGE */}

          <div className="flex items-center gap-3">
            <div
              className="
                p-2
                rounded-xl
              "
              style={{
                background:
                  "rgba(255,107,0,0.1)",
              }}
            >
              <span
                aria-hidden="true"
                className="text-base sm:text-lg"
              >
                💰
              </span>
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  sm:text-xs
                  uppercase
                  font-bold
                  tracking-wider
                "
                style={{
                  color:
                    "#FF6B00",
                }}
              >
                Revadoo PTC Ads
              </p>

              <p
                className="
                  text-xs
                  sm:text-sm
                  font-medium
                  mt-0.5
                "
                style={{
                  color:
                    "#6b7280",
                }}
              >
                Paid To Click Ads
              </p>
            </div>
          </div>

          {/* SEO TITLE */}

          <header className="space-y-1 sm:space-y-2">
            <h1
              className="
                text-2xl
                sm:text-4xl
                lg:text-6xl
                font-black
                tracking-tight
              "
              style={{
                color:
                  "#030712",

                lineHeight:
                  1.1,
              }}
            >
              Complete PTC Ads
              &
            </h1>

            <h2
              className="
                text-2xl
                sm:text-4xl
                lg:text-6xl
                font-black
              "
              style={{
                color:
                  "#FF6B00",

                lineHeight:
                  1.1,
              }}
            >
              Earn Rewards
            </h2>
          </header>

          {/* SEO DESCRIPTION */}

          <div className="space-y-3 max-w-3xl">
            <p
              className="
                text-xs
                sm:text-sm
                lg:text-base
                font-semibold
              "
              style={{
                color:
                  "#030712",
              }}
            >
              Complete paid-to-click
              ads and sponsor offers
              to earn rewards.
            </p>

            <p
              className="
                text-xs
                sm:text-sm
                lg:text-base
                leading-relaxed
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Earn free creds,
              leaderboard points,
              EXP bonuses, and
              instant earnings by
              completing window ads
              and external sponsor
              tasks on Revadoo.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE STATS */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            w-full
            lg:max-w-[340px]
          "
        >
          {[
            {
              title:
                "Daily Ads",
              value: "250+",
            },

            {
              title:
                "Task Types",
              value: "4+",
            },

            {
              title:
                "Claim Speed",
              value: "Instant",
            },

            {
              title:
                "Status",
              value: "Live",
            },
          ].map(
            (
              item,
              index
            ) => (
              <article
                key={index}
                className="
                  rounded-2xl
                  p-3
                  sm:p-4
                "
                style={{
                  background:
                    "#fafafa",

                  border:
                    "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  className="
                    text-lg
                    sm:text-2xl
                    font-black
                  "
                  style={{
                    color:
                      "#FF6B00",
                  }}
                >
                  {item.value}
                </h3>

                <p
                  className="
                    text-[11px]
                    sm:text-sm
                    mt-1
                  "
                  style={{
                    color:
                      "#6b7280",
                    lineHeight:
                      1.4,
                  }}
                >
                  {item.title}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default PTC_header;