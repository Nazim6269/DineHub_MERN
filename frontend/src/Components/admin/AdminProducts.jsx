const AdminProducts = () => {
  const products = [
    { id: 1, name: "iPhone 15", price: 999, stock: 12, status: "Active" },
    {
      id: 2,
      name: "MacBook Pro",
      price: 1999,
      stock: 5,
      status: "Out of stock",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Products</h1>
        <button className="primaryBtnUi rounded">+ Add Product</button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-x-auto border border-gray-800">
        <table className="w-full text-left text-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="p-4 font-medium text-white">{p.name}</td>
                <td className="p-4 font-semibold text-white">${p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      p.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button className="text-blue-400 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline">
                    Delete
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

export default AdminProducts;
