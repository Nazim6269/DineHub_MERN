import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    // Handle input change
    const handleChange = (value) => setEmail(value);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3333/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            setEmail("");
            const data = await response.json();
            toast(data.message);
        } catch (error) {
            console.error(error);
            toast("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md sm:max-w-xl rounded-md bg-white p-6 sm:p-8 shadow-md">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-pink-600 mb-6">
                    Enter Your E-mail
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="name@example.com"
                            required
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-pink-600 px-4 py-2 text-white font-semibold shadow-sm text-sm sm:text-base transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    >
                        Send
                    </button>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={4000} />
        </div>
    );
};

export default ForgetPassword;
