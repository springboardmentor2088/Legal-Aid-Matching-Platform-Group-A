import React, { useState, useMemo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCitizen, submitRegistration } from "../../Redux/registerSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  INDIAN_STATES_AND_UT_ARRAY,
  STATES_OBJECT,
  STATE_WISE_CITIES,
} from "indian-states-cities-list";

const CitizenForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // read citizen data from redux store
  const citizen = useSelector((state) => state.register.citizen);
  const isLoading = useSelector((state) => state.register.loading);

  // State to track validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // State management for location dropdowns
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const scrollPositionRef = useRef(0);

  // Get all states
  const stateOptions = INDIAN_STATES_AND_UT_ARRAY.map((state) => ({
    label: state,
    value: state,
  }));

  // Find state object to get the key for STATE_WISE_CITIES
  const selectedStateObj = useMemo(() => {
    return STATES_OBJECT.find((state) => state.value === selectedState);
  }, [selectedState]);

  // Get districts based on selected state
  const districtOptions = useMemo(() => {
    if (!selectedState || !selectedStateObj) return [];

    const stateKey = selectedStateObj.name;
    const districts = STATE_WISE_CITIES[stateKey];

    if (!districts) return [];

    // Extract unique districts from cities data
    const districtsSet = new Set();
    if (Array.isArray(districts)) {
      districts.forEach((item) => {
        if (item.district) {
          districtsSet.add(item.district);
        } else if (item.value) {
          districtsSet.add(item.value);
        }
      });
    } else if (typeof districts === "object") {
      Object.values(districts).forEach((cityList) => {
        if (Array.isArray(cityList)) {
          cityList.forEach((city) => {
            if (city.district) {
              districtsSet.add(city.district);
            } else if (city.name) {
              // If no district, use city name as fallback
              districtsSet.add(city.name);
            }
          });
        }
      });
    }

    return Array.from(districtsSet)
      .sort()
      .map((district) => ({
        label: district,
        value: district,
      }));
  }, [selectedState, selectedStateObj]);

  // Sync Redux state with local dropdown state
  useEffect(() => {
    if (citizen.state) {
      setSelectedState(citizen.state);
    }
    if (citizen.district) {
      setSelectedDistrict(citizen.district);
    }
  }, [citizen.state, citizen.district]);

  // Handle state change - prevent scroll
  const handleStateChange = (state) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedState(state);
    setSelectedDistrict("");
    dispatch(updateCitizen({ field: "state", value: state }));
    dispatch(updateCitizen({ field: "district", value: "" }));
    dispatch(updateCitizen({ field: "city", value: "" }));

    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
    }, 0);
  };

  // Handle district change - prevent scroll
  const handleDistrictChange = (district) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedDistrict(district);
    dispatch(updateCitizen({ field: "district", value: district }));
    dispatch(updateCitizen({ field: "city", value: "" }));

    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
    }, 0);
  };

  // Validation functions
  const validateFullName = (name) => {
    if (!name || name.trim() === "") {
      return "Full Name is required";
    }
    if (name.trim().length < 2) {
      return "Full Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Full Name should only contain letters and spaces";
    }
    return "";
  };

  const validateAadhar = (aadhar) => {
    if (!aadhar || aadhar.trim() === "") {
      return "Aadhar number is required";
    }
    if (!/^\d{12}$/.test(aadhar.trim())) {
      return "Aadhar must be exactly 12 digits";
    }
    return "";
  };

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

  const validatePhone = (phone) => {
    if (!phone || phone.trim() === "") {
      return "Phone number is required";
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateDOB = (dob) => {
    if (!dob) {
      return "Date of Birth is required";
    }
    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      return "Date of Birth cannot be in the future";
    }
    const age = today.getFullYear() - selectedDate.getFullYear();
    if (age < 18) {
      return "You must be at least 18 years old";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password || password.trim() === "") {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters ";
    }
    if (password.length > 21) {
      return "Password must be at most 21 characters";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword || confirmPassword.trim() === "") {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateState = (state) => {
    if (!state || state.trim() === "") {
      return "State is required";
    }
    return "";
  };

  const validateDistrict = (district) => {
    if (!district || district.trim() === "") {
      return "District is required";
    }
    return "";
  };

  const validateCity = (city) => {
    if (!city || city.trim() === "") {
      return "City is required";
    }
    return "";
  };

  const validateAddress = (address) => {
    if (!address || address.trim() === "") {
      return "Address is required";
    }
    if (address.trim().length < 10) {
      return "Address must be at least 10 characters";
    }
    return "";
  };

  // Validate a single field
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "aadhar":
        error = validateAadhar(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "dob":
        error = validateDOB(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value, citizen.password);
        break;
      case "state":
        error = validateState(value);
        break;
      case "district":
        error = validateDistrict(value);
        break;
      case "city":
        error = validateCity(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      default:
        break;
    }
    return error;
  };

  // update a field in redux store and validate
  const handleChange = (field, value) => {
    dispatch(updateCitizen({ field, value }));

    // Validate the field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));

      // Special case: if password changes, re-validate confirmPassword
      if (field === "password" && touched.confirmPassword) {
        const confirmError = validateConfirmPassword(
          citizen.confirmPassword,
          value
        );
        setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
      }
    }
  };

  // Handle blur event to mark field as touched
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = citizen[field];
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Validate all fields
  const validateAll = () => {
    const newErrors = {};
    const fields = [
      "fullName",
      "aadhar",
      "email",
      "phone",
      "dob",
      "state",
      "district",
      "city",
      "address",
      "password",
      "confirmPassword",
    ];

    fields.forEach((field) => {
      const value = citizen[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validateAll()) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }

    // Send to backend through thunk
    const result = await dispatch(
      submitRegistration({ role: "Citizen", data: citizen })
    );

    if (submitRegistration.fulfilled.match(result)) {
      // Extract success message from backend response
      const successMessage =
        result.payload?.message ||
        result.payload?.data?.message ||
        "Registration successful! Redirecting to login...";
      toast.success(successMessage);

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      // Extract error message from backend response
      const errorPayload = result.payload;
      let errorMessage = "Registration failed";

      if (errorPayload) {
        if (typeof errorPayload === "string") {
          errorMessage = errorPayload;
        } else if (errorPayload.message) {
          errorMessage = errorPayload.message;
        } else if (errorPayload.error) {
          errorMessage = errorPayload.error;
        } else if (errorPayload.data?.message) {
          errorMessage = errorPayload.data.message;
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={citizen.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.fullName && touched.fullName
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.fullName && touched.fullName && (
            <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
          )}
        </div>

        {/* Aadhar */}
        <div className="flex flex-col">
          <label
            htmlFor="aadhar"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Aadhar Number <span className="text-red-500">*</span>
          </label>
          <input
            id="aadhar"
            type="text"
            placeholder="Enter 12-digit Aadhar number"
            value={citizen.aadhar || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 12);
              handleChange("aadhar", value);
            }}
            onBlur={() => handleBlur("aadhar")}
            maxLength={12}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.aadhar && touched.aadhar
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.aadhar && touched.aadhar && (
            <span className="text-red-500 text-sm mt-1">{errors.aadhar}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={citizen.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.email && touched.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={citizen.phone || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              handleChange("phone", value);
            }}
            onBlur={() => handleBlur("phone")}
            maxLength={10}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.phone && touched.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.phone && touched.phone && (
            <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label
            htmlFor="dob"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            id="dob"
            type="date"
            value={citizen.dob || ""}
            onChange={(e) => handleChange("dob", e.target.value)}
            onBlur={() => handleBlur("dob")}
            max={new Date().toISOString().split("T")[0]}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.dob && touched.dob
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.dob && touched.dob && (
            <span className="text-red-500 text-sm mt-1">{errors.dob}</span>
          )}
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label
            htmlFor="state"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            onBlur={() => handleBlur("state")}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.state && touched.state
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          >
            <option value="">Select State</option>
            {stateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.state && touched.state && (
            <span className="text-red-500 text-sm mt-1">{errors.state}</span>
          )}
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label
            htmlFor="district"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            District <span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            onBlur={() => handleBlur("district")}
            disabled={isLoading || !selectedState}
            className={`border p-2 rounded ${
              isLoading || !selectedState
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.district && touched.district
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          >
            <option value="">Select District</option>
            {districtOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.district && touched.district && (
            <span className="text-red-500 text-sm mt-1">{errors.district}</span>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label
            htmlFor="city"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            City <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter your city"
            value={citizen.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.city && touched.city
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.city && touched.city && (
            <span className="text-red-500 text-sm mt-1">{errors.city}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            placeholder="Enter your complete address"
            value={citizen.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            disabled={isLoading}
            rows={3}
            className={`border p-2 rounded resize-none ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.address && touched.address
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.address && touched.address && (
            <span className="text-red-500 text-sm mt-1">{errors.address}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={citizen.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            maxLength={20}
            disabled={isLoading}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.password && touched.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.password && touched.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={citizen.confirmPassword || ""}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            disabled={isLoading}
            maxLength={20}
            className={`border p-2 rounded ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : errors.confirmPassword && touched.confirmPassword
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-md text-lg transition-all flex items-center justify-center gap-2 ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        } text-white`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
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
            <span>Creating Account...</span>
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default CitizenForm;
