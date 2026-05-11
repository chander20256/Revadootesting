import React, {
  useEffect,
  useState,
} from "react";

import Captcha_Hero from "./Captcha_Hero";

import Captcha_claim from "./Captcha_claim";

import Captcha_History from "./Captcha_History";

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

  /* -----------------------------
     MONETAG VIGNETTE
  ----------------------------- */

  useEffect(() => {
    const script =
      document.createElement(
        "script"
      );

    script.dataset.zone =
      "10993287";

    script.src =
      "https://n6wxm.com/vignette.min.js";

    script.async = true;

    document.body.appendChild(
      script
    );

    return () => {
      if (
        document.body.contains(
          script
        )
      ) {
        document.body.removeChild(
          script
        );
      }
    };
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
          "#ffffff",
      }}
    >
      {/* HERO */}

      <Captcha_Hero />

      {/* CLAIM SECTION */}

      <div
        className="
          grid
          grid-cols-1
          items-start
          gap-5
        "
      >
        {/* CLAIM */}

        <div>
          <Captcha_claim />
        </div>
      </div>

      {/* HISTORY */}

      <div className="w-full">
        <Captcha_History
          history={history}
        />
      </div>
    </div>
  );
}

export default Captcha_main;