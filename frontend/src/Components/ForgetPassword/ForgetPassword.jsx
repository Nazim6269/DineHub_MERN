import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KeyRound } from "lucide-react";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    // Handle input change
    const handleChange = (value) => setEmail(value);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3333/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
            setEmail("");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-16 transition-colors duration-500">
            <div className="w-full max-w-md bg-white border border-border-thin rounded-2xl shadow-xl p-8 sm:p-10 space-y-8 transform transition-all hover:shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                        <KeyRound size={24} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                        Forgot Password?
                    </h2>
                    <p className="text-text-sub text-sm">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="relative group">
                            <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleChange(e.target.value)}
                                placeholder="name@example.com"
                                required
                                className="w-full rounded-xl border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary text-sm sm:text-base shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40"
                    >
                        Send Reset Link
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-strong"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-text-dim font-medium">Remembered?</span>
                        </div>
                    </div>

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

export default ForgetPassword;
