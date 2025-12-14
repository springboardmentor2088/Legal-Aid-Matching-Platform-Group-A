// CitizenDashboard.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../Redux/authSlice.js";
import CitizenSidebar from "./CitizenSidebar.jsx";
import CitizenOverview from "./CitizenOverview.jsx";
import CitizenAddCase from "./CitizenAddCase.jsx";
import CitizenMyCases from "./CitizenMyCases.jsx";
import CitizenFindLawyer from "./CitizenFindLawyer.jsx";
import CitizenMessages from "./CitizenMessages.jsx";
import CitizenProfile from "./CitizenProfile.jsx";
import CitizenSettings from "./CitizenSettings.jsx";

export default function CitizenDashboard() {
  const dispatch = useDispatch();
  const { profile: reduxProfile, isAuthenticated } = useSelector((state) => state.auth);
  
  const [activePage, setActivePage] = useState("overview"); // overview | cases | find | messages | profile | settings
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device width is 500px or less
  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 500);
      // On mobile, close sidebar by default
      if (width <= 500) {
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

  // Sample data
  const [cases] = useState([
    {
      id: 1,
      title: "Land dispute with neighbor",
      status: "Open",
      summary: "Dispute over boundary after construction.",
      date: "2025-10-01",
    },
  ]);

  const [lawyers] = useState([
    {
      id: 1,
      name: "Adv. Ramesh Sharma",
      expertise: "Property, Civil",
      location: "Pune",
      contact: "ramesh@example.com",
    },
  ]);

  // Messages state
  const [selectedRecipient, setSelectedRecipient] = useState({
    type: "lawyer",
    id: 1,
    name: lawyers[0].name,
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      to: lawyers[0].name,
      from: "Sachin",
      text: "Hello, I want to discuss my case.",
      time: "2025-11-01 10:00",
    },
  ]);
  const [messageText, setMessageText] = useState("");

  // Profile state (editable)
  const [profile, setProfile] = useState({
    shortName: reduxProfile?.shortName || reduxProfile?.fullName || "",
    fullName: reduxProfile?.fullName || "",
    role: reduxProfile?.role || "CITIZEN",
    aadhaar: reduxProfile?.aadhaar || "",
    email: reduxProfile?.email || "",
    mobile: reduxProfile?.mobile || "",
    dob: reduxProfile?.dob || "",
    state: reduxProfile?.state || "",
    district: reduxProfile?.district || "",
    city: reduxProfile?.city || "",
    address: reduxProfile?.address || "",
    password: "",
    photo: null, // file object
    photoUrl: reduxProfile?.photoUrl || null, // preview URL
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Update profile from Redux when it changes (e.g., after login)
  useEffect(() => {
    if (reduxProfile && (reduxProfile.email || reduxProfile.fullName)) {
      setProfile((prev) => ({
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

  // Settings
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    shareProfile: false,
  });

  // Handlers
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      to: selectedRecipient.name,
      from: profile.shortName,
      text: messageText.trim(),
      time: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setMessages((m) => [...m, newMsg]);
    setMessageText("");
  };

  return (
    <div
      className={`flex min-h-screen relative ${
        settings.darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <CitizenSidebar
        profile={profile}
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isMobile={isMobile}
      />

      <main className="flex-1 p-4 md:p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
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
            {activePage === "overview"
              ? "Overview"
              : activePage === "cases"
              ? "My Cases"
              : activePage === "find"
              ? "Find Lawyers"
              : activePage === "messages"
              ? "Messages"
              : activePage === "profile"
              ? "My Profile"
              : activePage === "addcase"
              ? "Add Your Case"
              : "Settings"}
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm opacity-80 hidden sm:block">{profile.shortName || profile.fullName || "User"}</div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.shortName || profile.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 font-semibold">
                  {profile.shortName?.charAt(0) || profile.fullName?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>
        </div>

        <section className="space-y-6">
          {activePage === "overview" && <CitizenOverview />}
          {activePage === "addcase" && <CitizenAddCase />}
          {activePage === "cases" && <CitizenMyCases cases={cases} />}
          {activePage === "find" && (
            <CitizenFindLawyer
              lawyers={lawyers}
              setActivePage={setActivePage}
              setSelectedRecipient={setSelectedRecipient}
            />
          )}
          {activePage === "messages" && (
            <CitizenMessages
              lawyers={lawyers}
              selectedRecipient={selectedRecipient}
              setSelectedRecipient={setSelectedRecipient}
              messages={messages}
              messageText={messageText}
              setMessageText={setMessageText}
              handleSendMessage={handleSendMessage}
              profile={profile}
            />
          )}
          {activePage === "profile" && (
            <CitizenProfile
              profile={profile}
              setProfile={setProfile}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
            />
          )}
          {activePage === "settings" && (
            <CitizenSettings settings={settings} setSettings={setSettings} />
          )}
        </section>
      </main>
    </div>
  );
}
