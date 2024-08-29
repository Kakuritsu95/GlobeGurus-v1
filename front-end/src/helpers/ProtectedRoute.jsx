import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../../constants/Routes";
import { getUserId } from "../redux/slices/userSlice";

function ProtectedRoute() {
  const userId = useSelector(getUserId);
  if (!userId) return <Navigate to={`/${APP_ROUTES.LOGIN}`} />;
  return <Outlet />;
}

export default ProtectedRoute;
