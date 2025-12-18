import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../Redux/authSlice.js";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminOverview from "./AdminOverview.jsx";
import AdminUserVerifications from "./AdminUserVerifications.jsx";
import AdminCases from "./AdminCases.jsx";
import AdminLawyers from "./AdminLawyers.jsx";
import AdminNGOs from "./AdminNGOs.jsx";
import AdminProfile from "./AdminProfile.jsx";
import AdminSettings from "./AdminSettings.jsx";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { profile: reduxProfile, isAuthenticated } = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch profile from admin database on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (
      token &&
      isAuthenticated &&
      !reduxProfile.email &&
      !reduxProfile.fullName
    ) {
      // Only fetch if we have a token but no profile data
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, reduxProfile.email, reduxProfile.fullName]);

  // Check if device width is 700px or less
  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 700);
      // On mobile, close sidebar by default
      if (width <= 700) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Check on mount
    checkWidth();

    // Listen for resize events
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Profile state (editable)
  const [adminProfile, setAdminProfile] = useState({
    shortName: reduxProfile?.shortName || reduxProfile?.fullName || "",
    fullName: reduxProfile?.fullName || "",
    role: reduxProfile?.role || "ADMIN",
    aadhaar: reduxProfile?.aadhaar || "",
    email: reduxProfile?.email || "",
    mobile: reduxProfile?.mobile || "",
    dob: reduxProfile?.dob || "",
    state: reduxProfile?.state || "",
    district: reduxProfile?.district || "",
    city: reduxProfile?.city || "",
    address: reduxProfile?.address || "",
    password: "",
    photo: null,
    photoUrl: reduxProfile?.photoUrl || null,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Update profile from Redux when it changes (e.g., after fetching from database)
  useEffect(() => {
    if (reduxProfile && (reduxProfile.email || reduxProfile.fullName)) {
      setAdminProfile((prev) => ({
        ...prev,
        shortName: reduxProfile.shortName || reduxProfile.fullName || prev.shortName,
        fullName: reduxProfile.fullName || prev.fullName,
        role: reduxProfile.role || prev.role,
        aadhaar: reduxProfile.aadhaar || prev.aadhaar,
        email: reduxProfile.email || prev.email,
        mobile: reduxProfile.mobile || prev.mobile,
        dob: reduxProfile.dob || prev.dob,
        state: reduxProfile.state || prev.state,
        district: reduxProfile.district || prev.district,
        city: reduxProfile.city || prev.city,
        address: reduxProfile.address || prev.address,
        photoUrl: reduxProfile.photoUrl || prev.photoUrl,
      }));
    }
  }, [reduxProfile]);

  // Profile data for sidebar display (from Redux profile)
  const profile = {
    fullName: reduxProfile?.fullName || adminProfile.fullName || "Admin User",
    shortName: reduxProfile?.shortName || reduxProfile?.fullName?.split(" ")[0] || adminProfile.shortName || adminProfile.fullName?.split(" ")[0] || "Admin",
    photoUrl: reduxProfile?.photoUrl || adminProfile.photoUrl || null,
  };

  const getPageTitle = () => {
    switch (activePage) {
      case "overview":
        return "Overview";
      case "verifications":
        return "User Verifications";
      case "cases":
        return "Cases";
      case "lawyers":
        return "Lawyers";
      case "ngos":
        return "NGOs";
      case "profile":
        return "My Profile";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f7fa] relative">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        profile={profile}
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-[#BEC0C2] mr-2 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          <h1 className="text-xl md:text-2xl font-semibold flex-1">
            {getPageTitle()}
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm opacity-80 hidden sm:block">
              {profile.shortName || profile.fullName || "Admin"}
            </div>
            <div className="w-10 h-10 bg-[#BEC0C2] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#AAAAAA]">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName || "Admin"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 font-semibold">
                  {profile.shortName?.charAt(0) || profile.fullName?.charAt(0) || "A"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <section className="space-y-6">
          {activePage === "overview" && <AdminOverview />}
          {activePage === "verifications" && <AdminUserVerifications />}
          {activePage === "cases" && <AdminCases />}
          {activePage === "lawyers" && <AdminLawyers />}
          {activePage === "ngos" && <AdminNGOs />}
          {activePage === "profile" && (
            <AdminProfile
              profile={adminProfile}
              setProfile={setAdminProfile}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
            />
          )}
          {activePage === "settings" && <AdminSettings />}
        </section>
      </main>
    </div>
  );
}
