import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

function Shortlinks_grid() {
  const [
    shortlinks,
    setShortlinks,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    favorites,
    setFavorites,
  ] = useState([]);

  /* =========================================
     FETCH SHORTLINKS
  ========================================= */

  useEffect(() => {
    fetchShortlinks();
  }, []);

  const fetchShortlinks =
    async () => {
      try {
        setLoading(true);

        const response =
          await axios.get(
            "https://revadoobackend.onrender.com/api/admin/shortlinks/all"
          );

        if (
          response.data.success
        ) {
          setShortlinks(
            response.data
              .shortlinks || []
          );
        }
      } catch (error) {
        console.error(
          "FETCH SHORTLINKS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

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
     SORT FAVORITES FIRST
  ========================================= */

  const sortedLinks =
    useMemo(() => {
      return [
        ...shortlinks.filter(
          (link) =>
            favorites.includes(
              link._id
            )
        ),

        ...shortlinks.filter(
          (link) =>
            !favorites.includes(
              link._id
            )
        ),
      ];
    }, [
      shortlinks,
      favorites,
    ]);

  return (
    <div
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
          Complete trusted premium
          shortlinks daily to earn
          instant Revadoo creds,
          bonus EXP rewards, and
          higher streak bonuses.
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
          Tap the ⭐ favorite
          button to pin important
          earning links at the
          top for faster access.
        </p>
      </div>

      {/* LOADING */}

      {loading ? (
        <div
          className="
            w-full
            rounded-[28px]
            p-10
            text-center
            text-sm
            font-semibold
          "
          style={{
            background:
              "#ffffff",

            border:
              "1px solid rgba(0,0,0,0.06)",

            color: "#6b7280",
          }}
        >
          Loading shortlinks...
        </div>
      ) : sortedLinks.length ===
        0 ? (
        /* EMPTY */

        <div
          className="
            w-full
            rounded-[28px]
            p-10
            flex
            flex-col
            items-center
            justify-center
            text-center
          "
          style={{
            background:
              "#ffffff",

            border:
              "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="
              w-16
              h-16
              rounded-3xl
              flex
              items-center
              justify-center
              text-3xl
            "
            style={{
              background:
                "rgba(255,107,0,0.10)",
            }}
          >
            🔗
          </div>

          <h2
            className="
              text-lg
              sm:text-2xl
              font-black
              mt-5
            "
            style={{
              color: "#030712",
            }}
          >
            No Shortlinks Available
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              mt-2
              max-w-md
              leading-relaxed
            "
            style={{
              color: "#6b7280",
            }}
          >
            Shortlinks added from
            the admin CMS panel
            will appear here
            automatically.
          </p>
        </div>
      ) : (
        /* GRID */

        <div
          className="
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-3
            sm:gap-5
          "
        >
          {sortedLinks.map(
            (link, index) => {
              const isFavorite =
                favorites.includes(
                  link._id
                );

              return (
                <div
                  key={
                    link._id ||
                    index
                  }
                  className="
                    relative
                    overflow-hidden
                    rounded-[22px]
                    sm:rounded-[28px]
                    p-3
                    sm:p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
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
                    {/* ICON */}

                    <div
                      className="
                        w-10
                        h-10
                        sm:w-12
                        sm:h-12
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-lg
                        sm:text-xl
                        font-black
                      "
                      style={{
                        background:
                          "rgba(255,107,0,0.10)",

                        color:
                          "#FF6B00",
                      }}
                    >
                      🔗
                    </div>

                    {/* FAVORITE */}

                    <button
                      onClick={() =>
                        toggleFavorite(
                          link._id
                        )
                      }
                      className="
                        w-8
                        h-8
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
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

                  <div className="mt-4 sm:mt-5">
                    <h2
                      className="
                        text-sm
                        sm:text-lg
                        font-black
                        leading-snug
                        line-clamp-2
                      "
                      style={{
                        color:
                          "#030712",
                      }}
                    >
                      {link.title ||
                        "Untitled Link"}
                    </h2>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mt-2
                        flex-wrap
                      "
                    >
                      {/* REWARD */}

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
                        {link.reward ||
                          0}{" "}
                        Creds
                      </div>

                      {/* TIMER */}

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
                        {link.timer ||
                          0}{" "}
                        Sec
                      </div>
                    </div>
                  </div>

                  {/* STATS */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[10px]
                          sm:text-xs
                        "
                        style={{
                          color:
                            "#6b7280",
                        }}
                      >
                        Total Visits
                      </p>

                      <h3
                        className="
                          text-sm
                          sm:text-base
                          font-black
                          mt-1
                        "
                        style={{
                          color:
                            "#030712",
                        }}
                      >
                        {link.totalVisits ||
                          0}
                      </h3>
                    </div>

                    {/* BUTTON */}

                   <button
  onClick={async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.post(
          `https://revadoobackend.onrender.com/api/shortlinks/start/${link._id}`,

          {},

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (
        response.data.success
      ) {
        window.location.href =
          response.data.shortlink;
      } else {
        alert(
          response.data
            .message ||
            "Failed to open shortlink"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to start shortlink"
      );
    }
  }}
  className="
    h-9
    sm:h-10
    px-3
    sm:px-4
    rounded-xl
    text-[10px]
    sm:text-sm
    font-bold
    transition-all
    duration-300
    hover:scale-[1.03]
    active:scale-[0.97]
  "
  style={{
    background:
      "#FF6B00",

    color:
      "#ffffff",

    boxShadow:
      "0 8px 20px rgba(255,107,0,0.25)",
  }}
>
  Visit
</button>
                  </div>

                  {/* BADGE */}

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
                        tracking-wider
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
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default Shortlinks_grid;