import { useState } from "react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", slug: "electronics" },
    { id: 2, name: "Fashion", slug: "fashion" },
  ]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Categories</h1>
        <button className="primaryBtnUi rounded">+ Add Category</button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-x-auto border border-gray-800">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-t border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="p-4 font-medium text-white">{cat.name}</td>
                <td className="p-4">{cat.slug}</td>
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

export default AdminCategories;
