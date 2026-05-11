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

    /* -----------------------------------
       LOAD POPUNDER ONCE
    ----------------------------------- */

    const alreadyLoaded =
      sessionStorage.getItem(
        "popunder_loaded"
      );

    if (!alreadyLoaded) {
      sessionStorage.setItem(
        "popunder_loaded",
        "true"
      );
    }
  }, []);

  /* -----------------------------
   PREVENT TITLE FLASH
----------------------------- */

// useEffect(() => {
//   const originalTitle =
//     document.title;

//   const blockedWords = [
//     "new message",
//     "1 message",
//     "(1)",
//     "message",
//     "notification",
//   ];

//   const interval =
//     setInterval(() => {
//       const current =
//         document.title.toLowerCase();

//       const shouldBlock =
//         blockedWords.some(
//           (word) =>
//             current.includes(
//               word
//             )
//         );

//       if (shouldBlock) {
//         document.title =
//           originalTitle;
//       }
//     }, 500);

//   return () =>
//     clearInterval(interval);
// }, []);

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
          "#ffffff",
      }}
    >
      {/* SOCIAL BAR */}

      <DashboardGlobalads
        adId="687639"
      />

      {/* POPUNDER */}

<DashboardGlobalads
  adId="174926"
/>

      {/* HERO */}

      <Captcha_Hero />

      {/* CLAIM SECTION */}

      <div
        className="
          grid
          grid-cols-1
          items-start
          gap-5
          xl:grid-cols-[300px_1fr_300px]
        "
      >
        {/* LEFT 300x250 */}

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
                  flex
                  items-center
                  justify-center
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
                    flex
                    items-center
                    justify-center
                    min-h-[250px]
                    w-full
                  "
                />
              </div>
            )
          )}
        </div>

        {/* CLAIM */}

        <div>
          <Captcha_claim />
        </div>

        {/* RIGHT 300x250 */}

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
                  flex
                  items-center
                  justify-center
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
                    flex
                    items-center
                    justify-center
                    min-h-[250px]
                    w-full
                  "
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* FULL WIDTH NATIVE */}

      <div
        className="
          flex
          items-center
          justify-center
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
          adId="518210"
          className="
            flex
            items-center
            justify-center
            min-h-[250px]
            w-full
          "
        />
      </div>

      {/* HISTORY */}

      <div className="w-full">
        <Captcha_History
          history={history}
        />
      </div>

      {/* MOBILE 300x250 */}
{/* BOTTOM ADS */}

<div
  className="
    mt-2
    grid
    grid-cols-1
    gap-4
    xl:grid-cols-2
  "
>
  {/* FIRST 468x60 */}

  <div
    className="
      flex
      items-center
      justify-center
      overflow-hidden
      rounded-[18px]
      bg-white
      p-2
      h-[90px]
      sm:rounded-[24px]
      sm:p-3
    "
    style={{
      border:
        "1px solid rgba(0,0,0,0.06)",

      boxShadow:
        "0 8px 24px rgba(0,0,0,0.04)",
    }}
  >
    <DashboardGlobalads
      adId="797073"
      className="
        flex
        h-[60px]
        w-full
        max-w-[468px]
        items-center
        justify-center
      "
    />
  </div>

  {/* SECOND 468x60 */}

  <div
    className="
      flex
      items-center
      justify-center
      overflow-hidden
      rounded-[18px]
      bg-white
      p-2
      h-[90px]
      sm:rounded-[24px]
      sm:p-3
    "
    style={{
      border:
        "1px solid rgba(0,0,0,0.06)",

      boxShadow:
        "0 8px 24px rgba(0,0,0,0.04)",
    }}
  >
    <DashboardGlobalads
      adId="797073"
      className="
        flex
        h-[60px]
        w-full
        max-w-[468px]
        items-center
        justify-center
      "
    />
  </div>
</div>

      
    </div>
  );
}

export default Captcha_main;