import { useQuery } from "@tanstack/react-query";
import { serverUrl } from "../../../secret";
import AdminStatCart from "./AdminStatCart";
import AdminTable from "./AdminTable";

const fetchAdminDashboardData = async () => {
  // Get token from cookie
  const token = document.cookie.split(`; ${"accessToken"}=`)[1];

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const res = await fetch(`${serverUrl}/admin/dashboard`, {
    method: "GET",
    credentials: "include",
  });

  // Check if response is ok
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }

  return res.json();
};

const AdminDashboard = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchAdminDashboardData,
  });

  const totalSales = data?.payload.orders.reduce((acc, curr) => {
    acc += curr.total;
    return acc;
  }, 0);
  const totalOrders = data?.payload.orders.length;
  const totalProducts = data?.payload.products.length;
  const totalUsers = data?.payload.users.length;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-accent-cyan) mx-auto"></div>
          <p className="mt-4 text-text-secondary">
            Loading DinHub Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-500/10 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-(--color-accent-cyan) text-white rounded hover:bg-(--color-accent-cyan)"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-text-primary p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">DinHub Admin Dashboard</h1>
        <p className="text-text-secondary">Manage your restaurant operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCart title="Total Sales" value={totalSales} icon="💰" />
        <AdminStatCart title="Orders" value={totalOrders} icon="📦" />
        <AdminStatCart title="Menu Items" value={totalProducts} icon="🍽️" />
        <AdminStatCart title="Users" value={totalUsers} icon="👥" />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Recent Orders
          </h2>
        </div>
        <AdminTable orders={data?.payload.orders} />
      </div>
    </div>
  );
};

export default AdminDashboard;
