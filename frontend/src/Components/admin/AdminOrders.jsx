import useFetchAdminData from "../../hooks/useFetchAdminData";
import Error from "../Error";
import Loading from "../Loading";

const AdminOrders = () => {
    const { data, isError, isPending, error } = useFetchAdminData();

    const statusColor = {
        Pending: "bg-yellow-500/10 text-yellow-400",
        Shipped: "bg-blue-500/10 text-blue-400",
        Delivered: "bg-green-500/10 text-green-400",
        Cancelled: "bg-red-500/10 text-red-400",
    };

    if (isPending) return <Loading />;
    if (isError) return <Error error={error} />;

    return (
        <div className="flex flex-col gap-6">
            {/* Page Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                Orders
            </h1>

            {/* Table Wrapper */}
            <div className="bg-background-card rounded-md shadow-lg overflow-x-auto border border-gray-200">
                <table className="w-full min-w-[600px] text-left text-text-secondary">
                    {/* Table Head */}
                    <thead className="bg-background-dark text-text-muted text-sm uppercase">
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
                        {data?.payload?.orders.map((order) => (
                            <tr
                                key={order.orderId}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="p-4 font-medium text-text-primary">
                                    {order.orderId}
                                </td>
                                <td className="p-4">{order.customer}</td>
                                <td className="p-4 font-semibold text-text-primary">
                                    ${order.total?.toFixed(2)}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[order.status]
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-brand-primary hover:underline">
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
