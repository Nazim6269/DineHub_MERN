import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessTokenCookie } from "../../helpers/setAccessToken";
import { profileInLocalStorage } from "../../helpers/setLocalStorage";
import { setProfileInfo } from "../../redux/actions/actionsCreator";

//==========sign up component starts from here==========//
const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  // These methods will update the state properties.
  const updateForm = (value) => {
    return setValue((prev) => {
      return { ...prev, ...value };
    });
  };

  //handle submit functioin
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = { ...value };

    try {
      const res = await fetch("http://localhost:3333/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
      const data = await res.json();

      if (!data.success) {
        toast(data.message);
        setValue({ name: "", email: "", password: "" });
      } else {
        setAccessTokenCookie("accessToken", data.payload, 30);
        dispatch(setProfileInfo(newPerson));
        profileInLocalStorage(newPerson);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-pink-600 mb-6">
          Signup
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={value.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={value.email}
              onChange={(e) => updateForm({ email: e.target.value })}
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
              name="password"
              value={value.password}
              onChange={(e) => updateForm({ password: e.target.value })}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <button
            className="w-full rounded-lg bg-pink-600 px-4 py-2 text-white font-semibold shadow-sm transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            type="submit"
          >
            Sign up
          </button>

          <Link
            to="/login"
            className="inline-block w-full rounded-lg bg-pink-600 px-4 py-2 text-center text-white font-semibold shadow-sm transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            Login
          </Link>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

export default SignupForm;
