import { FiMail, FiUserPlus, FiDownload, FiUpload } from "react-icons/fi";

const UsersQuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">

        <button className="flex items-center justify-center gap-2 px-3 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition">
          <FiMail />
          <span className="text-sm sm:text-base">Email All</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition">
          <FiUserPlus />
          <span className="text-sm sm:text-base">Bulk Add</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition">
          <FiDownload />
          <span className="text-sm sm:text-base">Export</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition">
          <FiUpload />
          <span className="text-sm sm:text-base">Import</span>
        </button>

      </div>

    </div>
  );
};

export default UsersQuickActions;