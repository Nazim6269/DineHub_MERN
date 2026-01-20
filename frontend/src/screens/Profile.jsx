import { BadgeCheck, Calendar, Mail, Package, User as UserIcon } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { profile } = useSelector((state) => state.profileReducer);

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-background-dark text-text-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="relative mb-8">
                    <div className="h-48 w-full rounded-3xl bg-linear-to-r from-(--color-primary-cyan)/20 via-(--color-primary-blue)/20 to-purple-500/20 border border-white/10" />
                    <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                        <div className="relative">
                            <img
                                src={profile.picture || "https://avatar.iran.liara.run/public"}
                                alt={profile.name}
                                className="w-32 h-32 rounded-3xl border-4 border-background-dark object-cover shadow-2xl"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-(--color-accent-cyan) text-black p-1.5 rounded-xl border-4 border-background-dark">
                                <BadgeCheck size={20} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <h1 className="text-3xl font-bold">{profile.name}</h1>
                            <p className="text-text-secondary flex items-center gap-2">
                                <span className="capitalize">{profile.role || "User"}</span>
                                <span>•</span>
                                Joined {new Date().toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Info Side */}
                    <div className="space-y-6">
                        <div className="bg-background-card rounded-2xl p-6 border border-white/10">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <UserIcon size={20} className="text-(--color-accent-cyan)" />
                                Personal Info
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-text-muted uppercase font-bold">Email</label>
                                    <p className="text-sm flex items-center gap-2 mt-1">
                                        <Mail size={14} className="text-text-muted" />
                                        {profile.email}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs text-text-muted uppercase font-bold">Account Status</label>
                                    <p className="text-sm flex items-center gap-2 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        Active
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background-card rounded-2xl p-6 border border-white/10">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-(--color-primary-blue)" />
                                Recent Activity
                            </h2>
                            <p className="text-xs text-text-muted">No recent activity found.</p>
                        </div>
                    </div>

                    {/* Orders/Details Side */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-background-card rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <Package size={24} className="text-purple-400" />
                                    Order History
                                </h2>
                                <button className="text-sm font-medium text-(--color-accent-cyan) hover:underline">
                                    View All
                                </button>
                            </div>

                            {/* Placeholder for no orders */}
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <Package size={32} className="text-text-muted" />
                                </div>
                                <h3 className="text-lg font-bold">No orders yet</h3>
                                <p className="text-text-secondary text-sm max-w-xs">
                                    Looks like you haven't ordered anything from DineHub yet. Start exploring our menu!
                                </p>
                                <button className="mt-6 px-8 py-3 rounded-xl bg-(--color-accent-cyan) text-black font-bold hover:shadow-[0_0_20px_rgba(0,217,192,0.3)] transition-all">
                                    Browse Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
