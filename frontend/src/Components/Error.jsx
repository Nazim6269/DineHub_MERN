const Error = ({ error }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center bg-red-500/10 border border-red-500 rounded-lg p-6">
                <h2 className="text-xl font-bold text-red-600 mb-2">
                    Error Loading Dashboard
                </h2>
                <p className="text-gray-700 mb-4">{error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-secondary"
                >
                    Retry
                </button>
            </div>
        </div>
    );
};

export default Error;
