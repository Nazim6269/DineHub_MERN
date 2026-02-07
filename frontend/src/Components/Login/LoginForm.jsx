import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessTokenCookie } from "../../helpers/setAccessToken";
import { profileInLocalStorage } from "../../helpers/setLocalStorage";
import { setProfileInfo } from "../../redux/actions/actionsCreator";
import { LogIn, Mail } from "lucide-react";
import OtpInput from "../OtpInput/OtpInput";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("form"); // "form" | "otp-email" | "otp"
    const [otpEmail, setOtpEmail] = useState("");

    const handleChange = (v) => setValue((prev) => ({ ...prev, ...v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
            });
            const data = await res.json();
            if (data.success) {
                setAccessTokenCookie("accessToken", data.payload.accessToken, 30);
                dispatch(setProfileInfo(data.payload.user));
                profileInLocalStorage(data.payload.user);
                navigate("/");
            } else {
                toast.error(data.message);
            }
            setValue({ email: "", password: "" });
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpLoginRequest = async (e) => {
        e.preventDefault();
        if (!otpEmail) {
            toast.error("Please enter your email");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/login-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: otpEmail }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("OTP sent to your email!");
                setStep("otp");
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

    const handleVerifyLoginOtp = async (otpString) => {
        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/verify-login-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: otpEmail, otp: otpString }),
            });
            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
            } else {
                setAccessTokenCookie("accessToken", data.payload.accessToken, 30);
                dispatch(setProfileInfo(data.payload.user));
                profileInLocalStorage(data.payload.user);
                toast.success("Logged in successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (googleData) => {
        const userInfo = jwtDecode(googleData.credential);
        const { name, email, sub: googleId, picture } = userInfo;
        const createUser = { name, email, googleId, picture };

        try {
            const res = await fetch(`${SERVER_URL}/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createUser),
            });
            const userData = await res.json();

            dispatch(setProfileInfo(createUser));
            profileInLocalStorage(createUser);
            setAccessTokenCookie("accessToken", userData.payload, 300);
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Google login failed");
        }
    };

    const handleGoogleError = (error) => console.error(error);

    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-12 sm:py-16 transition-colors duration-500">
            <div className="w-full max-w-md bg-white border border-border-thin rounded-md shadow-xl p-8 sm:p-10 space-y-8 transform transition-all hover:shadow-2xl">
                {step === "form" && (
                    <>
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                                <LogIn size={24} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-text-sub text-sm">
                                Please sign in to your account
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
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="text-sm">
                                    <Link to="/forget-password" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                                        Forgot Password?
                                    </Link>
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
                                        Signing In...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border-strong"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-text-dim font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep("otp-email")}
                                    className="w-full flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main font-medium hover:bg-white hover:border-brand-primary hover:text-brand-primary transition-all"
                                >
                                    <Mail size={18} />
                                    Login with OTP
                                </button>

                                <div className="flex justify-center w-full">
                                    <GoogleOAuthProvider clientId={clientId}>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={handleGoogleError}
                                            theme="filled_blue"
                                            shape="circle"
                                            width="100%"
                                        />
                                    </GoogleOAuthProvider>
                                </div>

                                <div className="text-center text-sm text-text-sub">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                                    >
                                        Create an account
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </>
                )}

                {step === "otp-email" && (
                    <>
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                                <Mail size={24} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                                Login with OTP
                            </h2>
                            <p className="text-text-sub text-sm">
                                We'll send a verification code to your email
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleOtpLoginRequest}>
                            <div className="relative group">
                                <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={otpEmail}
                                    onChange={(e) => setOtpEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                    className="w-full rounded-md border border-border-strong bg-surface-bg px-4 py-3 text-text-main placeholder-text-dim focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary text-sm sm:text-base shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40 flex items-center justify-center"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Sending OTP...
                                    </span>
                                ) : (
                                    "Send OTP"
                                )}
                            </button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => { setStep("form"); setOtpEmail(""); }}
                                    className="font-bold text-text-dim hover:text-text-main transition-colors text-sm"
                                >
                                    Back to Password Login
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {step === "otp" && (
                    <OtpInput
                        email={otpEmail}
                        onVerify={handleVerifyLoginOtp}
                        onBack={() => setStep("otp-email")}
                        resendType="login"
                        loading={loading}
                        setLoading={setLoading}
                        title="Verify Login"
                        backLabel="Change Email"
                        verifyLabel="Login"
                        verifyingLabel="Logging in..."
                    />
                )}
            </div>

            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
};

export default LoginForm;
