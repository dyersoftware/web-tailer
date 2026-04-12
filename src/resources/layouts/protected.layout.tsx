import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { tokenService } from "../axios/token";
import { navigate_paths } from "../routes/paths-navigation.routes";

function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists
    if (!tokenService.isTokenValid()) {
      // Redirect to login if no token
      navigate(navigate_paths.auth.login, { replace: true });
    }
  }, [navigate]);

  // If no token, don't render anything (will redirect)
  if (!tokenService.isTokenValid()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  // If token exists, render the protected content
  return <Outlet />;
}

export default ProtectedLayout;
