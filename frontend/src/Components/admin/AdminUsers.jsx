const AdminUsers = () => {
  const users = [
    { id: 1, name: "Admin User", email: "admin@mail.com", role: "admin" },
    { id: 2, name: "Customer One", email: "user@mail.com", role: "user" },
  ];

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-white">Users</h1>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-x-auto border border-gray-800">
        <table className="w-full text-left text-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="p-4 font-medium text-white">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-gray-700/10 text-gray-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  {user.role !== "admin" && (
                    <button className="text-blue-400 hover:underline">
                      Make Admin
                    </button>
                  )}
                  <button className="text-red-400 hover:underline">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
