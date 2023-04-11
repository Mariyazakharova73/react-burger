import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IProtectedRouteProps } from "../types/types";
import { LOGIN_PATH, MAIN_PATH } from "../utils/constants";

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}): ReactElement => {
  const user = useTypedSelector((state) => state.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: MAIN_PATH } };

    return <Navigate to={from} />;
  }
 

  if (!onlyUnAuth && !user) {
    return <Navigate to={{ pathname: LOGIN_PATH }} state={{ from: location }} />;
  }

  return children;
};
