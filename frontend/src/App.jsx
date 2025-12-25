import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminCategories from "./Components/admin/AdminCategories";
import AdminOrders from "./Components/admin/AdminOrders";
import AdminProducts from "./Components/admin/AdminProducts";
import AdminSettings from "./Components/admin/AdminSettings";
import AdminUsers from "./Components/admin/AdminUsers";
import CardDetails from "./Components/CardDetails/CardDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import LoginForm from "./Components/Login/LoginForm";
import AdminRoute from "./Components/Private/AdminRoute";
import PrivateRoute from "./Components/Private/PrivateRoute";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SignupForm from "./Components/signup/SignupForm";
import SingleCategory from "./Components/SingleCategory/SingleCategory";
import AdminLayout from "./layout/AdminLayout";
import MainLayout from "./layout/MainLayout";
import store from "./redux/store";

import AdminDashboard from "./Components/admin/AdminDashboard";
import Cart from "./screens/Cart";
import Contact from "./screens/Contact";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* USER PRIVATE */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cardDetails/:id" element={<CardDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/category/:id" element={<SingleCategory />} />
            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
