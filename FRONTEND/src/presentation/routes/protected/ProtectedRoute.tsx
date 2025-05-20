import React from "react";
import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/common/Loader";

const rolePermissions: Record<string, string[]> = {
  "/dashboard": ["admin"],
  "/audits": ["auditor"],
  "/audit-list/:userId": ["auditor"],
  "/audit-form/:selfAssessmentId": ["auditor"],
  "/audit-user": ["standard_user"],
  "/audit-report/:selfAssessmentId": ["standard_user"],
  "/self-assessments": ["standard_user"],
  "/reports": ["standard_user"],
  "/evaluation/:regulationId": ["standard_user"],
};

const ProtectedRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/" replace />;
  }

  for (const [path, roles] of Object.entries(rolePermissions)) {
    if (matchPath({ path, end: true }, location.pathname)) {
      if (!roles.includes(user?.role || "")) {
        return <Navigate to="/" replace />;
      }
    }
  }

  return <Outlet />;
};


export default ProtectedRoute;
