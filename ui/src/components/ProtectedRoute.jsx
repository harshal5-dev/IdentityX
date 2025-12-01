import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIsAuthenticatedQuery } from "../pages/auth/authApi";

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * Uses Outlet to render child routes
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Optional: Check authentication with API
  const { data: authData, isLoading } = useIsAuthenticatedQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated && !authData) {
    console.log(
      "User not authenticated, redirecting to login",
      authData,
      isAuthenticated
    );
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;
