
import { Link } from "react-router-dom";

const PaymentFailed = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-app-bg px-4 text-center">
            <div className="w-24 h-24 bg-status-error/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-status-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h1 className="text-3xl font-black text-text-main mb-2 uppercase tracking-tight">Payment Failed</h1>
            <p className="text-text-sub font-bold mb-8 max-w-md">
                Something went wrong with your transaction. Please try again.
            </p>
            <Link to="/cart" className="bg-brand-primary text-text-on-brand px-8 py-3 rounded-md font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">
                Try Again
            </Link>
        </div>
    );
};

export default PaymentFailed;
