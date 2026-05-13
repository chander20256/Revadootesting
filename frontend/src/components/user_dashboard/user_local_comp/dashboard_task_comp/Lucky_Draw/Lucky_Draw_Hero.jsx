import React from "react";

function Lucky_Draw_Hero() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-gray-100
        bg-white
        p-6
        sm:p-8
        lg:p-10
        font-['DM_Sans',sans-serif]
      "
    >
      {/* CONTENT */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          items-start
          lg:items-center
          justify-between
          gap-10
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
              px-4
              py-2
              rounded-full
              bg-orange-100
              text-orange-500
              text-xs
              font-black
              uppercase
              tracking-wider
              mb-5
            "
          >
            🎟️ Revadoo Lucky Draw
          </div>

          {/* TITLE */}

          <div className="space-y-3">
            <h1
              className="
                text-3xl
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
                text-3xl
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

          <div className="mt-5 space-y-4">
            <p
              className="
                text-sm
                sm:text-base
                leading-relaxed
                text-gray-600
                max-w-2xl
                font-medium
              "
            >
              Participate in Revadoo lucky draw events using your earned
              creds and unlock chances to win free gift cards, shopping
              vouchers, subscriptions, gaming rewards, digital products,
              and exclusive premium giveaways.
            </p>

            <p
              className="
                text-sm
                sm:text-base
                leading-relaxed
                text-gray-500
                max-w-2xl
              "
            >
              Every completed task on Revadoo helps you collect more
              creds and increase your chances of winning exciting
              rewards through secure and community-powered lucky draw
              systems.
            </p>
          </div>

          {/* FEATURES */}

          <div
            className="
              flex
              flex-wrap
              gap-3
              mt-6
            "
          >
            {[
              "🎁 Gift Cards",
              "🛍️ Shopping Vouchers",
              "🎮 Gaming Rewards",
              "📺 Subscriptions",
            ].map((item, index) => (
              <div
                key={index}
                className="
                  px-4
                  py-2.5
                  rounded-2xl
                  border
                  border-orange-100
                  bg-orange-50
                  text-sm
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
            lg:max-w-[360px]
            grid
            grid-cols-2
            gap-4
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
                rounded-3xl
                border
                border-gray-100
                bg-gray-50
                px-5
                py-5
              "
            >
              <h3 className="text-xl sm:text-2xl font-black text-orange-500">
                {item.value}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-semibold leading-relaxed">
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