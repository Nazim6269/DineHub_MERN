import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
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
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  //handle google Success function
  const handleGoogleSuccess = async (googleData) => {
    const userInfo = jwtDecode(googleData.credential);
    const { name, email, sub: googleId, picture } = userInfo;

    const createUser = {
      name,
      email,
      googleId,
      picture,
    };

    const res = await fetch("http://localhost:3333/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUser),
    });

    const userData = await res.json();

    dispatch(setProfileInfo(createUser));
    profileInLocalStorage(createUser);
    setAccessTokenCookie("accessToken", userData.payload, 30);
    navigate("/");
  };

  //handle error function
  const handleGoogleError = (error) => {
    console.log(error);
  };

  //handle change function
  const handleChange = (value) => {
    return setValue((prev) => {
      return { ...prev, ...value };
    });
  };

  //handlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const person = { ...value };

    try {
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      const data = await res.json();

      if (data.success) {
        // Function to set a value in cookie storage with an expiration time
        setAccessTokenCookie("accessToken", data.payload, 30);
        navigate("/");
      } else {
        toast(data.message);
      }
      setValue({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-pink-600 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={value.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={value.password}
              onChange={(e) => handleChange({ password: e.target.value })}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <button
            className="w-full rounded-lg bg-pink-600 px-4 py-2 text-white font-semibold shadow-sm transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            type="submit"
          >
            Login
          </button>

          <div className="text-center font-semibold underline text-pink-600">
            <Link to="/forget-password">Forget Password?</Link>
          </div>

          <Link
            to="/signup"
            className="inline-block w-full rounded-lg bg-pink-600 px-4 py-2 text-center text-white font-semibold shadow-sm transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            Create new account
          </Link>
        </form>

        <div className="mt-6 flex justify-center">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </GoogleOAuthProvider>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default LoginForm;
