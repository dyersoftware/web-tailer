import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../modules/auth/services/auth.services";
import { navigate_paths } from "../routes/paths-navigation.routes";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logout();
      // Redirect to login page after successful logout
      navigate(navigate_paths.auth.login, { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    logout: handleLogout,
    loading,
    error,
    clearError: () => setError(null),
  };
};
