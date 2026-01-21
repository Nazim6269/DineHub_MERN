const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
            {/* Animated 404 */}
            <h1 className="text-8xl font-extrabold text-(--color-accent-cyan) animate-bounce mb-6">
                404
            </h1>

            {/* Message */}
            <p className="text-2xl text-gray-300 mb-6 text-center">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>

            {/* Button */}
            <a
                href="/"
                className="px-6 py-3 bg-(--color-accent-cyan) text-white rounded-lg hover:opacity-90 transition font-semibold"
            >
                Go Back to Dashboard
            </a>
        </div>
    );
};

export default NotFound;
