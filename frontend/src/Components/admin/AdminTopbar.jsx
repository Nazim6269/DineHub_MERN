import { Bell, Home, Menu, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const AdminTopbar = ({ setSidebarOpen }) => {
    return (
        <header
            className="
 bg-background-card
 text-text-secondary
 border-b border-[rgba(255,255,255,0.08)]
 "
        >
            <div className="flex items-center justify-between p-4">
                {/* Left */}
                <div className="flex items-center">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mr-4 lg:hidden text-text-secondary
 hover:text-(--color-accent-cyan) transition"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search
                            className="
 absolute left-3 top-1/2 -translate-y-1/2
 text-text-muted
 w-5 h-5
 "
                        />
                        <input
                            type="text"
                            placeholder="Search orders, menu items..."
                            className="
 w-full pl-10 pr-4 py-2.5
 bg-background-card
 text-text-primary
 border border-[rgba(255,255,255,0.1)]
 rounded-lg
 focus:outline-none
 focus:ring-2 focus:ring-(--color-accent-cyan)
 placeholder:text-text-muted
 "
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-3">
                    <button
                        className="
 p-2 rounded-lg
 text-text-secondary
 hover:bg-[rgba(255,255,255,0.05)]
 hover:text-(--color-accent-cyan)
 transition
 "
                    >
                        <Link to={"/"}>
                            <Home className="w-6 h-6" />
                        </Link>
                    </button>

                    <button
                        className="
 p-2 rounded-lg
 text-text-secondary
 hover:bg-[rgba(255,255,255,0.05)]
 hover:text-(--color-accent-cyan)
 transition
 "
                    >
                        <MessageCircle className="w-6 h-6" />
                    </button>

                    <button
                        className="
 relative p-2 rounded-lg
 text-text-secondary
 hover:bg-[rgba(255,255,255,0.05)]
 hover:text-(--color-accent-cyan)
 transition
 "
                    >
                        <Bell className="w-6 h-6" />
                        <span
                            className="
 absolute top-1.5 right-1.5
 w-2 h-2
 bg-(--color-accent-cyan)
 rounded-full
 "
                        />
                    </button>

                    {/* Profile */}
                    <div className="flex items-center ml-4 cursor-pointer">
                        <div
                            className="
 w-10 h-10
 bg-(--color-accent-cyan)
 rounded-full
 flex items-center justify-center
 text-background-dark
 font-bold
 "
                        >
                            A
                        </div>

                        <div className="ml-3 hidden md:block">
                            <div className="text-sm font-semibold text-text-primary">
                                Admin
                            </div>
                            <div className="text-xs text-text-muted">Restaurant Manager</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
