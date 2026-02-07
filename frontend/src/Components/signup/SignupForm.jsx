import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessTokenCookie } from "../../helpers/setAccessToken";
import { profileInLocalStorage } from "../../helpers/setLocalStorage";
import { setProfileInfo } from "../../redux/actions/actionsCreator";
import { UserPlus } from "lucide-react";
import OtpInput from "../OtpInput/OtpInput";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("form"); // "form" | "otp"

    const handleChange = (v) => setValue((prev) => ({ ...prev, ...v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
            });
            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
            } else {
                toast.success("OTP sent to your email!");
                setStep("otp");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (otpString) => {
        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/verify-signup-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: value.email, otp: otpString }),
            });
            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
            } else {
                setAccessTokenCookie("accessToken", data.payload.accessToken, 30);
                dispatch(setProfileInfo(data.payload.user));
                profileInLocalStorage(data.payload.user);
                toast.success("Account verified!");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-12 sm:py-16 transition-colors duration-500">
            <div className="w-full max-w-md bg-white border border-border-thin rounded-md shadow-xl p-8 sm:p-10 space-y-8 transform transition-all hover:shadow-2xl">
                {step === "form" ? (
                    <>
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                                <UserPlus size={24} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                                Create Account
                            </h2>
                            <p className="text-text-sub text-sm">
                                Join us and start your journey today
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div className="relative group">
                                    <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={value.name}
                                        onChange={(e) => handleChange({ name: e.target.value })}
                                        placeholder="Enter your name"
                                        required
                                        className="w-full rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={value.email}
                                        onChange={(e) => handleChange({ email: e.target.value })}
                                        placeholder="name@example.com"
                                        required
                                        className="w-full rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={value.password}
                                        onChange={(e) => handleChange({ password: e.target.value })}
                                        placeholder="Create a password"
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
                                        Creating Account...
                                    </span>
                                ) : (
                                    "Sign Up Now"
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border-strong"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-text-dim font-medium">Already have an account?</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                                >
                                    Log In Here
                                </Link>
                            </div>
                        </form>
                    </>
                ) : (
                    <OtpInput
                        email={value.email}
                        onVerify={handleVerifyOtp}
                        onBack={() => setStep("form")}
                        resendType="signup"
                        loading={loading}
                        setLoading={setLoading}
                        title="Verify Email"
                        backLabel="Back to Sign Up"
                        verifyLabel="Verify & Continue"
                    />
                )}
            </div>

            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
};

export default SignupForm;
