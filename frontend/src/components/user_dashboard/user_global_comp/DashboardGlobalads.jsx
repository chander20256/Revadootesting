/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

function DashboardGlobalads({
  adId,
  className = "",
}) {
  const containerRef =
    useRef(null);

  const wrapperRef =
    useRef(null);

  const [loading, setLoading] =
    useState(true);

  const API =
    "https://revadoobackend.onrender.com";

  /* -----------------------------------
     LOAD AD
  ----------------------------------- */

  useEffect(() => {
    let mounted = true;

    const loadAd =
      async () => {
        try {
          setLoading(true);

          const res =
            await axios.get(
              `${API}/api/admin/ads/${adId}`
            );

          /* NO SUCCESS */

          if (
            !res.data.success
          ) {
            setLoading(false);

            return;
          }

          const adCode =
            res.data.ad.adCode;

          /* NO CONTAINER */

          if (
            !containerRef.current ||
            !mounted
          ) {
            setLoading(false);

            return;
          }

          /* CLEAR OLD ADS */

          if (
            containerRef.current
          ) {
            containerRef.current.innerHTML =
              "";
          }

          /* VERY IMPORTANT */

          try {
            delete window.atOptions;
          } catch (err) {}

          /* TEMP WRAPPER */

          const tempDiv =
            document.createElement(
              "div"
            );

          tempDiv.innerHTML =
            adCode;

          /* -----------------------------------
             APPEND NON-SCRIPT ELEMENTS
          ----------------------------------- */

          const nonScripts =
            Array.from(
              tempDiv.childNodes
            ).filter(
              (node) =>
                node.nodeName !==
                "SCRIPT"
            );

          nonScripts.forEach(
            (node) => {
              containerRef.current.appendChild(
                node.cloneNode(
                  true
                )
              );
            }
          );

          /* -----------------------------------
             EXECUTE SCRIPTS SEQUENTIALLY
          ----------------------------------- */

          const scripts =
            tempDiv.querySelectorAll(
              "script"
            );

          for (const oldScript of scripts) {
            const script =
              document.createElement(
                "script"
              );

            /* COPY ATTRIBUTES */

            Array.from(
              oldScript.attributes
            ).forEach(
              (attr) => {
                script.setAttribute(
                  attr.name,
                  attr.value
                );
              }
            );

            /* INLINE SCRIPT */

            if (
              oldScript.innerHTML
            ) {
              script.innerHTML =
                oldScript.innerHTML;
            }

            script.async =
              false;

            /* WAIT FOR SCRIPT */

            await new Promise(
              (resolve) => {
                script.onload =
                  resolve;

                script.onerror =
                  resolve;

                containerRef.current.appendChild(
                  script
                );

                /* INLINE FALLBACK */

                if (
                  !script.src
                ) {
                  resolve();
                }
              }
            );
          }

          /* REMOVE WRAPPER UI */

          setTimeout(() => {
            if (
              wrapperRef.current
            ) {
              wrapperRef.current.style.background =
                "transparent";

              wrapperRef.current.style.boxShadow =
                "none";

              wrapperRef.current.style.border =
                "none";

              wrapperRef.current.style.padding =
                "0px";
            }

            setLoading(false);
          }, 500);
        } catch (error) {
          console.log(
            "Ad Load Error:",
            error
          );

          setLoading(false);
        }
      };

    if (adId) {
      loadAd();
    }

    return () => {
      mounted = false;
    };
  }, [adId]);

  return (
    <div
      ref={wrapperRef}
      className={`
        flex
        items-center
        justify-center
        overflow-hidden
        ${className}
      `}
    >
      {loading && (
        <div
          className="
            flex
            min-h-[90px]
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-zinc-100
            text-xs
            text-zinc-400
          "
        >
          Loading Ad...
        </div>
      )}

      <div
        ref={containerRef}
      />
    </div>
  );
}

export default DashboardGlobalads;