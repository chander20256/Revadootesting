import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import PTC_Card from "./PTC_Card";

function PTC_grid() {
  const [
    favorites,
    setFavorites,
  ] = useState([]);

  const [
    activeType,
    setActiveType,
  ] = useState("all");

  const [ptcAds, setPtcAds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH ADS
  ========================================= */

  const fetchAds =
    async () => {
      try {
        const response =
          await axios.get(
            "https://revadoobackend.onrender.com/api/admin/ptc-ads/all"
          );

        if (
          response.data.success
        ) {
          setPtcAds(
            response.data
              .data || []
          );
        }
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAds();
  }, []);

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
                ad.adType ===
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
      ptcAds,
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
            ad.adType ===
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
            ad.adType ===
            "iframe"
        ).length,

      color:
        "rgba(34,197,94,0.10)",

      text: "#16a34a",
    },

    {
      key: "external",

      title:
        "External",

      value:
        ptcAds.filter(
          (ad) =>
            ad.adType ===
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
            ad.adType ===
            "youtube"
        ).length,

      color:
        "rgba(249,115,22,0.10)",

      text: "#f97316",
    },
  ];

  return (
    <section>
      {/* FILTERS */}

      <div
        className="
          grid
          grid-cols-2
          sm:flex
          sm:flex-wrap
          gap-2
          mb-5
        "
      >
        {categories.map(
          (
            item,
            index
          ) => (
            <button
              key={index}
              onClick={() =>
                setActiveType(
                  item.key
                )
              }
              className="
                h-10
                px-3
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                transition-all
                duration-300
                w-full
                sm:w-auto
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
                  px-2
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[10px]
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

      {/* LOADING */}

      {loading ? (
        <div
          className="
            py-20
            text-center
            font-bold
            text-gray-500
          "
        >
          Loading PTC Ads...
        </div>
      ) : filteredAds.length ===
        0 ? (
        <div
          className="
            py-20
            text-center
          "
        >
          <h2
            className="
              text-lg
              font-bold
            "
            style={{
              color:
                "#111827",
            }}
          >
            No PTC Ads Found
          </h2>

          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color:
                "#9ca3af",
            }}
          >
            No campaigns available
            right now.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-2
            sm:gap-5
          "
        >
          {filteredAds.map(
            (ad) => (
              <PTC_Card
                key={ad._id}
                ad={ad}
                isFavorite={favorites.includes(
                  ad._id
                )}
                toggleFavorite={
                  toggleFavorite
                }
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default PTC_grid;