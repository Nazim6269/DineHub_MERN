const AdminTable = ({ orders }) => {
 const getStatusIcon = (status) => {
 switch (status) {
 case "Pending":
 return "⏳";
 case "Preparing":
 return "👨‍🍳";
 case "Out for Delivery":
 return "🚗";
 case "Delivered":
 return "✅";
 case "Cancelled":
 return "❌";
 default:
 return "📋";
 }
 };

 if (!orders || orders.length === 0) {
 return (
 <div className="p-8 text-center text-text-secondary">
 <p className="text-lg">No orders found</p>
 <p className="text-sm mt-2">
 Orders will appear here once customers place them
 </p>
 </div>
 );
 }

 return (
 <div className="overflow-x-auto">
 <table className="w-full text-left text-text-secondary min-w-175">
 {/* Table Head */}
 <thead className="bg-background-dark text-text-muted text-sm uppercase">
 <tr>
 <th className="p-4">Order ID</th>
 <th className="p-4">Customer</th>
 <th className="p-4">Items</th>
 <th className="p-4">Status</th>
 <th className="p-4">Total</th>
 <th className="p-4">Date</th>
 </tr>
 </thead>

 {/* Table Body */}
 <tbody>
 {orders.map((order, i) => (
 <tr
 key={order.id || i}
 className="border-t border-white/20 hover:bg-background-dark transition-colors"
 >
 {/* order id column */}
 <td className="p-4 font-medium text-text-primary">
 {order?.orderId}
 </td>

 {/* customer column */}
 <td className="p-4">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
 {order.customer.charAt(0).toUpperCase()}
 </div>
 <span>{order.customer}</span>
 </div>
 </td>

 {/* items column */}
 <td className="p-4">
 <span className="text-text-secondary">
 {order.items.length}{" "}
 {order.items.length === 1 ? "item" : "items"}
 </span>
 </td>

 {/* status column */}
 <td className="p-4">
 <span
 className={`px-3 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1 ${getStatusIcon(
 order.status
 )}`}
 >
 <span>{getStatusIcon(order.status)}</span>
 <span>{order.status}</span>
 </span>
 </td>
 {/* total comumn */}
 <td className="p-4 font-semibold text-text-primary">
 {order?.total}
 </td>

 {/* date column */}
 <td className="p-4 text-sm">
 {new Date(order?.createdAt).toLocaleDateString("en-IN", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
};

export default AdminTable;
