import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";

function Ads_Manager_Table() {
  const [ads, setAds] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      adName: "",
      slotId: "",
      size: "",
      status: "",
    });

  /* -----------------------------
     API
  ----------------------------- */

  const API =
    "https://revadoobackend.onrender.com";

  /* -----------------------------
     FETCH ADS
  ----------------------------- */

  const fetchAds = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/ads`
      );

      setAds(res.data.ads || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     DELETE AD
  ----------------------------- */

  const deleteAd = async (id) => {
    try {
      await axios.delete(
        `${API}/api/admin/ads/${id}`
      );

      fetchAds();
    } catch (error) {
      console.error(error);
    }
  };

  /* -----------------------------
     START EDIT
  ----------------------------- */

  const startEdit = (ad) => {
    setEditingId(ad._id);

    setEditData({
      adName: ad.adName || "",
      slotId: ad.slotId || "",
      size: ad.size || "",
      status: ad.status || "",
    });
  };

  /* -----------------------------
     CANCEL EDIT
  ----------------------------- */

  const cancelEdit = () => {
    setEditingId(null);

    setEditData({
      adName: "",
      slotId: "",
      size: "",
      status: "",
    });
  };

  /* -----------------------------
     HANDLE EDIT CHANGE
  ----------------------------- */

  const handleEditChange = (
    e
  ) => {
    setEditData({
      ...editData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* -----------------------------
     SAVE EDIT
  ----------------------------- */

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `${API}/api/admin/ads/${id}`,
        editData
      );

      setEditingId(null);

      fetchAds();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      {/* HEADER */}

      <div className="grid grid-cols-6 border-b border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-600">
        <div>Ad Name</div>

        <div>Slot</div>

        <div>Size</div>

        <div>Status</div>

        <div>Mode</div>

        <div className="text-right">
          Actions
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="flex items-center justify-center px-5 py-16 text-sm text-zinc-400">
          Loading ads...
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        ads.length === 0 && (
          <div className="flex items-center justify-center px-5 py-16 text-sm text-zinc-400">
            No ads found
          </div>
        )}

      {/* ADS */}

      {!loading &&
        ads.length > 0 &&
        ads.map((ad) => (
          <div
            key={ad._id}
            className="grid grid-cols-6 items-center border-b border-zinc-100 px-5 py-4 text-sm text-zinc-700"
          >
            {/* NAME */}

            <div>
              {editingId ===
              ad._id ? (
                <input
                  type="text"
                  name="adName"
                  value={
                    editData.adName
                  }
                  onChange={
                    handleEditChange
                  }
                  className="h-10 w-full rounded-lg border border-zinc-200 px-3 outline-none focus:border-orange-500"
                />
              ) : (
                <div className="font-semibold">
                  {ad.adName}
                </div>
              )}
            </div>

            {/* SLOT */}

            <div>
              {editingId ===
              ad._id ? (
                <input
                  type="text"
                  name="slotId"
                  value={
                    editData.slotId
                  }
                  onChange={
                    handleEditChange
                  }
                  className="h-10 w-full rounded-lg border border-zinc-200 px-3 outline-none focus:border-orange-500"
                />
              ) : (
                ad.slotId
              )}
            </div>

            {/* SIZE */}

            <div>
              {editingId ===
              ad._id ? (
                <input
                  type="text"
                  name="size"
                  value={
                    editData.size
                  }
                  onChange={
                    handleEditChange
                  }
                  className="h-10 w-full rounded-lg border border-zinc-200 px-3 outline-none focus:border-orange-500"
                />
              ) : (
                ad.size || "-"
              )}
            </div>

            {/* STATUS */}

            <div>
              {editingId ===
              ad._id ? (
                <select
                  name="status"
                  value={
                    editData.status
                  }
                  onChange={
                    handleEditChange
                  }
                  className="h-10 rounded-lg border border-zinc-200 px-3 outline-none focus:border-orange-500"
                >
                  <option>
                    Active
                  </option>

                  <option>
                    Inactive
                  </option>
                </select>
              ) : ad.status ===
                "Active" ? (
                <span className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  <FaCheckCircle />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  <FaTimesCircle />
                  Inactive
                </span>
              )}
            </div>

            {/* MODE */}

            <div className="capitalize">
              {ad.mode}
            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-2">
              {editingId ===
              ad._id ? (
                <>
                  {/* SAVE */}

                  <button
                    onClick={() =>
                      saveEdit(
                        ad._id
                      )
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-green-200
                      text-green-600
                      transition-all
                      duration-300
                      hover:bg-green-50
                    "
                  >
                    <FaSave
                      size={14}
                    />
                  </button>

                  {/* CANCEL */}

                  <button
                    onClick={
                      cancelEdit
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-zinc-200
                      text-zinc-600
                      transition-all
                      duration-300
                      hover:bg-zinc-100
                    "
                  >
                    <FaTimes
                      size={14}
                    />
                  </button>
                </>
              ) : (
                <>
                  {/* EDIT */}

                  <button
                    onClick={() =>
                      startEdit(
                        ad
                      )
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-zinc-200
                      text-zinc-600
                      transition-all
                      duration-300
                      hover:bg-zinc-100
                    "
                  >
                    <FaEdit
                      size={14}
                    />
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      deleteAd(
                        ad._id
                      )
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-red-200
                      text-red-500
                      transition-all
                      duration-300
                      hover:bg-red-50
                    "
                  >
                    <FaTrash
                      size={14}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Ads_Manager_Table;