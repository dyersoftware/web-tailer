import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pathsNavigation } from "../../../resources/routes/paths-navigation.routes";
import { login } from "../services/auth.services";
import { tokenService } from "../../../resources/axios/token";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Check for valid token on component mount
  useEffect(() => {
    if (tokenService.isTokenValid()) {
      navigate(pathsNavigation.dashboard, { replace: true });
    }
  }, [navigate]);

  // Auto-hide success message
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const validateFields = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      await login({ email: email.trim(), password });
      setShowSuccess(true);

      // Navigate after a brief delay to show success feedback
      setTimeout(() => {
        navigate(pathsNavigation.dashboard, { replace: true });
      }, 500);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message || "Login failed. Please try again."
          : "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Success Toast */}
      {showSuccess && (
        <div className="toast toast-top toast-center z-50 mb-4">
          <div className="alert alert-success shadow-lg">
            <span className="text-white">
              ✓ Login successful! Redirecting...
            </span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error shadow-md mb-6" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-8l2 2m0 0l2 2m-2-2l-2-2m2 2l2-2"
            />
          </svg>
          <div>
            <h3 className="font-bold">Login Failed</h3>
            <div className="text-sm">{error}</div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() => setError("")}
            aria-label="Close error alert"
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email Address</span>
          </label>
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="email"
              type="email"
              className={`input input-bordered w-full pl-10 ${
                fieldErrors.email ? "input-error" : ""
              }`}
              placeholder="name@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (fieldErrors.email)
                  setFieldErrors({ ...fieldErrors, email: undefined });
              }}
              disabled={loading}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
          </div>
          {fieldErrors.email && (
            <label className="label">
              <span className="label-text-alt text-error" id="email-error">
                {fieldErrors.email}
              </span>
            </label>
          )}
        </div>

        {/* Password Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type="password"
              className={`input input-bordered w-full pl-10 ${
                fieldErrors.password ? "input-error" : ""
              }`}
              placeholder="••••••••"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (fieldErrors.password)
                  setFieldErrors({ ...fieldErrors, password: undefined });
              }}
              disabled={loading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
            />
          </div>
          {fieldErrors.password && (
            <label className="label">
              <span className="label-text-alt text-error" id="password-error">
                {fieldErrors.password}
              </span>
            </label>
          )}
        </div>

        {/* Forgot Password Link */}
        {/* <div className="flex justify-end">
          <a
            href="#"
            className="label-text-alt link link-hover text-primary font-medium"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </a>
        </div> */}

        {/* Login Button */}
        <button
          type="submit"
          className="btn btn-primary w-full font-semibold"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="divider my-4">OR</div>

        {/* Google Sign-In */}
        {/* <button
          type="button"
          className="btn btn-outline w-full font-semibold gap-2"
        >
          <BiLogoGoogle className="h-5 w-5" />
          Sign in with Google
        </button> */}

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-sm">Don't have an account? </span>
          <a
            href="/register"
            className="link link-primary font-semibold text-sm"
          >
            Sign up here
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
