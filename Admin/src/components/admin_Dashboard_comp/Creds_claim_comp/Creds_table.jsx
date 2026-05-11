import React, {
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

import {
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaTrash,
} from "react-icons/fa";

const API_BASE_URL =
  "https://revadoobackend.onrender.com/api/admin";

function Creds_table() {
  const [codes, setCodes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH CODES

  const fetchCodes =
    async () => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/creds/admin/all`
          );

        const data =
          await response.json();

        if (data.success) {
          setCodes(data.data);
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",

          title:
            "Failed",

          text:
            "Unable to fetch codes",

          confirmButtonColor:
            "#FF6B00",
        });
      } finally {
        setLoading(false);
      }
    };

  // LOAD

  useEffect(() => {
    fetchCodes();
  }, []);

  // COPY CODE

  const copyCode = async (
    code
  ) => {
    await navigator.clipboard.writeText(
      code
    );

    Swal.fire({
      icon: "success",

      title: "Copied",

      text:
        "Code copied successfully",

      confirmButtonColor:
        "#FF6B00",
    });
  };

  // DELETE CODE

  const deleteCode = async (
    id
  ) => {
    const result =
      await Swal.fire({
        title:
          "Delete Code?",

        text:
          "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor:
          "#ef4444",

        cancelButtonColor:
          "#6b7280",

        confirmButtonText:
          "Delete",
      });

    if (!result.isConfirmed)
      return;

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/creds/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",

          title: "Deleted",

          text:
            "Code deleted successfully",

          confirmButtonColor:
            "#FF6B00",
        });

        fetchCodes();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title:
          "Failed",

        text:
          "Unable to delete code",

        confirmButtonColor:
          "#FF6B00",
      });
    }
  };

  return (
    <div
      className="
        rounded-[32px]
        overflow-hidden
      "
      style={{
        background: "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 40px rgba(0,0,0,0.05)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        className="
          px-5
          sm:px-7
          py-6
          border-b
        "
        style={{
          borderColor:
            "rgba(0,0,0,0.06)",
        }}
      >
        <h2
          className="
            text-2xl
            sm:text-3xl
            font-black
          "
          style={{
            color: "#111827",
          }}
        >
          Generated
          <span
            style={{
              color: "#FF6B00",
            }}
          >
            {" "}
            Codes
          </span>
        </h2>

        <p
          className="
            mt-2
            text-sm
            sm:text-base
          "
          style={{
            color: "#6b7280",
          }}
        >
          Manage all generated
          Revadoo reward codes.
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead
            style={{
              background:
                "rgba(255,107,0,0.03)",
            }}
          >
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">
                Code
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">
                Reward
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">
                Claims
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">
                Expiry
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              codes.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                  style={{
                    borderColor:
                      "rgba(0,0,0,0.06)",
                  }}
                >
                  {/* CODE */}

                  <td className="px-6 py-5">
                    <div
                      className="
                        text-sm
                        font-black
                        tracking-wide
                      "
                      style={{
                        color:
                          "#111827",
                      }}
                    >
                      {item.code}
                    </div>
                  </td>

                  {/* REWARD */}

                  <td className="px-6 py-5">
                    <div
                      className="
                        text-sm
                        font-semibold
                      "
                      style={{
                        color:
                          "#FF6B00",
                      }}
                    >
                      {item.reward}
                    </div>
                  </td>

                  {/* CLAIMS */}

                  <td className="px-6 py-5">
                    <div
                      className="
                        text-sm
                        font-bold
                      "
                      style={{
                        color:
                          "#374151",
                      }}
                    >
                      {
                        item.totalClaimed
                      }
                      /
                      {
                        item.maxClaims
                      }
                    </div>
                  </td>

                  {/* EXPIRY */}

                  <td className="px-6 py-5">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                      "
                      style={{
                        color:
                          "#6b7280",
                      }}
                    >
                      <FaClock />

                      {item.expiryDate
                        ? new Date(
                            item.expiryDate
                          ).toLocaleString()
                        : "No Expiry"}
                    </div>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-2xl
                        text-xs
                        font-bold
                      "
                      style={{
                        background:
                          item.status ===
                          "Completed"
                            ? "rgba(239,68,68,0.10)"
                            : "rgba(34,197,94,0.10)",

                        color:
                          item.status ===
                          "Completed"
                            ? "#ef4444"
                            : "#22c55e",
                      }}
                    >
                      <FaCheckCircle />

                      {item.status}
                    </div>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {/* COPY */}

                      <button
                        onClick={() =>
                          copyCode(
                            item.code
                          )
                        }
                        className="
                          h-10
                          px-4
                          rounded-xl
                          text-sm
                          font-bold
                          flex
                          items-center
                          gap-2
                        "
                        style={{
                          background:
                            "rgba(255,107,0,0.08)",

                          color:
                            "#FF6B00",
                        }}
                      >
                        <FaCopy />
                        Copy
                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() =>
                          deleteCode(
                            item._id
                          )
                        }
                        className="
                          h-10
                          px-4
                          rounded-xl
                          text-sm
                          font-bold
                          flex
                          items-center
                          gap-2
                          text-white
                        "
                        style={{
                          background:
                            "#ef4444",
                        }}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* EMPTY */}

        {!loading &&
          codes.length === 0 && (
            <div
              className="
                py-20
                text-center
                text-sm
                font-semibold
              "
              style={{
                color: "#9ca3af",
              }}
            >
              No codes generated yet.
            </div>
          )}

        {/* LOADING */}

        {loading && (
          <div
            className="
              py-20
              text-center
              text-sm
              font-semibold
            "
            style={{
              color: "#9ca3af",
            }}
          >
            Loading codes...
          </div>
        )}
      </div>
    </div>
  );
}

export default Creds_table;