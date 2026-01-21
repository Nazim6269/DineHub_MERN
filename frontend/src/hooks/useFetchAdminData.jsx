import { useQuery } from "@tanstack/react-query";
import { serverUrl } from "../../secret.js";

const fetchAdminDashboardData = async () => {
 // Get token from cookie
 const token = document.cookie.split(`; ${"accessToken"}=`)[1];

 if (!token) {
 throw new Error("No authentication token found. Please log in.");
 }

 const res = await fetch(`${serverUrl}/admin/dashboard`, {
 method: "GET",
 credentials: "include",
 });

 // Check if response is ok
 if (!res.ok) {
 const errorData = await res.json();
 throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
 }

 return res.json();
};

const useFetchAdminData = () => {
 const { isPending, isError, data, error } = useQuery({
 queryKey: ["admin-dashboard"],
 queryFn: fetchAdminDashboardData,
 });
 return { isPending, isError, data, error };
};

export default useFetchAdminData;
