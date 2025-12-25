const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      {/* Animated 404 */}
      <h1 className="text-8xl font-extrabold text-red-500 animate-bounce mb-6">
        404
      </h1>

      {/* Message */}
      <p className="text-2xl text-gray-300 mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button */}
      <a
        href="/admin/dashboard"
        className="px-6 py-3 primaryBtnUi text-white rounded-lg shadow hover:primaryTextHoverColor transition"
      >
        Go Back to Dashboard
      </a>

      {/* Optional Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
        alt="not found illustration"
        className="w-48 mt-10 animate-pulse"
      />
    </div>
  );
};

export default NotFound;
