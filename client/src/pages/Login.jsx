import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    role: "customer", // customer or artisan
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send login credentials with selected role
      const loginData = {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
        role: formData.role, // Send selected role for validation
      };

      const result = await login(loginData);
      if (result.success) {
        // Redirect based on actual user role from server response
        if (result.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (result.user.role === "artisan") {
          navigate("/artisan/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%238B4513" fill-opacity="1"%3E%3Cpath d="M0 0h40v40H0V0zm40 40h40v40H40V40z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brown-700 to-brown-800 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z"
                  fill="white"
                  stroke="#D2691E"
                  strokeWidth="2"
                />
                <circle cx="20" cy="20" r="6" fill="#D2691E" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brown-900">
            Welcome Back
          </h2>
          <p className="mt-3 text-brown-600 text-base">
            Sign in to continue to Artisan Connect
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-brown-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-brown-900 mb-3">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "customer" })}
                  className={`group p-4 border rounded-lg transition-all ${
                    formData.role === "customer"
                      ? "border-brown-600 bg-brown-50 shadow-md"
                      : "border-brown-200/50 hover:border-brown-400 hover:shadow-sm"
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div className="font-bold text-brown-900 text-sm">
                    Customer
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "artisan" })}
                  className={`group p-4 border rounded-lg transition-all ${
                    formData.role === "artisan"
                      ? "border-brown-600 bg-brown-50 shadow-md"
                      : "border-brown-200/50 hover:border-brown-400 hover:shadow-sm"
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <div className="font-bold text-brown-900 text-sm">
                    Artisan
                  </div>
                </button>
              </div>
              <p className="mt-3 text-xs text-brown-500 text-center">
                Admin users will be redirected automatically
              </p>
            </div>

            <div>
              <label
                htmlFor="emailOrUsername"
                className="block text-sm font-semibold text-brown-900 mb-2"
              >
                Email or Username
              </label>
              <input
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                required
                value={formData.emailOrUsername}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-brown-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent transition-all"
                placeholder="Enter your email or username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-brown-900 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-brown-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-brown-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-brown-600 hover:text-brown-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-brown-700 to-brown-800 text-white py-3.5 px-4 rounded-lg font-semibold text-base transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-brown-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-brown-700 hover:text-brown-900 transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
