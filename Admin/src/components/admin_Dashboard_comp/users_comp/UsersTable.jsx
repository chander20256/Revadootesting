import {
  FiEdit2,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

/* -----------------------------
   RELATIVE TIME HELPER
----------------------------- */

const getLastSeen = (
  date
) => {
  if (!date) return "Never";

  const now = Date.now();

  const last = new Date(
    date
  ).getTime();

  const diffSec = Math.floor(
    (now - last) / 1000
  );

  if (diffSec < 60)
    return "Just now";

  const mins = Math.floor(
    diffSec / 60
  );

  if (mins < 60)
    return `${mins} min${
      mins > 1 ? "s" : ""
    } ago`;

  const hours = Math.floor(
    mins / 60
  );

  if (hours < 24)
    return `${hours} hr${
      hours > 1 ? "s" : ""
    } ago`;

  const days = Math.floor(
    hours / 24
  );

  if (days < 7)
    return `${days} day${
      days > 1 ? "s" : ""
    } ago`;

  return new Date(
    date
  ).toLocaleDateString();
};

const UsersTable = ({
  users,
  onToggleStatus,
  onDeleteUser,
  onViewUser,
}) => {
  // force re-render every minute

  const [, setTick] =
    useState(0);

  useEffect(() => {
    const id = setInterval(
      () =>
        setTick((t) => t + 1),
      60000
    );

    return () =>
      clearInterval(id);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto w-full">
        <table className="min-w-[1100px] w-full divide-y divide-gray-200">
          {/* HEADER */}

          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="whitespace-nowrap">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Creds
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                EXP
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Streak
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Daily Bonus
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last Seen
              </th>

              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          {/* BODY */}

          <tbody className="divide-y">
            {users.map((user) => {
              const lastSeen =
                getLastSeen(
                  user.lastActiveAt ||
                    user.lastLoginAt
                );

              return (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 whitespace-nowrap"
                >
                  {/* USER */}

                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {
                        user.username
                      }
                    </div>

                    <div className="text-xs text-gray-500 truncate max-w-[180px]">
                      {user.email}
                    </div>
                  </td>

                  {/* CREDS */}

                  <td className="px-4 py-3">
                    <span className="font-bold text-orange-600">
                      {user.creds ||
                        0}
                    </span>
                  </td>

                  {/* EXP */}

                  <td className="px-4 py-3">
                    <span className="font-bold text-indigo-600">
                      {user.exp ||
                        0}
                    </span>
                  </td>

                  {/* STREAK */}

                  <td className="px-4 py-3">
                    <span className="font-semibold text-pink-600">
                      🔥{" "}
                      {user.streak ||
                        0}
                    </span>
                  </td>

                  {/* DAILY BONUS */}

                  <td className="px-4 py-3">
                    <span className="font-semibold text-green-600">
                      +
                      {user.dailyBonus ||
                        5}
                      %
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status ===
                        "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        user.status
                      }
                    </span>
                  </td>

                  {/* LAST SEEN */}

                  <td className="px-4 py-3 text-sm text-gray-500">
                    {lastSeen}
                  </td>

                  {/* ACTIONS */}

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() =>
                          onToggleStatus(
                            user._id
                          )
                        }
                        className="text-indigo-600"
                      >
                        {user.status ===
                        "active" ? (
                          <FiToggleRight className="w-5 h-5" />
                        ) : (
                          <FiToggleLeft className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        onClick={() =>
                          onViewUser(
                            user
                          )
                        }
                        className="text-yellow-600"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() =>
                          onDeleteUser(
                            user._id
                          )
                        }
                        className="text-red-600"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;