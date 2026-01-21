import useFetchAdminData from "../../hooks/useFetchAdminData";
import Error from "../Error";
import Loading from "../Loading";

const AdminProducts = () => {
    const { isPending, isError, data, error } = useFetchAdminData();

    if (isPending) return <Loading />;
    if (isError) return <Error error={error} />;

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                    Products
                </h1>
                <button className="bg-(--color-accent-cyan) hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg transition">
                    + Add Product
                </button>
            </div>

            {/* Table */}
            <div className="bg-background-card rounded-md shadow-lg overflow-x-auto border border-gray-200">
                <table className="w-full min-w-[600px] text-left text-text-secondary">
                    {/* Table Head */}
                    <thead className="bg-background-dark text-text-muted text-sm uppercase">
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
                        {data?.payload?.products.map((p) => (
                            <tr
                                key={p._id}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="p-4 font-medium text-text-primary">{p.name}</td>
                                <td className="p-4 font-semibold text-text-primary">
                                    ${p.options?.[0]?.full || p.options?.[0]?.half || 0}
                                </td>
                                <td className="p-4">{p.stock}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${p.status === "available"
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-red-500/10 text-red-400"
                                            }`}
                                    >
                                        {p.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right flex flex-wrap gap-2 justify-end">
                                    <button className="text-(--color-accent-cyan) hover:underline">
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
