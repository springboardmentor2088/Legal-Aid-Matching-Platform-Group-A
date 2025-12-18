import React, { useRef, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/authSlice.js";
import { updateProfile } from "../../api/auth.js";
import { toast } from "react-toastify";
import {
  INDIAN_STATES_AND_UT_ARRAY,
  STATES_OBJECT,
  STATE_WISE_CITIES,
} from "indian-states-cities-list";

export default function AdminProfile({
  profile,
  setProfile,
  isEditingProfile,
  setIsEditingProfile,
}) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollPositionRef = useRef(0);
  
  // State management for location dropdowns
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  // State to track validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Get auth state from Redux
  const { profile: reduxProfile, isLoading: isFetchingProfile, isAuthenticated } = useSelector((state) => state.auth);

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
    } else if (typeof districts === 'object') {
      Object.values(districts).forEach((cityList) => {
        if (Array.isArray(cityList)) {
          cityList.forEach((city) => {
            if (city.district) {
              districtsSet.add(city.district);
            } else if (city.name) {
              districtsSet.add(city.name);
            }
          });
        }
      });
    }
    
    return Array.from(districtsSet).sort().map((district) => ({
      label: district,
      value: district,
    }));
  }, [selectedState, selectedStateObj]);

  // Fetch profile data from backend on mount using Redux
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please login to view your profile");
      return;
    }

    // Only fetch if profile is empty or not loaded yet
    if (!reduxProfile.email && !reduxProfile.fullName) {
      dispatch(fetchUserProfile());
    } else if (reduxProfile.email || reduxProfile.fullName) {
      // Map Redux profile data to local profile state
      setProfile({
        shortName: reduxProfile.shortName || reduxProfile.fullName || "",
        fullName: reduxProfile.fullName || "",
        role: reduxProfile.role || "ADMIN",
        aadhaar: reduxProfile.aadhaar || "",
        email: reduxProfile.email || "",
        mobile: reduxProfile.mobile || "",
        dob: reduxProfile.dob || "",
        state: reduxProfile.state || "",
        district: reduxProfile.district || "",
        city: reduxProfile.city || "",
        address: reduxProfile.address || "",
        password: "",
        photo: null,
        photoUrl: reduxProfile.photoUrl || null,
      });
    }
  }, [dispatch, isAuthenticated, reduxProfile, setProfile]);

  // Update local profile when Redux profile changes
  useEffect(() => {
    if (reduxProfile && (reduxProfile.email || reduxProfile.fullName)) {
      setProfile({
        shortName: reduxProfile.shortName || reduxProfile.fullName || "",
        fullName: reduxProfile.fullName || "",
        role: reduxProfile.role || "ADMIN",
        aadhaar: reduxProfile.aadhaar || "",
        email: reduxProfile.email || "",
        mobile: reduxProfile.mobile || "",
        dob: reduxProfile.dob || "",
        state: reduxProfile.state || "",
        district: reduxProfile.district || "",
        city: reduxProfile.city || "",
        address: reduxProfile.address || "",
        password: "",
        photo: null,
        photoUrl: reduxProfile.photoUrl || null,
      });
      
      // Sync dropdown states
      if (reduxProfile.state) {
        setSelectedState(reduxProfile.state);
      }
      if (reduxProfile.district) {
        setSelectedDistrict(reduxProfile.district);
      }
    }
  }, [reduxProfile, setProfile]);

  // Sync dropdown states with profile state
  useEffect(() => {
    if (profile.state) {
      setSelectedState(profile.state);
    }
    if (profile.district) {
      setSelectedDistrict(profile.district);
    }
  }, [profile.state, profile.district]);

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
      return "Aadhaar number is required";
    }
    if (!/^\d{12}$/.test(aadhar.trim())) {
      return "Aadhaar must be exactly 12 digits";
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
      case "aadhaar":
        error = validateAadhar(value);
        break;
      case "mobile":
        error = validatePhone(value);
        break;
      case "dob":
        error = validateDOB(value);
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

  const handleProfileChange = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));

    // Validate the field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  // Handle blur event to mark field as touched
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = profile[field];
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Validate all fields
  const validateAll = () => {
    const newErrors = {};
    const fields = [
      "fullName",
      "aadhaar",
      "mobile",
      "dob",
      "state",
      "district",
      "city",
      "address",
    ];

    fields.forEach((field) => {
      const value = profile[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return Object.keys(newErrors).length === 0;
  };

  // Handle state change - prevent scroll
  const handleStateChange = (state) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedState(state);
    setSelectedDistrict("");
    handleProfileChange("state", state);
    handleProfileChange("district", "");
    handleProfileChange("city", "");
    
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
    handleProfileChange("district", district);
    handleProfileChange("city", "");
    
    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
    }, 0);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }
    
    // Validate file size (max 500KB)
    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 500KB");
      e.target.value = "";
      return;
    }
    
    const url = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, photo: file, photoUrl: url }));
    setErrors((prev) => ({ ...prev, photo: "" }));
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      
      // Validate all fields before submitting
      if (!validateAll()) {
        toast.error("Please fix all validation errors before saving");
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector(`[name="${firstErrorField}"]`) || 
                         document.getElementById(firstErrorField);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus();
          }
        }
        setIsLoading(false);
        return;
      }
      
      // Prepare data for backend
      const profileData = {
        fullName: profile.fullName,
        aadhaar: profile.aadhaar,
        mobile: profile.mobile,
        dob: profile.dob,
        state: profile.state,
        district: profile.district,
        city: profile.city,
        address: profile.address,
      };

      // Call backend API to update profile with photo if uploaded
      const response = await updateProfile(profileData, profile.photo);
      
      if (response.data && response.data.data) {
        const updatedData = response.data.data;
        
        // Update local profile state
        setProfile({
          shortName: updatedData.shortName || updatedData.fullName || "",
          fullName: updatedData.fullName || "",
          role: updatedData.role || "ADMIN",
          aadhaar: updatedData.aadhaar || "",
          email: updatedData.email || "",
          mobile: updatedData.mobile || "",
          dob: updatedData.dob || "",
          state: updatedData.state || "",
          district: updatedData.district || "",
          city: updatedData.city || "",
          address: updatedData.address || "",
          password: "",
          photo: null,
          photoUrl: updatedData.photoUrl || profile.photoUrl,
        });

        // Refresh Redux profile data
        dispatch(fetchUserProfile());
        
        toast.success(response.data.message || "Profile updated successfully");
        setIsEditingProfile(false);
      } else {
        toast.success("Profile updated successfully");
        setIsEditingProfile(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while fetching
  if (isFetchingProfile && !reduxProfile.email && !reduxProfile.fullName) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B227A] mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Profile
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your personal information and preferences.
          </p>
        </div>

        <div className="flex gap-2">
          {!isEditingProfile ? (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="bg-[#4B227A] hover:bg-[#3a1a5f] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 border-2 border-[#AAAAAA] hover:border-[#4B227A] rounded-lg transition-all duration-200 text-gray-700 bg-white hover:bg-[#BEC0C2]/20 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-[#BEC0C2]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-[#4B227A] to-[#3a1a5f] rounded-full overflow-hidden border-4 border-white shadow-lg">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl font-bold">
                    {profile.shortName?.charAt(0) || profile.fullName?.charAt(0) || "A"}
                  </div>
                )}
              </div>
              {isEditingProfile && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            
            {isEditingProfile && (
              <div className="w-full">
                <input
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="admin-profile-photo-upload"
                />
                <label
                  htmlFor="admin-profile-photo-upload"
                  className="block w-full text-center sm:text-left cursor-pointer bg-[#FDB415]/20 hover:bg-[#FDB415]/30 text-[#4B227A] px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Change Photo
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
                  JPG, PNG or GIF (max 500KB)
                </p>
                {errors.photo && (
                  <span className="text-red-500 text-sm mt-1 block text-center sm:text-left">{errors.photo}</span>
                )}
              </div>
            )}
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Role */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role <span className="text-gray-400">(Read-only)</span>
                </label>
                <div className="relative">
                  <input
                    value={profile.role}
                    disabled
                    className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={profile.fullName}
                  onChange={(e) =>
                    handleProfileChange("fullName", e.target.value)
                  }
                  onBlur={() => handleBlur("fullName")}
                  disabled={!isEditingProfile}
                  className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                    isEditingProfile
                      ? errors.fullName && touched.fullName
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                        : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                      : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && touched.fullName && (
                  <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
                )}
              </div>

              {/* Aadhaar Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  value={profile.aadhaar}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                    handleProfileChange("aadhaar", value);
                  }}
                  onBlur={() => handleBlur("aadhaar")}
                  disabled={!isEditingProfile}
                  maxLength={12}
                  className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                    isEditingProfile
                      ? errors.aadhaar && touched.aadhaar
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                        : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                      : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                  }`}
                  placeholder="Enter 12-digit Aadhaar"
                />
                {errors.aadhaar && touched.aadhaar && (
                  <span className="text-red-500 text-sm mt-1">{errors.aadhaar}</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span> <span className="text-gray-400">(Read-only)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profile.email}
                    disabled={true}
                    className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={profile.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      handleProfileChange("mobile", value);
                    }}
                    onBlur={() => handleBlur("mobile")}
                    disabled={!isEditingProfile}
                    maxLength={10}
                    className={`w-full p-3 pl-10 border-2 rounded-lg transition-all duration-200 ${
                      isEditingProfile
                        ? errors.mobile && touched.mobile
                          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                          : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                        : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                {errors.mobile && touched.mobile && (
                  <span className="text-red-500 text-sm mt-1">{errors.mobile}</span>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={profile.dob}
                    onChange={(e) => handleProfileChange("dob", e.target.value)}
                    onBlur={() => handleBlur("dob")}
                    disabled={!isEditingProfile}
                    max={new Date().toISOString().split("T")[0]}
                    className={`w-full p-3 pl-10 border-2 rounded-lg transition-all duration-200 ${
                      isEditingProfile
                        ? errors.dob && touched.dob
                          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                          : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                        : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                    }`}
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {errors.dob && touched.dob && (
                  <span className="text-red-500 text-sm mt-1">{errors.dob}</span>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  onBlur={() => handleBlur("state")}
                  disabled={!isEditingProfile}
                  className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                    isEditingProfile
                      ? errors.state && touched.state
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                        : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                      : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                  }`}
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  onBlur={() => handleBlur("district")}
                  disabled={!isEditingProfile || !selectedState}
                  className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                    !isEditingProfile || !selectedState
                      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                      : errors.district && touched.district
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                        : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                  }`}
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.city || ""}
                  onChange={(e) =>
                    handleProfileChange("city", e.target.value)
                  }
                  onBlur={() => handleBlur("city")}
                  disabled={!isEditingProfile}
                  className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                    isEditingProfile
                      ? errors.city && touched.city
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                        : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                      : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && touched.city && (
                  <span className="text-red-500 text-sm mt-1">{errors.city}</span>
                )}
              </div>

              {/* Residential Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Residential Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={profile.address}
                    onChange={(e) =>
                      handleProfileChange("address", e.target.value)
                    }
                    onBlur={() => handleBlur("address")}
                    disabled={!isEditingProfile}
                    rows={3}
                    className={`w-full p-3 pl-10 border-2 rounded-lg transition-all duration-200 resize-none ${
                      isEditingProfile
                        ? errors.address && touched.address
                          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900"
                          : "border-[#4B227A]/30 focus:border-[#4B227A] focus:ring-2 focus:ring-[#4B227A]/20 bg-white text-gray-900"
                        : "border-[#AAAAAA] bg-[#BEC0C2]/30 text-gray-600 cursor-not-allowed"
                    }`}
                    placeholder="Enter your complete residential address"
                  />
                  <svg
                    className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                {errors.address && touched.address && (
                  <span className="text-red-500 text-sm mt-1">{errors.address}</span>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
