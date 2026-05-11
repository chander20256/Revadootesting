
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { AlertCircle } from "lucide-react";

import axios from "axios";

import UsersFilters from "./UsersFilters";
import UsersQuickActions from "./UsersQuickActions";
import UsersStats from "./UsersStats";
import UsersTable from "./UsersTable";
import UserDetailsModal from "./UserDetailsModal";

const API_BASE_URL =
  "https://revadoobackend.onrender.com/api/admin";

const UserManagement = () => {
  const [users, setUsers] =
    useState([]);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    filterStatus,
    setFilterStatus,
  ] = useState("all");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  /* ✅ ONLY ADMIN TOKEN */

  const token =
    localStorage.getItem(
      "adminToken"
    );

  console.log(
    "ADMIN TOKEN:",
    token
  );

  /* -----------------------------
     HEADERS
  ----------------------------- */

  const headers = useMemo(() => {
    if (!token) return {};

    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  /* -----------------------------
     FETCH USERS
  ----------------------------- */

  const fetchUsers =
    async () => {
      if (!token) {
        setError(
          "Admin not authenticated"
        );

        return;
      }

      setLoading(true);

      setError("");

      try {
        const res =
          await axios.get(
            `${API_BASE_URL}/users`,
            {
              headers,

              params: {
                q: searchQuery,

                status:
                  filterStatus,

                limit: 100,
              },
            }
          );

        setUsers(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);

        if (
          err.response
            ?.status === 401
        ) {
          setError(
            "Admin session expired. Please login again."
          );

          localStorage.removeItem(
            "adminToken"
          );
        } else {
          setError(
            err.response?.data
              ?.message ||
              "Failed to fetch users"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* -----------------------------
     AUTO FETCH
  ----------------------------- */

  useEffect(() => {
    const timeout =
      setTimeout(
        fetchUsers,
        300
      );

    return () =>
      clearTimeout(timeout);
  }, [
    searchQuery,
    filterStatus,
    token,
  ]);

  /* -----------------------------
     OPEN MODAL
  ----------------------------- */

  const openUserModal = (
    user
  ) => {
    setSelectedUser(user);

    setIsModalOpen(true);
  };

  /* -----------------------------
     TOGGLE STATUS
  ----------------------------- */

  const handleToggleStatus =
    async (userId) => {
      try {
        const user =
          users.find(
            (u) =>
              u._id === userId
          );

        if (!user) return;

        const newStatus =
          user.status ===
          "active"
            ? "banned"
            : "active";

        const res =
          await axios.patch(
            `${API_BASE_URL}/users/${userId}/status`,
            {
              status:
                newStatus,
            },
            { headers }
          );

        const updated =
          res.data.data;

        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? updated
              : u
          )
        );
      } catch (err) {
        console.error(err);

        setError(
          "Failed to update user"
        );
      }
    };

  /* -----------------------------
     DELETE USER
  ----------------------------- */

  const handleDeleteUser =
    async (userId) => {
      try {
        await axios.delete(
          `${API_BASE_URL}/users/${userId}`,
          {
            headers,
          }
        );

        setUsers((prev) =>
          prev.filter(
            (u) =>
              u._id !== userId
          )
        );
      } catch (err) {
        console.error(err);

        setError(
          "Failed to delete user"
        );
      }
    };

  return (
    <div className="space-y-3 p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Users
        </h1>

        <p className="text-xs sm:text-sm text-gray-600">
          Manage users,
          EXP, streaks &
          rewards
        </p>
      </div>

      {error && (
        <div className="flex gap-2 p-2 bg-red-50 border border-red-200 rounded">
          <AlertCircle className="w-4 h-4 text-red-600" />

          <p className="text-red-700 text-xs">
            {error}
          </p>
        </div>
      )}

      <UsersStats users={users} />

      <UsersQuickActions />

      <UsersFilters
        searchQuery={
          searchQuery
        }
        setSearchQuery={
          setSearchQuery
        }
        filterStatus={
          filterStatus
        }
        setFilterStatus={
          setFilterStatus
        }
      />

      {loading ? (
        <div className="h-40 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <UsersTable
          users={users}
          onToggleStatus={
            handleToggleStatus
          }
          onDeleteUser={
            handleDeleteUser
          }
          onViewUser={
            openUserModal
          }
        />
      )}

      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onBan={
          handleToggleStatus
        }
        onDelete={
          handleDeleteUser
        }
      />
    </div>
  );
};

export default UserManagement;