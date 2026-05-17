import React, {
  useState,
} from "react";

import axios from "axios";

import Swal from "sweetalert2";

function PTC_CreateAds() {
  const [formData, setFormData] =
    useState({
      title: "",

      provider:
        "monetag",

      adUrl: "",

      reward: "",

      timer: "",

      status: "active",
    });

  /* =========================================
     HANDLE INPUT
  ========================================= */

  /* =========================================
   HANDLE INPUT
========================================= */

const handleChange = (
  e
) => {
  const {
    name,
    value,
  } = e.target;

  /* BLOCK NEGATIVE */

  if (
    (name ===
      "reward" ||
      name ===
        "timer") &&
    Number(value) < 0
  ) {
    return;
  }

  setFormData({
    ...formData,

    [name]: value,
  });
};
  /* =========================================
     HANDLE SUBMIT
  ========================================= */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await axios.post(
            "https://revadoobackend.onrender.com/api/admin/ptc-ads/create",

            {
              ...formData,

              adType:
                "window",
            }
          );

        if (
          response.data.success
        ) {
          Swal.fire({
            icon:
              "success",

            title:
              "PTC Ad Created",

            text: "Campaign created successfully.",

            confirmButtonColor:
              "#FF6B00",
          });

          setFormData({
            title: "",

            provider:
              "monetag",

            adUrl: "",

            reward: "",

            timer: "",

            status:
              "active",
          });
        }
      } catch (error) {
        console.error(
          "CREATE ERROR:",
          error
        );

        Swal.fire({
          icon:
            "error",

          title:
            "Creation Failed",

          text:
            error.response
              ?.data
              ?.message ||
            "Failed to create PTC Ad",

          confirmButtonColor:
            "#FF6B00",
        });
      }
    };

  return (
    <section
      className="
        w-full
        rounded-[24px]
        p-4
        sm:p-6
      "
      style={{
        background:
          "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h2
          className="
            text-xl
            sm:text-2xl
            font-black
          "
          style={{
            color:
              "#030712",
          }}
        >
          Create PTC Ad
        </h2>

        <p
          className="
            mt-2
            text-xs
            sm:text-sm
            leading-relaxed
          "
          style={{
            color:
              "#6b7280",
          }}
        >
          Create daily reward
          campaigns for users.
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={
          handleSubmit
        }
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >
        {/* TITLE */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Ad Title
          </label>

          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Premium Sponsor Campaign"
            className="
              w-full
              h-12
              rounded-2xl
              px-4
              outline-none
              text-sm
            "
            style={{
              background:
                "#f9fafb",

              border:
                "1px solid rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {/* PROVIDER */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Provider
          </label>

          <select
            name="provider"
            value={
              formData.provider
            }
            onChange={
              handleChange
            }
            className="
              w-full
              h-12
              rounded-2xl
              px-4
              outline-none
              text-sm
            "
            style={{
              background:
                "#f9fafb",

              border:
                "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <option value="monetag">
              Monetag
            </option>

            <option value="adsterra">
              Adsterra
            </option>

            <option value="propellerads">
              PropellerAds
            </option>
          </select>
        </div>

        {/* REWARD */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Reward Creds
          </label>

         <input
  type="number"
  min="0"
            name="reward"
            value={
              formData.reward
            }
            onChange={
              handleChange
            }
            placeholder="25"
            className="
              w-full
              h-12
              rounded-2xl
              px-4
              outline-none
              text-sm
            "
            style={{
              background:
                "#f9fafb",

              border:
                "1px solid rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {/* TIMER */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Timer (Seconds)
          </label>

          <input
  type="number"
  min="0"
            name="timer"
            value={
              formData.timer
            }
            onChange={
              handleChange
            }
            placeholder="15"
            className="
              w-full
              h-12
              rounded-2xl
              px-4
              outline-none
              text-sm
            "
            style={{
              background:
                "#f9fafb",

              border:
                "1px solid rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {/* URL */}

        <div className="space-y-2 md:col-span-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Ad URL
          </label>

          <input
            type="text"
            name="adUrl"
            value={
              formData.adUrl
            }
            onChange={
              handleChange
            }
            placeholder="https://example.com"
            className="
              w-full
              h-12
              rounded-2xl
              px-4
              outline-none
              text-sm
            "
            style={{
              background:
                "#f9fafb",

              border:
                "1px solid rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {/* STATUS */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Status
          </label>

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="
              w-full
              h-12
              rounded-2xl
              px-4
              outline-none
              text-sm
            "
            style={{
              background:
                "#f9fafb",

              border:
                "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <option value="active">
              Active
            </option>

            <option value="paused">
              Paused
            </option>
          </select>
        </div>

        {/* INFO */}

        <div
          className="
            rounded-2xl
            p-4
            flex
            items-center
            text-xs
            leading-relaxed
          "
          style={{
            background:
              "rgba(255,107,0,0.08)",

            color:
              "#92400e",
          }}
        >
          Users can complete this
          ad once per day. Rewards
          automatically reset at
          12:00 AM.
        </div>

        {/* BUTTON */}

        <div
          className="
            md:col-span-2
            pt-2
          "
        >
          <button
            type="submit"
            className="
              h-12
              px-6
              rounded-2xl
              text-sm
              font-bold
              transition-all
              duration-300
            "
            style={{
              background:
                "#FF6B00",

              color:
                "#ffffff",
            }}
          >
            Create PTC Ad
          </button>
        </div>
      </form>
    </section>
  );
}

export default PTC_CreateAds;