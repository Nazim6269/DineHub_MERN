
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-app-bg px-4 text-center">
            <div className="w-24 h-24 bg-status-success/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <svg className="w-12 h-12 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-3xl font-black text-text-main mb-2 uppercase tracking-tight">Payment Successful!</h1>
            <p className="text-text-sub font-bold mb-8 max-w-md">
                Thank you for your order. We are processing it and will update you shortly.
            </p>
            <div className="flex gap-4">
                <Link to="/" className="bg-brand-primary text-text-on-brand px-8 py-3 rounded-md font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">
                    Continue Shopping
                </Link>
                <Link to="/profile" className="bg-card-bg text-text-main border border-border-strong px-8 py-3 rounded-md font-black uppercase tracking-widest hover:bg-border-thin transition-all">
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
