import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Loader from "../../components/ui/Loader";

const PublicRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
