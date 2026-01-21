import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../Components/admin/AdminSidebar";
import AdminTopbar from "../Components/admin/AdminTopbar";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background-dark text-text-primary">
            {/* Sidebar */}
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <AdminTopbar setSidebarOpen={setSidebarOpen} />

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto bg-background-dark">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
