import { useState } from "react";

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        siteName: "DineHub",
        adminEmail: "admin@mail.com",
        password: "",
    });

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Settings saved successfully!");
    };

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                Settings
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-background-card p-6 rounded-md shadow-lg max-w-lg w-full"
            >
                {/* Site Name */}
                <div className="mb-4 flex flex-col gap-2">
                    <label className="text-text-muted">Site Name</label>
                    <input
                        type="text"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-background-dark text-text-primary border border-gray-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan)"
                    />
                </div>

                {/* Admin Email */}
                <div className="mb-4 flex flex-col gap-2">
                    <label className="text-text-muted">Admin Email</label>
                    <input
                        type="email"
                        name="adminEmail"
                        value={settings.adminEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-background-dark text-text-primary border border-gray-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan)"
                    />
                </div>

                {/* Password */}
                <div className="mb-6 flex flex-col gap-2">
                    <label className="text-text-muted">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={settings.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-background-dark text-text-primary border border-gray-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan)"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-(--color-accent-cyan) hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default AdminSettings;
