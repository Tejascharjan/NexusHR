import { useAppSelector } from "@/state/store";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
  const { user, isLoggedIn, loading } = useAppSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  if (!jwt && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
