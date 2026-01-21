import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const AdminStatCart = ({ title, value, rate, icon }) => {
    const getIcon = (status) => {
        switch (status) {
            case "Sales":
                return <DollarSign className="w-6 h-6 text-background-dark" />;
            case "Orders":
                return <ShoppingCart className="w-6 h-6 text-background-dark" />;
            case "Items":
                return <Package className="w-6 h-6 text-background-dark" />;
            case "Users":
                return <Users className="w-6 h-6 text-background-dark" />;

            default:
                return "";
        }
    };

    return (
        <div
            className="
 bg-background-card
 shadow-lg
 rounded-md
 p-6
 border border-[rgba(255,255,255,0.08)]
 "
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-text-secondary text-sm mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-text-primary">
                        ${value?.toLocaleString() || 0}
                    </h3>
                </div>

                <div
                    className="
 p-3
 bg-(--color-accent-cyan)
 rounded-md
 shadow-[0_0_0_1px_rgba(0,217,192,0.35)]
 "
                >
                    {getIcon(icon)}
                </div>
            </div>

            <div className="flex items-center text-sm">
                <span
                    className={`font-semibold ${rate >= 0 ? "text-(--color-accent-cyan)" : "text-red-500"
                        }`}
                >
                    {rate >= 0 ? "+" : ""}
                    {rate}%
                </span>

                <span className="text-text-muted ml-2">vs previous period</span>
            </div>
        </div>
    );
};
export default AdminStatCart;
