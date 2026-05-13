import React from "react";

function Lucky_Draw_Hero() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[26px]
        sm:rounded-[32px]
        border
        border-gray-100
        bg-white
        p-4
        sm:p-6
        lg:p-8
        font-['DM_Sans',sans-serif]
      "
    >
      {/* CONTENT */}

      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div className="max-w-3xl">
          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              sm:px-4
              sm:py-2
              rounded-full
              bg-orange-100
              text-orange-500
              text-[10px]
              sm:text-xs
              font-black
              uppercase
              tracking-wider
              mb-4
            "
          >
            🎟️ Revadoo Lucky Draw
          </div>

          {/* TITLE */}

          <div className="space-y-1 sm:space-y-2">
            <h1
              className="
                text-2xl
                sm:text-4xl
                lg:text-5xl
                font-black
                tracking-tight
                leading-tight
                text-black
              "
            >
              Join Lucky Draws &
            </h1>

            <h1
              className="
                text-2xl
                sm:text-4xl
                lg:text-5xl
                font-black
                tracking-tight
                leading-tight
                text-orange-500
              "
            >
              Win Premium Rewards
            </h1>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-4 sm:mt-5 space-y-3">
            <p
              className="
                text-xs
                sm:text-base
                leading-relaxed
                text-gray-600
                max-w-2xl
                font-medium
              "
            >
              Participate in Revadoo lucky draw events using your earned
              creds and unlock chances to win free gift cards,
              subscriptions, gaming rewards, and premium giveaways.
            </p>

            <p
              className="
                hidden
                sm:block
                text-sm
                sm:text-base
                leading-relaxed
                text-gray-500
                max-w-2xl
              "
            >
              Every completed task on Revadoo helps you collect more
              creds and increase your chances of winning exciting
              rewards through secure lucky draw systems.
            </p>
          </div>

          {/* FEATURES */}

          <div
            className="
              flex
              flex-wrap
              gap-2
              sm:gap-3
              mt-5
            "
          >
            {[
              "🎁 Gift Cards",
              "🛍️ Vouchers",
              "🎮 Gaming",
              "📺 Premium",
            ].map((item, index) => (
              <div
                key={index}
                className="
                  px-3
                  py-2
                  sm:px-4
                  sm:py-2.5
                  rounded-2xl
                  border
                  border-orange-100
                  bg-orange-50
                  text-[11px]
                  sm:text-sm
                  font-bold
                  text-black
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            w-full
            lg:max-w-[320px]
            grid
            grid-cols-2
            gap-3
            sm:gap-4
          "
        >
          {[
            {
              value: "Free",
              label: "Gift Cards",
            },

            {
              value: "Instant",
              label: "Reward Claims",
            },

            {
              value: "Secure",
              label: "Winner Selection",
            },

            {
              value: "Premium",
              label: "Lucky Draws",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-100
                bg-gray-50
                px-3
                py-4
                sm:px-5
                sm:py-5
              "
            >
              <h3 className="text-lg sm:text-2xl font-black text-orange-500">
                {item.value}
              </h3>

              <p className="text-[10px] sm:text-sm text-gray-500 mt-1 sm:mt-2 font-semibold leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lucky_Draw_Hero;