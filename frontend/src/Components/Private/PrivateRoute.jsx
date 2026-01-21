
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../../helpers/getAccessToken";

const PrivateRoute = () => {
    const accesstoken = getAccessToken("accessToken");
    return accesstoken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
