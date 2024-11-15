import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContexts";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: ReactNode;
}

function ProtectedRoute({ redirectPath = "/", children }: ProtectedRouteProps) {
  const { user } = useAuthContext();

  if (!user) return <Navigate to={redirectPath} replace />;

  return children || <Outlet />;
}

export default ProtectedRoute;
