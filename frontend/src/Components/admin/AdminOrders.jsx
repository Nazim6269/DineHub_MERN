const AdminOrders = () => {
  const orders = [
    { id: "#1001", customer: "John Doe", total: 250, status: "Pending" },
    { id: "#1002", customer: "Jane Smith", total: 520, status: "Delivered" },
  ];

  const statusColor = {
    Pending: "bg-yellow-500/10 text-yellow-400",
    Shipped: "bg-blue-500/10 text-blue-400",
    Delivered: "bg-green-500/10 text-green-400",
    Cancelled: "bg-red-500/10 text-red-400",
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-white">Orders</h1>

      {/* Table Wrapper */}
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-x-auto border border-gray-800">
        <table className="w-full text-left text-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="p-4 font-medium text-white">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 font-semibold text-white">${order.total}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      statusColor[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-400 hover:underline">
                    View
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

export default AdminOrders;
