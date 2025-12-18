import React from "react";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* WELCOME CARD */}
      <div className="bg-[#4B227A] text-white rounded-2xl p-8 shadow">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="opacity-90 mb-4">
          You have pending verifications and system updates.
        </p>
        <button className="bg-[#FDB415] text-[#4B227A] px-6 py-2 rounded-lg font-medium hover:bg-[#FDB415]/90 transition cursor-pointer">
          Review Requests
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="TOTAL USERS" value="124" />
        <StatCard title="PENDING" value="6" />
        <StatCard title="ACTIVE CASES" value="42" />
        <StatCard title="RESOLVED" value="81" />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4 text-lg">Recent Activity</h3>
        <p className="text-gray-500 text-sm">No recent admin actions.</p>
      </div>
    </div>
  );
}

/* ===== STAT CARD ===== */
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4 hover:shadow-md transition">
    <div className="w-10 h-10 bg-[#FDB415]/20 rounded-full flex items-center justify-center">
      <div className="w-6 h-6 bg-[#4B227A] rounded-full" />
    </div>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);
