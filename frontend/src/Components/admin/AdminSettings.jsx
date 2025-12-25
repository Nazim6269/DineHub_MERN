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
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-white">Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg"
      >
        {/* Site Name */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-primaryTextColor"
          />
        </div>

        {/* Admin Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Admin Email</label>
          <input
            type="email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-primaryTextColor"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-primaryTextColor"
          />
        </div>

        <button
          type="submit"
          className="primaryBtnUi text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
