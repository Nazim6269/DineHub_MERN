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

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({ email: "", password: "" });

  const handleChange = (v) => setValue((prev) => ({ ...prev, ...v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3333/login", {
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
        toast(data.message);
      }
      setValue({ email: "", password: "" });
    } catch (error) {
      console.error(error);
      toast("Login failed");
    }
  };

  const handleGoogleSuccess = async (googleData) => {
    const userInfo = jwtDecode(googleData.credential);
    const { name, email, sub: googleId, picture } = userInfo;
    const createUser = { name, email, googleId, picture };

    try {
      const res = await fetch("http://localhost:3333/google-login", {
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
      toast("Google login failed");
    }
  };

  const handleGoogleError = (error) => console.error(error);

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md sm:max-w-lg rounded-xl bg-background-card p-6 sm:p-8 shadow-lg text-white">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-(--color-primary-cyan) mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">
              Email address
            </label>
            <input
              type="email"
              value={value.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              placeholder="name@example.com"
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
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
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--color-accent-cyan) focus:border-[var(--color-accent-cyan)]"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-(--color-accent-cyan) text-white py-2 font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          {/* Forget Password */}
          <div className="text-center font-semibold underline text-(--color-primary-cyan) text-sm sm:text-base">
            <Link to="/forget-password">Forget Password?</Link>
          </div>

          {/* Signup */}
          <Link
            to="/signup"
            className="inline-block w-full mt-2 text-center rounded-lg border border-(--color-primary-cyan) text-(--color-primary-cyan) py-2 font-semibold hover:bg-(--color-primary-cyan) hover:text-white transition"
          >
            Create New Account
          </Link>
        </form>

        {/* Google login */}
        <div className="mt-6 flex justify-center">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default LoginForm;
