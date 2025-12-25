const AdminTable = () => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-x-auto border border-gray-800">
      <table className="w-full text-left text-gray-300">
        {/* Table Head */}
        <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
          <tr>
            <th className="p-4">Order ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Status</th>
            <th className="p-4">Total</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {["Pending", "Shipped", "Delivered"].map((status, i) => (
            <tr
              key={i}
              className="border-t border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="p-4 font-medium text-white">#10{i + 1}</td>
              <td className="p-4">John Doe</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full
                    ${
                      status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : status === "Shipped"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                >
                  {status}
                </span>
              </td>

              <td className="p-4 font-semibold text-white">$120</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
