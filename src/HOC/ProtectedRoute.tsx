import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const ProtectedRoute = ({ onlyUnAuth = false, children }: any) => {
  const user = useTypedSelector((state) => state.user.user);

  if (onlyUnAuth && user) {
    return <Navigate to="/" />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
