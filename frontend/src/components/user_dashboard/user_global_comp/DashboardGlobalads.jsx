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

  const [loading, setLoading] =
    useState(true);

  const API =
    "https://revadoobackend.onrender.com";

  useEffect(() => {
    let mounted = true;

    const loadAd =
      async () => {
        try {
          const res =
            await axios.get(
              `${API}/api/admin/ads/${adId}`
            );

          if (
            !res.data.success
          ) {
            setLoading(false);
            return;
          }

          if (
            !containerRef.current ||
            !mounted
          ) {
            setLoading(false);
            return;
          }

          const adCode =
            res.data.ad.adCode;

          /* CLEAR OLD */

          containerRef.current.innerHTML =
            "";

          /* TEMP DIV */

          const tempDiv =
            document.createElement(
              "div"
            );

          tempDiv.innerHTML =
            adCode;

          /* NON SCRIPTS */

          Array.from(
            tempDiv.childNodes
          ).forEach((node) => {
            if (
              node.nodeName !==
              "SCRIPT"
            ) {
              containerRef.current.appendChild(
                node.cloneNode(
                  true
                )
              );
            }
          });

          /* SCRIPTS */

          const scripts =
            tempDiv.querySelectorAll(
              "script"
            );

          scripts.forEach(
            (
              oldScript,
              index
            ) => {
              setTimeout(() => {
                if (
                  !containerRef.current
                )
                  return;

                const script =
                  document.createElement(
                    "script"
                  );

                /* ATTRIBUTES */

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

                /* INLINE */

                if (
                  oldScript.innerHTML
                ) {
                  script.innerHTML =
                    oldScript.innerHTML;
                }

                script.async =
                  true;

                containerRef.current.appendChild(
                  script
                );
              }, index * 50);
            }
          );

          setLoading(false);
        } catch (error) {
          console.log(
            "Ad Error:",
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

  if (loading) {
    return null;
  }

  return (
    <div
      className={`
        flex
        items-center
        justify-center
        overflow-hidden
        ${className}
      `}
    >
      <div
        ref={containerRef}
        className="
          flex
          items-center
          justify-center
          w-full
        "
      />
    </div>
  );
}

export default DashboardGlobalads;