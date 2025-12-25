import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  //   const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = true;
  const role = "admin";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
