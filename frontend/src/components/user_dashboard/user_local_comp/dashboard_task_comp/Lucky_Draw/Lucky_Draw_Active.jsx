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

    /* SMOOTH MOVE */

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

    /* MOVE LAST TO FRONT */

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

        {/* BUTTONS */}

        <div className="flex items-center gap-3">
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

      {/* MOBILE HINT */}

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          font-bold
          text-orange-500
          mb-4
          lg:hidden
        "
      >
        <span className="text-base">
          👉
        </span>

        Swipe to explore more lucky draws
      </div>

      {/* WRAPPER */}

      <div className="overflow-hidden">
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
                  p-5
                  transition-all
                  duration-300
                  hover:border-orange-200
                  hover:bg-orange-50/40
                  shrink-0
                  w-[85%]
                  sm:w-[48%]
                  lg:w-[32%]
                  min-w-[260px]
                "
              >
                {/* ICON */}

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-5
                  "
                >
                  {item.icon}
                </div>

                {/* CONTENT */}

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-black text-black">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 font-medium">
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
                      px-4
                      py-3
                    "
                  >
                    <div>
                      <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">
                        Entry Cost
                      </p>

                      <h4 className="text-sm font-black text-orange-500 mt-1">
                        {item.tickets}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">
                        Participants
                      </p>

                      <h4 className="text-sm font-black text-black mt-1">
                        {item.users}
                      </h4>
                    </div>
                  </div>

                  {/* BUTTON */}

                  <button
                    className="
                      w-full
                      mt-2
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      text-sm
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