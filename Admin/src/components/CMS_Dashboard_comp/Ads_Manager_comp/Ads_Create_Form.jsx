import React, { useState } from "react";

import axios from "axios";

function Ads_Create_Form() {
  const API =
    "https://revadoobackend.onrender.com";

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      adName: "",
      type: "Banner",
      device: "All",
      status: "Active",
      adCode: "",
    });

  /* -----------------------------------
     HANDLE CHANGE
  ----------------------------------- */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* -----------------------------------
     SUBMIT
  ----------------------------------- */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${API}/api/admin/ads`,
        formData
      );

      alert(
        "Ad created successfully"
      );

      setFormData({
        adName: "",
        type: "Banner",
        device: "All",
        status: "Active",
        adCode: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to create ad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* HEADER */}

      <div className="mb-6">
        <h2
          className="
            text-xl
            font-bold
            text-zinc-900
          "
        >
          Create New Ad
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-zinc-500
          "
        >
          Store complete raw ad code
          from any ad network and
          render it anywhere in
          frontend using a unique ad
          ID.
        </p>

        <div
          className="
            mt-4
            rounded-2xl
            border
            border-orange-200
            bg-orange-50
            p-4
          "
        >
          <p
            className="
              text-xs
              leading-6
              text-orange-700
            "
          >
            Supported:
            Adsterra Native Ads,
            Social Bar, Popup Ads,
            iframe embeds, HTML ads,
            banner scripts, and
            future ad networks.
          </p>
        </div>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
      >
        {/* AD NAME */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-zinc-700
            "
          >
            Ad Name
          </label>

          <input
            type="text"
            name="adName"
            value={formData.adName}
            onChange={handleChange}
            placeholder="Homepage Native Ad"
            required
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-zinc-200
              px-4
              text-sm
              outline-none
              transition-all
              focus:border-orange-500
            "
          />
        </div>

        {/* TYPE */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-zinc-700
            "
          >
            Ad Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-zinc-200
              px-4
              text-sm
              outline-none
              transition-all
              focus:border-orange-500
            "
          >
            <option>
              Banner
            </option>

            <option>
              Native
            </option>

            <option>
              Popup
            </option>

            <option>
              Social Bar
            </option>

            <option>
              iframe
            </option>

            <option>
              HTML
            </option>

            <option>
              Custom
            </option>
          </select>
        </div>

        {/* DEVICE */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-zinc-700
            "
          >
            Device
          </label>

          <select
            name="device"
            value={formData.device}
            onChange={handleChange}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-zinc-200
              px-4
              text-sm
              outline-none
              transition-all
              focus:border-orange-500
            "
          >
            <option>
              All
            </option>

            <option>
              Desktop
            </option>

            <option>
              Mobile
            </option>

            <option>
              Tablet
            </option>
          </select>
        </div>

        {/* STATUS */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-zinc-700
            "
          >
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-zinc-200
              px-4
              text-sm
              outline-none
              transition-all
              focus:border-orange-500
            "
          >
            <option>
              Active
            </option>

            <option>
              Inactive
            </option>
          </select>
        </div>
      </div>

      {/* RAW AD CODE */}

      <div className="mt-5">
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-700
          "
        >
          Full Ad Code
        </label>

        <p
          className="
            mb-3
            text-xs
            text-zinc-500
          "
        >
          Paste complete raw ad code
          including scripts, iframe,
          HTML, native ads, popup
          ads, or any embed code.
        </p>

        {/* IMPORTANT */}

        <div
          className="
            mb-4
            rounded-2xl
            border
            border-zinc-200
            bg-zinc-50
            p-4
          "
        >
          <h3
            className="
              mb-2
              text-sm
              font-semibold
              text-zinc-800
            "
          >
            Important Instructions
          </h3>

          <ul
            className="
              space-y-2
              text-xs
              leading-6
              text-zinc-600
            "
          >
            <li>
              • Paste COMPLETE ad
              code exactly as provided
              by the ad network.
            </li>

            <li>
              • Do NOT remove script
              tags.
            </li>

            <li>
              • Supports iframe,
              HTML, JavaScript, and
              native ad embeds.
            </li>

            <li>
              • This system
              automatically renders
              ads using adId.
            </li>

            <li>
              • Only trusted admin
              users should create
              ads.
            </li>
          </ul>
        </div>

        {/* TEXTAREA */}

        <textarea
          name="adCode"
          value={formData.adCode}
          onChange={handleChange}
          required
          rows={14}
          placeholder={`<!-- Adsterra Native Ad Example -->

<script async="async" data-cfasync="false" src="//network.js"></script>

<div id="container-ad"></div>`}
          className="
            w-full
            rounded-2xl
            border
            border-zinc-200
            p-4
            text-sm
            outline-none
            transition-all
            focus:border-orange-500
          "
        />

        {/* FOOTER */}

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-xs
              text-zinc-500
            "
          >
            Supports full raw embed
            code.
          </p>

          <p
            className="
              text-xs
              font-medium
              text-zinc-400
            "
          >
            {formData.adCode.length}
            {" "}
            characters
          </p>
        </div>
      </div>

      {/* WARNING */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-4
        "
      >
        <p
          className="
            text-xs
            leading-6
            text-red-700
          "
        >
          Security Warning:
          Raw scripts and HTML will
          be injected directly into
          the frontend. Only use
          trusted ad network code.
        </p>
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="
          mt-5
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-2xl
          bg-orange-500
          px-6
          text-sm
          font-semibold
          text-white
          transition-all
          hover:bg-orange-600
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Creating Ad..."
          : "Save Ad"}
      </button>
    </form>
  );
}

export default Ads_Create_Form;