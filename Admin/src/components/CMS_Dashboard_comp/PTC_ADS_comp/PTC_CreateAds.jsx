import React, {
  useState,
} from "react";

import axios from "axios";

function PTC_CreateAds() {
  const [formData, setFormData] =
    useState({
      title: "",

      adType: "window",

      provider:
        "monetag",

      adUrl: "",

      reward: "",

      timer: "",

      dailyLimit: "1",

      status: "active",
    });

  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
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

          formData
        );

      if (
        response.data.success
      ) {
        alert(
          "PTC Ad Created Successfully"
        );

        setFormData({
          title: "",

          adType:
            "window",

          provider:
            "monetag",

          adUrl: "",

          reward: "",

          timer: "",

          dailyLimit:
            "1",

          status:
            "active",
        });
      }
    } catch (error) {
      console.error(
        "CREATE ERROR:",
        error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to create PTC Ad"
      );
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
          Create reusable
          paid-to-click ads and
          reward campaigns for
          your users.
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

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Name shown to users
            on the PTC card.
          </p>

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

        {/* AD TYPE */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Ad Type
          </label>

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Choose how the ad
            opens for the user.
          </p>

          <select
            name="adType"
            value={
              formData.adType
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
            <option value="window">
              Window
            </option>

            <option value="iframe">
              Iframe
            </option>

            <option value="external">
              External
            </option>

            <option value="youtube">
              Youtube
            </option>
          </select>
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

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Select the ad network
            provider source.
          </p>

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
            Reward
          </label>

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Creds rewarded after
            successful completion.
          </p>

          <input
            type="number"
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
            Timer
          </label>

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Time users must stay
            before reward unlocks.
          </p>

          <input
            type="number"
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

        {/* DAILY LIMIT */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Daily Limit
          </label>

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            How many times a user
            can complete daily.
          </p>

          <input
            type="number"
            name="dailyLimit"
            value={
              formData.dailyLimit
            }
            onChange={
              handleChange
            }
            placeholder="1"
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

        {/* AD URL */}

        <div className="space-y-2 md:col-span-2">
          <label
            className="
              text-sm
              font-bold
            "
          >
            Ad URL
          </label>

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Destination link users
            will visit to complete
            the task.
          </p>

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

          <p
            className="
              text-xs
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Enable or pause this
            PTC campaign anytime.
          </p>

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