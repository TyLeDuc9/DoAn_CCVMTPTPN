import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const PrivateAdmin = () => {
  const { user, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }

  if(user.role!=="admin"){
    return <Navigate to="/" replace/>
  }

  return <Outlet />;
};
