import React, {
  useMemo,
  useState,
} from "react";

function PTC_grid() {
  const [
    favorites,
    setFavorites,
  ] = useState([]);

  const [
    activeType,
    setActiveType,
  ] = useState("all");

  /* =========================================
     DEMO PTC ADS
  ========================================= */

  const ptcAds = [
    {
      _id: "1",

      title:
        "Premium Sponsor Campaign",

      provider:
        "monetag",

      reward: 25,

      timer: 15,

      type: "window",

      completedToday: false,
    },

    {
      _id: "2",

      title:
        "Crypto Wallet Promotion",

      provider:
        "adsterra",

      reward: 40,

      timer: 20,

      type: "external",

      completedToday: true,
    },

    {
      _id: "3",

      title:
        "Gaming Rewards Campaign",

      provider:
        "propellerads",

      reward: 18,

      timer: 10,

      type: "iframe",

      completedToday: false,
    },

    {
      _id: "4",

      title:
        "Mobile App Install Offer",

      provider:
        "monetag",

      reward: 55,

      timer: 30,

      type: "youtube",

      completedToday: false,
    },
  ];

  /* =========================================
     FAVORITES
  ========================================= */

  const toggleFavorite = (
    id
  ) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) =>
              item !== id
          )
        : [...prev, id]
    );
  };

  /* =========================================
     FILTERED ADS
  ========================================= */

  const filteredAds =
    useMemo(() => {
      const filtered =
        activeType ===
        "all"
          ? ptcAds
          : ptcAds.filter(
              (ad) =>
                ad.type ===
                activeType
            );

      return [
        ...filtered.filter(
          (ad) =>
            favorites.includes(
              ad._id
            )
        ),

        ...filtered.filter(
          (ad) =>
            !favorites.includes(
              ad._id
            )
        ),
      ];
    }, [
      activeType,
      favorites,
    ]);

  /* =========================================
     CATEGORY STATS
  ========================================= */

  const categories = [
    {
      key: "all",

      title: "All",

      value: ptcAds.length,

      color:
        "rgba(107,114,128,0.10)",

      text: "#4b5563",
    },

    {
      key: "window",

      title: "Window",

      value:
        ptcAds.filter(
          (ad) =>
            ad.type ===
            "window"
        ).length,

      color:
        "rgba(59,130,246,0.10)",

      text: "#2563eb",
    },

    {
      key: "iframe",

      title: "Iframe",

      value:
        ptcAds.filter(
          (ad) =>
            ad.type ===
            "iframe"
        ).length,

      color:
        "rgba(34,197,94,0.10)",

      text: "#16a34a",
    },

    {
      key: "external",

      title: "External",

      value:
        ptcAds.filter(
          (ad) =>
            ad.type ===
            "external"
        ).length,

      color:
        "rgba(168,85,247,0.10)",

      text: "#9333ea",
    },

    {
      key: "youtube",

      title: "Youtube",

      value:
        ptcAds.filter(
          (ad) =>
            ad.type ===
            "youtube"
        ).length,

      color:
        "rgba(249,115,22,0.10)",

      text: "#f97316",
    },
  ];

  return (
    <section
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* SEO TEXT */}

      <div className="mb-5">
        <p
          className="
            text-xs
            sm:text-sm
            font-medium
            leading-relaxed
            mb-2
          "
          style={{
            color: "#6b7280",
          }}
        >
          Complete premium
          paid-to-click ads daily
          to earn instant Revadoo
          creds, EXP bonuses,
          streak rewards, and
          trusted sponsor rewards.
          Every PTC ad resets
          automatically after
          24 hours for daily
          earning opportunities.
        </p>

        <p
          className="
            text-[11px]
            sm:text-xs
            leading-relaxed
          "
          style={{
            color: "#9ca3af",
          }}
        >
          Watch sponsor ads,
          complete external
          campaigns, and unlock
          high-paying PTC rewards
          through trusted ad
          networks on Revadoo.
          Complete tasks once per
          reset cycle to claim
          rewards again after the
          cooldown refreshes.
        </p>
      </div>

      {/* FILTERS */}

      <div
        className="
          flex
          items-center
          gap-2
          sm:gap-3
          flex-wrap
          mb-5
        "
      >
        {categories.map(
          (item, index) => (
            <button
              key={index}
              onClick={() =>
                setActiveType(
                  item.key
                )
              }
              className="
                h-10
                sm:h-11
                px-3
                sm:px-5
                rounded-xl
                flex
                items-center
                gap-2
                sm:gap-3
                transition-all
                duration-300
              "
              style={{
                background:
                  activeType ===
                  item.key
                    ? item.color
                    : "#f9fafb",

                border:
                  activeType ===
                  item.key
                    ? `1px solid ${item.text}20`
                    : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="
                  min-w-[24px]
                  h-6
                  sm:min-w-[28px]
                  sm:h-7
                  px-2
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  sm:text-[11px]
                  font-black
                "
                style={{
                  background:
                    item.color,

                  color:
                    item.text,
                }}
              >
                {item.value}
              </div>

              <span
                className="
                  text-xs
                  sm:text-sm
                  font-bold
                "
                style={{
                  color:
                    "#4b5563",
                }}
              >
                {item.title}
              </span>
            </button>
          )
        )}
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-3
          sm:gap-5
        "
      >
        {filteredAds.map(
          (ad, index) => {
            const isFavorite =
              favorites.includes(
                ad._id
              );

            return (
              <article
                key={
                  ad._id || index
                }
                className="
                  relative
                  overflow-hidden
                  rounded-[20px]
                  sm:rounded-[28px]
                  p-3
                  sm:p-5
                  transition-all
                  duration-300
                "
                style={{
                  background:
                    "#ffffff",

                  border:
                    isFavorite
                      ? "1px solid rgba(255,107,0,0.25)"
                      : "1px solid rgba(0,0,0,0.06)",

                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.04)",
                }}
              >
                {/* TOP */}

                <div className="flex items-start justify-between gap-2">
                  {/* PROVIDER */}

                  <div
                    className="
                      min-w-[42px]
                      h-10
                      sm:min-w-[48px]
                      sm:h-12
                      px-2
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-[10px]
                      sm:text-xs
                      font-black
                      uppercase
                    "
                    style={{
                      background:
                        ad.provider ===
                        "monetag"
                          ? "rgba(249,115,22,0.12)"
                          : ad.provider ===
                            "adsterra"
                          ? "rgba(59,130,246,0.12)"
                          : "rgba(168,85,247,0.12)",

                      color:
                        ad.provider ===
                        "monetag"
                          ? "#f97316"
                          : ad.provider ===
                            "adsterra"
                          ? "#2563eb"
                          : "#9333ea",
                    }}
                  >
                    {ad.provider ===
                    "monetag"
                      ? "MT"
                      : ad.provider ===
                        "adsterra"
                      ? "AD"
                      : "PP"}
                  </div>

                  {/* FAVORITE */}

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
                        isFavorite
                          ? "rgba(255,107,0,0.12)"
                          : "rgba(0,0,0,0.04)",
                    }}
                  >
                    <span className="text-sm">
                      {isFavorite
                        ? "⭐"
                        : "☆"}
                    </span>
                  </button>
                </div>

                {/* CONTENT */}

                <div className="mt-4">
                  <h2
                    className="
                      text-sm
                      sm:text-lg
                      font-black
                      leading-snug
                      break-words
                    "
                    style={{
                      color:
                        "#030712",
                    }}
                  >
                    {ad.title}
                  </h2>

                  {/* TYPE */}

                  <div
                    className="
                      mt-2
                      inline-flex
                      items-center
                      gap-2
                      px-2
                      py-1
                      rounded-full
                      text-[10px]
                      sm:text-xs
                      font-bold
                    "
                    style={{
                      background:
                        ad.type ===
                        "window"
                          ? "rgba(59,130,246,0.10)"
                          : ad.type ===
                            "iframe"
                          ? "rgba(34,197,94,0.10)"
                          : ad.type ===
                            "external"
                          ? "rgba(168,85,247,0.10)"
                          : "rgba(249,115,22,0.10)",

                      color:
                        ad.type ===
                        "window"
                          ? "#2563eb"
                          : ad.type ===
                            "iframe"
                          ? "#16a34a"
                          : ad.type ===
                            "external"
                          ? "#9333ea"
                          : "#f97316",
                    }}
                  >
                    {ad.type}
                  </div>

                  {/* REWARD */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-3
                      flex-wrap
                    "
                  >
                    <div
                      className="
                        px-2
                        py-1
                        rounded-full
                        text-[10px]
                        sm:text-xs
                        font-bold
                      "
                      style={{
                        background:
                          "rgba(255,107,0,0.10)",

                        color:
                          "#FF6B00",
                      }}
                    >
                      {ad.reward} Creds
                    </div>

                    <div
                      className="
                        px-2
                        py-1
                        rounded-full
                        text-[10px]
                        sm:text-xs
                        font-bold
                      "
                      style={{
                        background:
                          "rgba(0,0,0,0.05)",

                        color:
                          "#6b7280",
                      }}
                    >
                      {ad.timer} Sec
                    </div>
                  </div>
                </div>

                {/* BOTTOM */}

                <div
                  className="
                    mt-5
                    flex
                    items-end
                    justify-between
                    gap-3
                  "
                >
                  {/* STATUS */}

                  <div className="flex flex-col gap-1">
                    <div
                      className="
                        px-3
                        py-2
                        rounded-xl
                        text-[10px]
                        sm:text-xs
                        font-bold
                        leading-relaxed
                        w-fit
                      "
                      style={{
                        background:
                          ad.completedToday
                            ? "rgba(239,68,68,0.10)"
                            : "rgba(34,197,94,0.10)",

                        color:
                          ad.completedToday
                            ? "#dc2626"
                            : "#16a34a",
                      }}
                    >
                      {ad.completedToday
                        ? "Completed"
                        : "Available"}
                    </div>

                    <p
                      className="
                        text-[9px]
                        sm:text-[10px]
                        font-medium
                        pl-1
                      "
                      style={{
                        color:
                          "#9ca3af",
                      }}
                    >
                      Resets in 24h
                    </p>
                  </div>

                  {/* BUTTON */}

                  <button
                    disabled={
                      ad.completedToday
                    }
                    className="
                      h-10
                      min-w-[92px]
                      px-4
                      rounded-xl
                      text-[11px]
                      sm:text-sm
                      font-bold
                      transition-all
                      duration-300
                    "
                    style={{
                      background:
                        ad.completedToday
                          ? "#ef4444"
                          : "#22c55e",

                      color:
                        "#ffffff",

                      cursor:
                        ad.completedToday
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        ad.completedToday
                          ? 0.9
                          : 1,

                      boxShadow:
                        ad.completedToday
                          ? "0 8px 20px rgba(239,68,68,0.20)"
                          : "0 8px 20px rgba(34,197,94,0.20)",
                    }}
                  >
                    {ad.completedToday
                      ? "Completed"
                      : "Start"}
                  </button>
                </div>

                {/* FAVORITE BADGE */}

                {isFavorite && (
                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      px-3
                      py-1
                      rounded-bl-2xl
                      text-[9px]
                      sm:text-[10px]
                      font-black
                      uppercase
                    "
                    style={{
                      background:
                        "#FF6B00",

                      color:
                        "#ffffff",
                    }}
                  >
                    Favorite
                  </div>
                )}
              </article>
            );
          }
        )}
      </div>
    </section>
  );
}

export default PTC_grid;