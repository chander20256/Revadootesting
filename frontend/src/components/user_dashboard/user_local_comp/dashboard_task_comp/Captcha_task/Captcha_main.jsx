import React, {
  useEffect,
  useState,
} from "react";

import Captcha_Hero from "./Captcha_Hero";

import Captcha_claim from "./Captcha_claim";

import Captcha_History from "./Captcha_History";

import DashboardGlobalads from "../../../user_global_comp/DashboardGlobalads";

function Captcha_main() {
  /* -----------------------------
     HISTORY STATE
  ----------------------------- */

  const [history, setHistory] =
    useState([]);

  /* -----------------------------
     FETCH HISTORY
  ----------------------------- */

  useEffect(() => {
    const fetchHistory =
      async () => {
        try {
          const userId =
            localStorage.getItem(
              "userId"
            );

          if (!userId) return;

          const response =
            await fetch(
              `https://revadoobackend.onrender.com/api/hcaptcha/history/${userId}`
            );

          const data =
            await response.json();

          if (
            data.success
          ) {
            setHistory(
              data.history
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

    fetchHistory();
  }, []);

  return (
    <div
      className="
        min-h-screen
        w-full
        space-y-5
      "
      style={{
        fontFamily:
          "'DM Sans', sans-serif",

        background:
          "#f8fafc",
      }}
    >
      {/* TOP 2x2 HORIZONTAL BANNERS */}

      <div
        className="
          grid
          grid-cols-1
          gap-2
          sm:gap-4
          xl:grid-cols-2
        "
      >
        {[1, 2].map(
          (item) => (
            <div
              key={item}
              className="
                overflow-hidden
                rounded-[18px]
                bg-white
                p-1
                sm:rounded-[24px]
                sm:p-2
              "
              style={{
                border:
                  "1px solid rgba(0,0,0,0.06)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <DashboardGlobalads
                adId="332686"
                className="
                  min-h-[55px]
                  w-full
                  sm:min-h-[90px]
                "
              />
            </div>
          )
        )}
      </div>

      {/* HERO */}

      <Captcha_Hero />

      {/* BOTTOM 2x2 HORIZONTAL BANNERS */}

      <div
        className="
          grid
          grid-cols-1
          gap-2
          sm:gap-4
          xl:grid-cols-2
        "
      >
        {[1, 2].map(
          (item) => (
            <div
              key={item}
              className="
                overflow-hidden
                rounded-[18px]
                bg-white
                p-1
                sm:rounded-[24px]
                sm:p-2
              "
              style={{
                border:
                  "1px solid rgba(0,0,0,0.06)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <DashboardGlobalads
                adId="332686"
                className="
                  min-h-[55px]
                  w-full
                  sm:min-h-[90px]
                "
              />
            </div>
          )
        )}
      </div>

      {/* MOBILE SOCIAL BAR */}

      <div className="xl:hidden">
        <DashboardGlobalads
          adId="687639"
        />
      </div>

      {/* CLAIM SECTION */}

      <div
        className="
          grid
          grid-cols-1
          items-start
          gap-5
          xl:grid-cols-[260px_1fr_260px]
        "
      >
        {/* LEFT SIDEBAR ADS */}

        <div
          className="
            hidden
            flex-col
            gap-4
            xl:flex
          "
        >
          {[1, 2].map(
            (item) => (
              <div
                key={item}
                className="
                  overflow-hidden
                  rounded-[24px]
                  bg-white
                  p-2
                "
                style={{
                  border:
                    "1px solid rgba(0,0,0,0.06)",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.04)",
                }}
              >
                <DashboardGlobalads
                  adId="161753"
                  className="
                    min-h-[250px]
                    w-full
                  "
                />
              </div>
            )
          )}
        </div>

        {/* CENTER CLAIM */}

        <div>
          <Captcha_claim />
        </div>

        {/* RIGHT SIDEBAR ADS */}

        <div
          className="
            hidden
            flex-col
            gap-4
            xl:flex
          "
        >
          {[1, 2].map(
            (item) => (
              <div
                key={item}
                className="
                  overflow-hidden
                  rounded-[24px]
                  bg-white
                  p-2
                "
                style={{
                  border:
                    "1px solid rgba(0,0,0,0.06)",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.04)",
                }}
              >
                <DashboardGlobalads
                  adId="161753"
                  className="
                    min-h-[250px]
                    w-full
                  "
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* FULL WIDTH NATIVE ADS */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          bg-white
          p-3
        "
        style={{
          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <DashboardGlobalads
          adId="518210"
          className="
            min-h-[250px]
            w-full
          "
        />
      </div>

      {/* FULL WIDTH HISTORY */}

      <div className="w-full">
        <Captcha_History
          history={history}
        />
      </div>

      {/* BOTTOM ADS SECTION */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-3
        "
      >
        {/* LEFT */}

        <div
          className="
            overflow-hidden
            rounded-[24px]
            bg-white
            p-3
          "
          style={{
            border:
              "1px solid rgba(0,0,0,0.06)",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.04)",
          }}
        >
          <DashboardGlobalads
            adId="161753"
            className="
              min-h-[250px]
              w-full
            "
          />
        </div>

        {/* CENTER */}

        <div
          className="
            overflow-hidden
            rounded-[24px]
            bg-white
            p-3
          "
          style={{
            border:
              "1px solid rgba(0,0,0,0.06)",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.04)",
          }}
        >
          <DashboardGlobalads
            adId="518210"
            className="
              min-h-[250px]
              w-full
            "
          />
        </div>

        {/* RIGHT */}

        <div
          className="
            overflow-hidden
            rounded-[24px]
            bg-white
            p-3
          "
          style={{
            border:
              "1px solid rgba(0,0,0,0.06)",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.04)",
          }}
        >
          <DashboardGlobalads
            adId="161753"
            className="
              min-h-[250px]
              w-full
            "
          />
        </div>
      </div>

      {/* FOOTER BANNER */}

      <div
        className="
          overflow-hidden
          rounded-[18px]
          bg-white
          p-2
          sm:rounded-[28px]
          sm:p-3
        "
        style={{
          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <DashboardGlobalads
          adId="332686"
          className="
            min-h-[55px]
            w-full
            sm:min-h-[90px]
          "
        />
      </div>
    </div>
  );
}

export default Captcha_main;