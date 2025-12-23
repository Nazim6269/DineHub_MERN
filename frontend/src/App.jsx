import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetails from "./Components/CardDetails/CardDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import LoginForm from "./Components/Login/LoginForm";
import PrivateRoute from "./Components/Private/PrivateRoute";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SignupForm from "./Components/signup/SignupForm";
import store from "./redux/store";
import Cart from "./screens/Cart";
import Contact from "./screens/Contact";
import Home from "./screens/Home";
import SingleCategory from "./Components/SingleCategory/SingleCategory";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* private routes are here */}
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/cardDetails/:id" exact element={<CardDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:id" element={<SingleCategory />} />
          </Route>
          {/* public routes are here */}
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignupForm />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="*" exact element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
