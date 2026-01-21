import useFetchAdminData from "../../hooks/useFetchAdminData";
import Error from "../Error";
import Loading from "../Loading";

const AdminUsers = () => {
    const { data, isPending, isError, error } = useFetchAdminData();

    if (isPending) return <Loading />;
    if (isError) return <Error error={error} />;

    return (
        <div className="flex flex-col gap-6">
            {/* Page Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                Users
            </h1>

            {/* Table */}
            <div className="bg-background-card rounded-md shadow-lg overflow-x-auto border border-white/20">
                <table className="w-full min-w-150 text-left text-text-secondary">
                    {/* Table Head */}
                    <thead className="bg-background-dark text-text-muted text-sm uppercase">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {data?.payload?.users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-t border-white/20 hover:bg-background-dark transition"
                            >
                                <td className="p-4 font-medium text-text-primary">
                                    {user.name}
                                </td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${user.role === "admin"
                                                ? "bg-purple-500/10 text-purple-400"
                                                : "bg-gray-700/10 text-gray-400"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-right flex flex-wrap gap-2 justify-end">
                                    {user.role !== "admin" && (
                                        <button className="text-(--color-accent-cyan) hover:underline">
                                            Make Admin
                                        </button>
                                    )}
                                    <button className="text-red-400 hover:underline">
                                        Block
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

export default AdminUsers;
