import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIsAuthenticatedQuery } from "../pages/auth/authApi";

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * Also checks token validity and can trigger refresh if needed
 */
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authResponse = useIsAuthenticatedQuery();
  const { isLoading, data: isAuthenticated, isFetching } = authResponse;

  useEffect(() => {
    console.log("ProtectedRoute authResponse:", authResponse);
    if (!isFetching && !isAuthenticated) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
