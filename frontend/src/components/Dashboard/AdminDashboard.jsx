import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#f3f6f5]">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-[#0b5a63] text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-white/20">
          JURIFY
        </div>

        <div className="p-4 border-b border-white/20">
          <p className="font-semibold">Admin User</p>
          <p className="text-sm opacity-80">Administrator</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            "Overview",
            "User Verifications",
            "Cases",
            "Lawyers",
            "NGOs",
            "Settings",
          ].map((item) => (
            <div
              key={item}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                item === "Overview"
                  ? "bg-white text-[#0b5a63] font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>

        {/* WELCOME CARD */}
        <div className="bg-[#0b5a63] text-white rounded-2xl p-8 mb-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="opacity-90 mb-4">
            You have pending verifications and system updates.
          </p>
          <button className="bg-white text-[#0b5a63] px-6 py-2 rounded-lg font-medium">
            Review Requests
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatCard title="TOTAL USERS" value="124" />
          <StatCard title="PENDING" value="6" />
          <StatCard title="ACTIVE CASES" value="42" />
          <StatCard title="RESOLVED" value="81" />
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-500 text-sm">No recent admin actions.</p>
        </div>
      </main>
    </div>
  );
}

/* ===== STAT CARD ===== */
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
    <div className="w-10 h-10 bg-[#e6f3f3] rounded-full" />
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
