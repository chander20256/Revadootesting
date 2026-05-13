import React, {
  useRef,
  useState,
} from "react";

function Lucky_Draw_Active() {
  const scrollRef =
    useRef(null);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const draws = [
    {
      title:
        "Amazon Gift Card",

      reward:
        "₹500 Voucher",

      tickets:
        "500 Creds",

      users:
        "248 Entries",

      icon: "🛒",
    },

    {
      title:
        "Netflix Premium",

      reward:
        "3 Months Access",

      tickets:
        "350 Creds",

      users:
        "184 Entries",

      icon: "📺",
    },

    {
      title:
        "Google Play",

      reward:
        "₹250 Redeem Code",

      tickets:
        "250 Creds",

      users:
        "392 Entries",

      icon: "🎮",
    },

    {
      title:
        "Steam Wallet",

      reward:
        "₹500 Gaming Card",

      tickets:
        "450 Creds",

      users:
        "127 Entries",

      icon: "🔥",
    },

    {
      title:
        "Flipkart Voucher",

      reward:
        "₹300 Shopping Card",

      tickets:
        "300 Creds",

      users:
        "219 Entries",

      icon: "🛍️",
    },
  ];

  /* -----------------------------
     NEXT
  ----------------------------- */

  const handleNext = () => {
    if (
      !scrollRef.current ||
      isAnimating
    )
      return;

    setIsAnimating(true);

    const container =
      scrollRef.current;

    const firstCard =
      container.children[0];

    const cardWidth =
      firstCard.offsetWidth +
      20;

    container.style.transition =
      "transform 0.45s ease";

    container.style.transform =
      `translateX(-${cardWidth}px)`;

    setTimeout(() => {
      container.style.transition =
        "none";

      container.appendChild(
        firstCard
      );

      container.style.transform =
        "translateX(0px)";

      requestAnimationFrame(() => {
        setIsAnimating(
          false
        );
      });
    }, 450);
  };

  /* -----------------------------
     PREV
  ----------------------------- */

  const handlePrev = () => {
    if (
      !scrollRef.current ||
      isAnimating
    )
      return;

    setIsAnimating(true);

    const container =
      scrollRef.current;

    const lastCard =
      container.lastElementChild;

    const firstCard =
      container.children[0];

    const cardWidth =
      firstCard.offsetWidth +
      20;

    container.insertBefore(
      lastCard,
      firstCard
    );

    container.style.transition =
      "none";

    container.style.transform =
      `translateX(-${cardWidth}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.style.transition =
          "transform 0.45s ease";

        container.style.transform =
          "translateX(0px)";
      });
    });

    setTimeout(() => {
      setIsAnimating(
        false
      );
    }, 450);
  };

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-[32px]
        p-6
        sm:p-8
        font-['DM_Sans',sans-serif]
        overflow-hidden
      "
    >
      {/* TOP */}

      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
            Active Lucky Draws
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Participate & Win
          </h2>
        </div>

        {/* DESKTOP BUTTONS */}

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={
              handlePrev
            }
            disabled={
              isAnimating
            }
            className="
              w-11
              h-11
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              hover:bg-orange-50
              hover:border-orange-200
              text-lg
              transition-all
              duration-200
              disabled:opacity-50
            "
          >
            ←
          </button>

          <button
            onClick={
              handleNext
            }
            disabled={
              isAnimating
            }
            className="
              w-11
              h-11
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              hover:bg-orange-50
              hover:border-orange-200
              text-lg
              transition-all
              duration-200
              disabled:opacity-50
            "
          >
            →
          </button>
        </div>
      </div>


      {/* WRAPPER */}

      <div
        className="
          overflow-hidden
          lg:overflow-hidden
          overflow-x-auto
        "
        style={{
          scrollbarWidth:
            "none",

          msOverflowStyle:
            "none",
        }}
      >
        {/* CARDS */}

        <div
          ref={scrollRef}
          className="
            flex
            gap-5
            will-change-transform
          "
        >
          {draws.map(
            (item, index) => (
              <div
                key={index}
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-gray-100
                  bg-gray-50
                  p-4
                  sm:p-5
                  transition-all
                  duration-300
                  hover:border-orange-200
                  hover:bg-orange-50/40
                  shrink-0

                  /* MOBILE */
                  w-[78%]
                  min-w-[220px]

                  /* TABLET */
                  sm:w-[48%]

                  /* DESKTOP */
                  lg:w-[32%]

                  /* HEIGHT */
                  min-h-[260px]
                  sm:min-h-[300px]
                "
              >
                {/* ICON */}

                <div
                  className="
                    w-12
                    h-12
                    sm:w-14
                    sm:h-14
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                    text-2xl
                    sm:text-3xl
                    mb-4
                  "
                >
                  {item.icon}
                </div>

                {/* CONTENT */}

                <div className="space-y-3 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-black">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                      {item.reward}
                    </p>
                  </div>

                  {/* INFO */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      bg-white
                      border
                      border-gray-100
                      px-3
                      sm:px-4
                      py-3
                    "
                  >
                    <div>
                      <p className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-gray-400">
                        Entry Cost
                      </p>

                      <h4 className="text-xs sm:text-sm font-black text-orange-500 mt-1">
                        {item.tickets}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-gray-400">
                        Participants
                      </p>

                      <h4 className="text-xs sm:text-sm font-black text-black mt-1">
                        {item.users}
                      </h4>
                    </div>
                  </div>

                  {/* BUTTON */}

                  <button
                    className="
                      w-full
                      mt-1
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      text-xs
                      sm:text-sm
                      font-black
                      py-3
                      rounded-2xl
                      transition-all
                      duration-200
                    "
                  >
                    Join Lucky Draw
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Lucky_Draw_Active;