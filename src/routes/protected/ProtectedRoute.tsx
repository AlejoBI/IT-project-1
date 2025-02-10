import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Loader from "../../components/ui/Loader";

const ProtectedRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
