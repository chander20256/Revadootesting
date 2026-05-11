const UsersStats = ({ users }) => {
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (u) => u.status === "active"
  ).length;

  const bannedUsers = users.filter(
    (u) => u.status === "banned"
  ).length;

  // Optional (if roles exist later)
  const adminUsers = users.filter(
    (u) => u.role === "admin"
  ).length;

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Active Users", value: activeUsers },
    { label: "Admins", value: adminUsers },
    { label: "Banned Users", value: bannedUsers },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-2xl font-semibold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UsersStats;