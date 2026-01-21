import {
    Layers,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Categories", path: "/admin/categories", icon: Layers },
    { name: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
    return (
        <aside className=" w-64 bg-background-card text-text-primary hidden md:-flex flex-col">
            {/* Logo */}

            <div className="p-6 text-2xl font-bold border-b border-gray-200 text-(--color-accent-cyan)">
                Admin Panel
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 ">
                {menuItems.map(({ name, path, icon: Icon }) => (
                    <NavLink
                        key={name}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
 ${isActive
                                ? "bg-background-dark text-(--color-accent-cyan) font-semibold"
                                : "text-text-secondary hover:bg-background-dark hover:text-(--color-accent-cyan)"
                            }`
                        }
                    >
                        <Icon size={18} />
                        <span className="truncate">{name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
