import { FiSearch } from "react-icons/fi";

const UsersFilters = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-4">

      {/* Search */}
      <div className="flex-1 min-w-[200px] relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role (future use) */}
      <select className="px-4 py-2 border rounded-lg bg-white">
        <option>All Roles</option>
        <option>User</option>
        <option>Admin</option>
      </select>

      {/* Status */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="banned">Banned</option>
      </select>

    </div>
  );
};

export default UsersFilters;