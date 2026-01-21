import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock } from "lucide-react";

const ResetPassword = () => {
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const handleSend = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3333/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPass, confirmPass, id }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                setNewPass("");
                setConfirmPass("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-16 transition-colors duration-500">
            <div className="w-full max-w-md bg-white border border-border-thin rounded-2xl shadow-xl p-8 sm:p-10 space-y-8 transform transition-all hover:shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                        Reset Password
                    </h2>
                    <p className="text-text-sub text-sm">
                        Create a strong password for your account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSend}>
                    <div className="space-y-5">
                        <div className="relative group">
                            <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                placeholder="Enter new password"
                                required
                                className="w-full rounded-xl border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                            />
                        </div>

                        <div className="relative group">
                            <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                className="w-full rounded-xl border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary text-sm sm:text-base shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40"
                    >
                        Reset Password
                    </button>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>

            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
};

export default ResetPassword;
