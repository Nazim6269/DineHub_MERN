import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/admin/AdminSidebar";
import AdminTopbar from "../Components/admin/AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <AdminTopbar />

        {/* Page content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
