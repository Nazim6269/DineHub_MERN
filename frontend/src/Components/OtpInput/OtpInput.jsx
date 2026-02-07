import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ShieldCheck } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

const OtpInput = ({
    email,
    onVerify,
    onBack,
    resendType,
    loading,
    setLoading,
    title = "Enter OTP",
    subtitle,
    backLabel = "Go Back",
    verifyLabel = "Verify OTP",
    verifyingLabel = "Verifying...",
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [cooldown, setCooldown] = useState(60);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleOtpChange = (index, val) => {
        if (val.length > 1) val = val.slice(-1);
        if (val && !/^\d$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(""));
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP");
            return;
        }
        onVerify(otpString);
    };

    const handleResendOtp = async () => {
        if (cooldown > 0) return;
        try {
            const res = await fetch(`${SERVER_URL}/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, type: resendType }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("OTP resent!");
                setCooldown(60);
                setOtp(["", "", "", "", "", ""]);
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to resend OTP");
        }
    };

    const handleBack = () => {
        setOtp(["", "", "", "", "", ""]);
        onBack();
    };

    return (
        <>
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                    <ShieldCheck size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                    {title}
                </h2>
                <p className="text-text-sub text-sm">
                    {subtitle || (
                        <>We sent a 6-digit code to <span className="font-bold text-text-main">{email}</span></>
                    )}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className="w-12 h-14 text-center text-xl font-bold rounded-md border border-border-strong bg-surface-bg text-text-main focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary text-sm sm:text-base shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40 flex items-center justify-center"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            {verifyingLabel}
                        </span>
                    ) : (
                        verifyLabel
                    )}
                </button>

                <div className="text-center">
                    <p className="text-text-sub text-sm">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={cooldown > 0}
                            className={`font-bold transition-colors ${cooldown > 0 ? "text-text-dim cursor-not-allowed" : "text-brand-primary hover:text-brand-secondary cursor-pointer"}`}
                        >
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                        </button>
                    </p>
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="font-bold text-text-dim hover:text-text-main transition-colors text-sm"
                    >
                        {backLabel}
                    </button>
                </div>
            </form>
        </>
    );
};

export default OtpInput;
