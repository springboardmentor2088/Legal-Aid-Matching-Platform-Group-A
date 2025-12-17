import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../Redux/authSlice.js";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // Get auth state from Redux
  const {
    isLoading,
    error: authError,
    user,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const successMsg = location.state?.success || null;

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CITIZEN",
  });

  const [error, setError] = useState(null);
  const loading = isLoading;

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const toastShownRef = useRef(false);

  // Display success message (e.g., logout message) in toast
  useEffect(() => {
    if (successMsg && !toastShownRef.current) {
      toast.success(successMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      toastShownRef.current = true;

      // clear state so it doesn't show again
      window.history.replaceState({}, document.title);
    }
  }, [successMsg]);

  // Validation functions
  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password || password.trim() === "") {
      return "Password is required";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      let error = "";
      if (name === "username") {
        error = validateEmail(value);
      } else if (name === "password") {
        error = validatePassword(value);
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = form[field] || "";
    let error = "";
    if (field === "username") {
      error = validateEmail(value);
    } else if (field === "password") {
      error = validatePassword(value);
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Handle successful login - navigate based on role
  useEffect(() => {
    if (isAuthenticated && user.role) {
      toast.success("Login successful!");

      setTimeout(() => {
        const userRole = user.role;
        if (userRole === "CITIZEN") {
          navigate("/citizen/dashboard", {
            state: { success: "Login successful! Welcome Citizen." },
          });
        } else if (userRole === "LAWYER") {
          navigate("/lawyer/dashboard", {
            state: { success: "Login successful! Welcome Lawyer." },
          });
        } else if (userRole === "NGO") {
          navigate("/ngo/dashboard", {
            state: { success: "Login successful! Welcome NGO Member." },
          });
        } else if (userRole === "ADMIN") {
          navigate("/admin/dashboard", {
            state: { success: "Login successful! Welcome Admin." },
          });
        } else {
          navigate("/");
        }
      }, 500);
    }
  }, [isAuthenticated, user.role, navigate]);

  // Handle auth errors from Redux
  useEffect(() => {
    if (authError) {
      toast.error(authError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(authError);
      // Clear error after displaying
      dispatch(clearError());
    }
  }, [authError, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Clear previous errors
    setError(null);
    setErrors({});
    dispatch(clearError());

    // Validate all fields
    const emailError = validateEmail(form.username);
    const passwordError = validatePassword(form.password);

    const newErrors = {};
    if (emailError) {
      newErrors.username = emailError;
    }
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    setTouched({ username: true, password: true });

    // If there are validation errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix all validation errors before submitting");
      return false; // Explicitly return false to prevent any default behavior
    }

    // Dispatch login action using Redux
    const result = await dispatch(
      loginUser({
        username: form.username,
        password: form.password,
        role: form.role,
      })
    );

    // Check if login was successful
    if (loginUser.fulfilled.match(result)) {
      // Navigation will be handled by useEffect when isAuthenticated becomes true
      return false;
    } else {
      // Error is already handled by useEffect watching authError
      return false;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[520px]">
        {/* IMAGE LEFT */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=60"
            alt="justice"
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold">Justice for Everyone</h3>
            <p className="mt-3 text-white/90">
              Connect with lawyers, NGOs, and access free legal help.
            </p>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="w-full h-full flex flex-col">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl p-8  w-full h-full flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-extrabold font-serif text-gray-900">
                Welcome Back
              </h2>

              <img
                src={logo} // or correct path to your logo
                alt="App Logo"
                className="h-15 w-auto"
              />
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 rounded px-3 py-2 bg-red-50 border border-red-100">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
              onKeyDown={(e) => {
                // Prevent form submission on Enter key if there are errors
                if (
                  e.key === "Enter" &&
                  (loading || Object.keys(errors).length > 0)
                ) {
                  e.preventDefault();
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registered Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="username"
                  value={form.username}
                  type="email"
                  onChange={handleChange}
                  onBlur={() => handleBlur("username")}
                  disabled={loading}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-1 ${
                    loading
                      ? "bg-gray-100 cursor-not-allowed opacity-60 border-gray-200"
                      : touched.username && errors.username
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
                {touched.username && errors.username && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.username}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    disabled={loading}
                    className={`w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-1 ${
                      loading
                        ? "bg-gray-100 cursor-not-allowed opacity-60 border-gray-200"
                        : touched.password && errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      // eye-off
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.99 9.99 0 012.93-7.07M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      // eye
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {touched.password && errors.password && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.password}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Login as
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3"
                >
                  <option value="CITIZEN">Citizen</option>
                  <option value="LAWYER">Lawyer</option>
                  <option value="NGO">NGO</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 text-sm hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <span>Don’t have an account?</span>
              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        {/* <p className="mt-6 text-center  width-100 text-xs text-gray-500">
          Need urgent help? Call our helpline:{" "}
          <span className="font-medium">1800-000-000</span>
        </p> */}
      </div>
    </section>
  );
}
