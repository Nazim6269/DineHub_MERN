import { Bell, Eye, EyeOff, Lock, Moon, Shield, User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Settings = () => {
    const { profile } = useSelector((state) => state.profileReducer);
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        orders: true,
        promos: false,
        security: true
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        toast.info("Settings update feature coming soon!");
    };

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-background-dark text-text-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Shield size={32} className="text-(--color-accent-cyan)" />
                    Account Settings
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="space-y-2">
                        {[
                            { id: 'general', icon: User, label: 'General' },
                            { id: 'security', icon: Lock, label: 'Security' },
                            { id: 'notifications', icon: Bell, label: 'Notifications' },
                            { id: 'appearance', icon: Moon, label: 'Appearance' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${tab.id === 'general'
                                    ? 'bg-(--color-accent-cyan)/10 text-(--color-accent-cyan) border border-(--color-accent-cyan)/20'
                                    : 'text-text-secondary hover:bg-white/5'
                                    }`}
                            >
                                <tab.icon size={20} />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* General Settings */}
                        <div className="bg-background-card rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                            <form className="space-y-4" onSubmit={handleUpdate}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={profile.name}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 outline-none focus:border-(--color-accent-cyan)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={profile.email}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 outline-none opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-(--color-accent-cyan) text-black font-bold px-6 py-2.5 rounded-md hover:shadow-[0_0_15px_rgba(0,217,192,0.3)] transition-all"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>

                        {/* Password/Security */}
                        <div className="bg-background-card rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Security</h2>
                            <div className="space-y-4">
                                <div className="relative">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Change Password</label>
                                    <div className="relative mt-2">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 outline-none focus:border-(--color-accent-cyan) pr-12"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold text-purple-400 hover:underline">
                                    Enable Two-Factor Authentication (2FA)
                                </button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-background-card rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Notifications</h2>
                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <div>
                                            <h3 className="font-medium capitalize">{key} Notifications</h3>
                                            <p className="text-xs text-text-muted">Receive alerts for {key} updates.</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, [key]: !value })}
                                            className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-(--color-accent-cyan)' : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? 'right-1' : 'left-1'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Settings;
