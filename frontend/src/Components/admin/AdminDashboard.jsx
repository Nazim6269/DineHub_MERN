import { MoreVertical } from "lucide-react";
import { useMemo, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useFetchAdminData from "../../hooks/useFetchAdminData";
import Error from "../Error";
import Loading from "../Loading";
import AdminStatCart from "./AdminStatCart";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isPending, isError, data, error } = useFetchAdminData();

    // Calculate totals from real data
    const totalSales = data?.payload.orders.reduce((acc, curr) => {
        acc += curr.total;
        return acc;
    }, 0);
    const totalOrders = data?.payload.orders.length;
    const totalProducts = data?.payload.products.length;
    const totalUsers = data?.payload.users.length;

    // Process orders data for revenue chart
    const revenueData = useMemo(() => {
        if (!data?.payload.orders) return [];

        const last7Days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

            const dayOrders = data.payload.orders.filter((order) => {
                const orderDate = new Date(order.createdAt || order.date);
                return orderDate.toDateString() === date.toDateString();
            });

            const revenue = dayOrders.reduce(
                (sum, order) => sum + (order.total || 0),
                0
            );

            last7Days.push({
                date: dateStr,
                revenue: Math.round(revenue),
                orders: dayOrders.length,
            });
        }

        return last7Days;
    }, [data]);

    // Calculate category distribution
    const categoryData = useMemo(() => {
        if (!data?.payload.products) return [];

        const categories = {};
        data.payload.products.forEach((product) => {
            const cat = product.category || "Other";
            if (!categories[cat]) {
                categories[cat] = { count: 0, total: 0 };
            }
            categories[cat].count++;
            categories[cat].total += product.price || 0;
        });

        const colors = ["#00d9c0", "#3fe6d3", "#7ff0e3", "#baf7ef", "#e6fdf9"];

        return Object.entries(categories).map(([name, data], idx) => ({
            name,
            value: data.count,
            amount: Math.round(data.total),
            color: colors[idx % colors.length],
        }));
    }, [data]);

    // Calculate order status distribution
    const orderStatusData = useMemo(() => {
        if (!data?.payload.orders) return [];

        const statuses = {};
        data.payload.orders.forEach((order) => {
            const status = order.status || "pending";
            statuses[status] = (statuses[status] || 0) + 1;
        });

        return Object.entries(statuses).map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1),
            count,
            percentage: Math.round((count / data.payload.orders.length) * 100),
        }));
    }, [data]);

    // Get recent orders
    const recentOrders = useMemo(() => {
        if (!data?.payload.orders) return [];
        return data.payload.orders
            .sort(
                (a, b) =>
                    new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
            )
            .slice(0, 5);
    }, [data]);

    // Calculate growth rates (comparing first half vs second half of data)
    const growthRates = useMemo(() => {
        if (!data?.payload.orders || data.payload.orders.length < 2) {
            return { sales: 0, orders: 0, users: 0, products: 0 };
        }

        const midpoint = Math.floor(data.payload.orders.length / 2);
        const firstHalf = data.payload.orders.slice(0, midpoint);
        const secondHalf = data.payload.orders.slice(midpoint);

        const firstHalfTotal = firstHalf.reduce(
            (sum, o) => sum + (o.total || 0),
            0
        );
        const secondHalfTotal = secondHalf.reduce(
            (sum, o) => sum + (o.total || 0),
            0
        );

        const salesGrowth = firstHalfTotal
            ? ((secondHalfTotal - firstHalfTotal) / firstHalfTotal) * 100
            : 0;
        const ordersGrowth = firstHalf.length
            ? ((secondHalf.length - firstHalf.length) / firstHalf.length) * 100
            : 0;

        return {
            sales: Math.round(salesGrowth * 10) / 10,
            orders: Math.round(ordersGrowth * 10) / 10,
            users: 8.02,
            products: 5.4,
        };
    }, [data]);

    if (isPending) return <Loading />;
    if (isError) return <Error error={error} />;

    return (
        <div className="flex bg-background-dark">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <AdminStatCart
                            title={"Total sales"}
                            rate={growthRates.sales}
                            value={totalSales}
                            icon="Sales"
                        />
                        <AdminStatCart
                            title="Total Orders"
                            value={totalOrders}
                            rate={growthRates.orders}
                            icon="Orders"
                        />

                        <AdminStatCart
                            title="Menu Items"
                            value={totalProducts}
                            rate={growthRates.products}
                            icon="Items"
                        />

                        <AdminStatCart
                            title="Total Users"
                            value={totalUsers}
                            rate={growthRates.users}
                            icon="Users"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Revenue Analytics */}
                        <div
                            className="
 lg:col-span-2
 bg-background-card
 rounded-md
 p-6
 border border-[rgba(255,255,255,0.08)]
 "
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-primary">
                                    Revenue Analytics
                                </h3>
                                <button
                                    className="
 px-4 py-2
 bg-(--color-accent-cyan)
 text-white
 rounded-lg
 text-sm font-medium
 hover:opacity-90
 "
                                >
                                    Last 7 days
                                </button>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center mb-4 space-x-6">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-(--color-accent-cyan) rounded-full mr-2" />
                                    <span className="text-sm text-text-secondary">Revenue</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 border-2 border-(--color-primary-blue) rounded-full mr-2" />
                                    <span className="text-sm text-text-secondary">Orders</span>
                                </div>
                            </div>

                            {/* Chart */}
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={revenueData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="rgba(255,255,255,0.08)"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="date"
                                        stroke="var(--color-text-muted)"
                                        style={{ fontSize: "12px" }}
                                    />
                                    <YAxis
                                        stroke="var(--color-text-muted)"
                                        style={{ fontSize: "12px" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--color-background-card)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="var(--color-accent-cyan)"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="var(--color-primary-blue)"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={{ r: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 text-center">
                                <span className="text-text-secondary text-sm mr-2">
                                    Latest Revenue
                                </span>
                                <span className="text-2xl font-bold text-text-primary">
                                    $
                                    {revenueData[
                                        revenueData.length - 1
                                    ]?.revenue.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>

                        {/* Category Distribution */}
                        <div
                            className="
 bg-background-card
 rounded-md
 p-6
 border border-[rgba(255,255,255,0.08)]
 "
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-text-primary">
                                    Menu Categories
                                </h3>
                                <button
                                    className="
 text-text-muted
 hover:text-(--color-accent-cyan)
 "
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Donut */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative w-40 h-40">
                                    <svg className="w-full h-full -rotate-90">
                                        {categoryData.map((cat, idx) => {
                                            const total = categoryData.reduce(
                                                (s, c) => s + c.value,
                                                0
                                            );
                                            const offset = categoryData
                                                .slice(0, idx)
                                                .reduce((s, c) => s + c.value, 0);
                                            const percentage = (cat.value / total) * 100;

                                            return (
                                                <circle
                                                    key={idx}
                                                    cx="80"
                                                    cy="80"
                                                    r="60"
                                                    stroke={cat.color}
                                                    strokeWidth="20"
                                                    fill="none"
                                                    strokeDasharray={`${377 * (percentage / 100)} 377`}
                                                    strokeDashoffset={-377 * (offset / total)}
                                                />
                                            );
                                        })}
                                    </svg>

                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <div className="text-xs text-text-muted">Total</div>
                                        <div className="text-lg font-bold text-text-primary">
                                            {totalProducts}
                                        </div>
                                        <div className="text-xs text-text-muted">items</div>
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="space-y-2">
                                {categoryData.slice(0, 4).map((cat, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div
                                                className="w-3 h-3 rounded-full mr-2"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                            <span className="text-sm text-text-secondary">
                                                {cat.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-text-primary">
                                            {cat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Order Status */}
                        <div
                            className="
 bg-background-card
 rounded-md
 p-6
 border border-[rgba(255,255,255,0.08)]
 "
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-primary">
                                    Order Status
                                </h3>
                                <button
                                    className="
 text-text-muted
 hover:text-(--color-accent-cyan)
 "
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {orderStatusData.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-text-secondary">
                                                {item.status}
                                            </span>
                                            <span className="text-sm font-bold text-text-primary">
                                                {item.count} ({item.percentage}%)
                                            </span>
                                        </div>

                                        <div className="w-full bg-[rgba(0,217,192,0.15)] rounded-full h-2">
                                            <div
                                                className="bg-(--color-accent-cyan) h-2 rounded-full transition-all"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div
                            className="
 bg-background-card
 rounded-md
 p-6
 border border-[rgba(255,255,255,0.08)]
 "
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-primary">
                                    Recent Orders
                                </h3>
                                <button
                                    className="
 text-sm font-medium
 text-(--color-accent-cyan)
 hover:opacity-80
 "
                                >
                                    View All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((order, idx) => (
                                    <div
                                        key={idx}
                                        className="
 flex items-center justify-between
 p-4
 bg-[rgba(0,217,192,0.08)]
 hover:bg-[rgba(0,217,192,0.14)]
 rounded-md
 transition-colors
 "
                                    >
                                        {/* Left */}
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className="
 w-10 h-10
 bg-(--color-accent-cyan)
 rounded-lg
 flex items-center justify-center
 text-black
 font-bold
 "
                                            >
                                                {idx + 1}
                                            </div>

                                            <div>
                                                <div className="text-sm font-semibold text-text-primary">
                                                    Order #{order._id?.slice(-6) || order.id}
                                                </div>
                                                <div className="text-xs text-text-muted">
                                                    {order.user?.name || "Customer"} •{" "}
                                                    {new Date(
                                                        order.createdAt || order.date
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-text-primary">
                                                ${order.total?.toFixed(2) || 0}
                                            </div>

                                            {/* Status = availability */}
                                            <div
                                                className={`text-xs px-2 py-1 rounded-full inline-block ${order.status === "completed"
                                                    ? "bg-[rgba(0,217,192,0.25)] text-(--color-accent-cyan)"
                                                    : order.status === "processing"
                                                        ? "bg-[rgba(0,217,192,0.15)] text-(--color-accent-cyan)"
                                                        : order.status === "shipped"
                                                            ? "bg-[rgba(0,217,192,0.1)] text-text-secondary"
                                                            : "bg-[rgba(0,217,192,0.05)] text-text-muted"
                                                    }`}
                                            >
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminDashboard;
