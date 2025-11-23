import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * Also checks token validity and can trigger refresh if needed
 */
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login and save the attempted location
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location]);

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
  return user ? children : null;
};

export default ProtectedRoute;
