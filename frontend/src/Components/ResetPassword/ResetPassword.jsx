import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
            toast(data.message);
            setNewPass("");
            setConfirmPass("");
        } catch (error) {
            console.error(error);
            toast("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bgDarkGray flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md sm:max-w-lg rounded-md bg-background-card p-6 sm:p-8 shadow-lg text-white">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-(--color-primary-cyan) mb-6">
                    Reset Your Password
                </h2>

                <form className="space-y-4" onSubmit={handleSend}>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-(--color-accent-cyan) py-2 text-white font-semibold shadow-sm hover:opacity-90 transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={4000} />
        </div>
    );
};

export default ResetPassword;
