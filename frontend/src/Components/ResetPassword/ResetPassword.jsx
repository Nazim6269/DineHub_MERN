import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);

    const email = location.state?.email;
    const resetToken = location.state?.resetToken;

    // Redirect if no state (user navigated directly without OTP verification)
    useEffect(() => {
        if (!email || !resetToken) {
            navigate("/forget-password", { replace: true });
        }
    }, [email, resetToken, navigate]);

    const handleSend = async (e) => {
        e.preventDefault();

        if (newPass !== confirmPass) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, resetToken, newPass, confirmPass }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Password updated successfully!");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!email || !resetToken) return null;

    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-16 transition-colors duration-500">
            <div className="w-full max-w-md bg-white border border-border-thin rounded-md shadow-xl p-8 sm:p-10 space-y-8 transform transition-all hover:shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                        Reset Password
                    </h2>
                    <p className="text-text-sub text-sm">
                        Create a strong password for <span className="font-bold text-text-main">{email}</span>
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
                                className="w-full rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
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
                                className="w-full rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary text-sm sm:text-base shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40 flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Updating...
                            </span>
                        ) : (
                            "Reset Password"
                        )}
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
