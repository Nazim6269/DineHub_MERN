import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessTokenCookie } from "../../helpers/setAccessToken";
import { profileInLocalStorage } from "../../helpers/setLocalStorage";
import { setProfileInfo } from "../../redux/actions/actionsCreator";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (v) => setValue((prev) => ({ ...prev, ...v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3333/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
            });
            const data = await res.json();

            if (!data.success) {
                toast(data.message);
                setValue({ name: "", email: "", password: "" });
            } else {
                setAccessTokenCookie("accessToken", data.payload, 30);
                dispatch(setProfileInfo(value));
                profileInLocalStorage(value);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 py-12 sm:py-16">
            <div className="w-full max-w-md sm:max-w-lg rounded-md bg-background-card p-6 sm:p-8 shadow-lg text-white">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-(--color-primary-cyan) mb-6">
                    Create Your Account
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            value={value.name}
                            onChange={(e) => handleChange({ name: e.target.value })}
                            placeholder="Enter your name"
                            required
                            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={value.email}
                            onChange={(e) => handleChange({ email: e.target.value })}
                            placeholder="name@example.com"
                            required
                            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={value.password}
                            onChange={(e) => handleChange({ password: e.target.value })}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-(--color-accent-cyan) text-white py-2 font-semibold hover:opacity-90 transition"
                    >
                        {loading ? "Signing Up..." : "Sign Up Now"}
                    </button>

                    {/* Login Link */}
                    <Link
                        to="/login"
                        className="inline-block w-full mt-2 text-center rounded-lg border border-(--color-primary-cyan) text-(--color-primary-cyan) py-2 font-semibold hover:bg-(--color-primary-cyan) hover:text-white transition"
                    >
                        Already Have an Account? Login
                    </Link>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={4000} />
        </div>
    );
};

export default SignupForm;
