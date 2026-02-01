import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../../helpers/getAccessToken";

/**
 * AdminRoute - Protected route component for admin-only pages
 * Checks both authentication status and admin role
 */
export default function AdminRoute() {
  // Check if user has valid access token
  const accessToken = getAccessToken("accessToken");

  // Get user profile from Redux state
  const profile = useSelector((state) => state.profileReducer?.profile);

  // User must be authenticated (have access token)
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // User must have admin role
  if (!profile || profile.role !== "admin") {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is an admin - allow access
  return <Outlet />;
}
