const DashboardGames = () => {
  return (
    <div
      className="
        w-full
        min-h-screen
        p-4
        md:p-6
      "
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* MAIN CARD */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          p-6
          sm:p-8
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
        {/* ORANGE GLOW */}

        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]
            w-[260px]
            h-[260px]
            rounded-full
            blur-3xl
            opacity-10
          "
          style={{
            background:
              "#FF6B00",
          }}
        />

        {/* TOP CONTENT */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-8
          "
        >
          {/* BADGE */}

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
                style={{
                  fontSize:
                    "20px",
                }}
              >
                🎮
              </span>
            </div>

            <div>
              <p
                className="
                  text-xs
                  uppercase
                  font-bold
                  tracking-wider
                "
                style={{
                  color:
                    "#FF6B00",
                }}
              >
                Revadoo Games
              </p>

              <p
                className="
                  text-sm
                  font-medium
                  mt-0.5
                "
                style={{
                  color:
                    "#6b7280",
                }}
              >
                Gaming rewards
                platform coming
                soon
              </p>
            </div>
          </div>

          {/* TITLE */}

          <div className="space-y-3">
            <h1
              className="
                text-3xl
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
              Play Games &
              Earn
            </h1>

            <h1
              className="
                text-3xl
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
              Real Rewards
            </h1>
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-4 max-w-4xl">
            <p
              className="
                text-sm
                sm:text-base
                font-semibold
              "
              style={{
                color:
                  "#030712",
              }}
            >
              Interactive gaming
              experiences are
              launching soon on
              Revadoo.
            </p>

            <p
              className="
                text-sm
                sm:text-base
                leading-relaxed
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Revadoo Games is an
              upcoming online
              earning platform
              where users can play
              arcade games,
              prediction games,
              tap challenges,
              leaderboard events,
              lucky spins, and
              reward-based missions
              to earn free creds,
              EXP bonuses, streak
              rewards, and daily
              achievements.
            </p>

            <p
              className="
                text-sm
                sm:text-base
                leading-relaxed
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Our platform is being
              optimized for fast
              gameplay, smooth
              mobile performance,
              secure reward
              systems, and engaging
              community features
              designed for the next
              generation of online
              rewards and gaming
              users.
            </p>
          </div>

          {/* STATS */}

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
              pt-4
            "
          >
            {[
              {
                title:
                  "Mini Games",
                value: "25+",
              },

              {
                title:
                  "Daily Missions",
                value: "100+",
              },

              {
                title:
                  "Reward Types",
                value: "Unlimited",
              },

              {
                title:
                  "Launch",
                value: "Soon",
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
                    p-4
                  "
                  style={{
                    background:
                      "rgba(255,107,0,0.04)",

                    border:
                      "1px solid rgba(255,107,0,0.08)",
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
                    {
                      item.value
                    }
                  </h3>

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      mt-2
                    "
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    {
                      item.title
                    }
                  </p>
                </div>
              )
            )}
          </div>

          {/* BUTTON */}

          <div className="pt-4">
            <button
              className="
                px-7
                py-3
                rounded-2xl
                text-sm
                sm:text-base
                font-bold
                transition-all
                duration-300
                hover:scale-[1.02]
              "
              style={{
                background:
                  "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                color:
                  "#ffffff",

                boxShadow:
                  "0 10px 25px rgba(255,107,0,0.25)",
              }}
            >
              🚀 Launching Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGames;