import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  const navigate = useNavigate(); // ✅ for redirect
  const [activeTab, setActiveTab] = useState("lawyers");

  const handleLogout = () => {
    // ✅ logout function
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login", {
      state: { success: "Logged out successfully!" },
    });
  };
  // Lawyer & NGO sample data — in real project, fetch from backend
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      experience: "6 Years",
      specialization: "Criminal Law",
      barId: "BCI123456",
      location: "Mumbai",
    },
    {
      id: 2,
      name: "Amit Verma",
      email: "amit@example.com",
      phone: "9988776655",
      experience: "3 Years",
      specialization: "Property Law",
      barId: "BCI789123",
      location: "Delhi",
    },
  ]);

  const [ngos, setNgos] = useState([
    {
      id: 1,
      name: "Helping Hands Foundation",
      email: "help@example.com",
      registrationId: "NGO-23456",
      domain: "Women Safety",
      location: "Pune",
    },
    {
      id: 2,
      name: "Hope Trust",
      email: "hope@trust.org",
      registrationId: "NGO-78910",
      domain: "Child Rights",
      location: "Bangalore",
    },
  ]);

  // Approve / Reject actions
  const handleApprove = (name) => {
    alert(`Automatic Email Sent: ${name}'s Application Approved ✔`);
  };

  const handleReject = (name) => {
    alert(`Automatic Email Sent: ${name}'s Application Rejected ❌`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-72 bg-white shadow-lg border-r p-6">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="w-12 h-12 rounded-md object-cover"
          />
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>

        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("lawyers")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "lawyers"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Lawyer Verification
          </button>

          <button
            onClick={() => setActiveTab("ngos")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "ngos"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            NGO Verification
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "logs"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Audit Logs
          </button>

          <button
            onClick={() => setActiveTab("system")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "system"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            System Controls
          </button>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1">
        {/* NAVBAR (same as citizen) */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="data:image/png;base64,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"
              alt="logo"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <h1 className="text-sm text-gray-500">Legal Aid Platform</h1>
              <h2 className="text-xl font-bold text-gray-800 -mt-1">
                Admin Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center font-semibold">
              A
            </div>
            <span className="font-medium text-gray-700">Admin</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* MAIN BODY */}
        <div className="p-8">
          {/* STATS SECTION */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow p-6 rounded-xl border">
              <h3 className="text-gray-600 font-medium">Total Cases</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">342</p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl border">
              <h3 className="text-gray-600 font-medium">Total Lawyers</h3>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {lawyers.length}
              </p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl border">
              <h3 className="text-gray-600 font-medium">Total NGOs</h3>
              <p className="text-4xl font-bold text-purple-600 mt-2">
                {ngos.length}
              </p>
            </div>
          </div>

          {/* ===== LAWYER VERIFICATION ===== */}
          {activeTab === "lawyers" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Lawyer Verification</h2>

              {lawyers.map((l) => (
                <div
                  key={l.id}
                  className="bg-white rounded-xl shadow p-6 mb-6 border"
                >
                  <h3 className="text-xl font-bold text-gray-800">{l.name}</h3>
                  <p className="text-gray-600">{l.email}</p>

                  {/* FULL INFO */}
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <p>
                      <strong>Phone:</strong> {l.phone}
                    </p>
                    <p>
                      <strong>Experience:</strong> {l.experience}
                    </p>
                    <p>
                      <strong>Specialization:</strong> {l.specialization}
                    </p>
                    <p>
                      <strong>Bar Council ID:</strong> {l.barId}
                    </p>
                    <p>
                      <strong>Location:</strong> {l.location}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleApprove(l.name)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(l.name)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== NGO VERIFICATION ===== */}
          {activeTab === "ngos" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">NGO Verification</h2>

              {ngos.map((n) => (
                <div
                  key={n.id}
                  className="bg-white rounded-xl shadow p-6 mb-6 border"
                >
                  <h3 className="text-xl font-bold text-gray-800">{n.name}</h3>
                  <p className="text-gray-600">{n.email}</p>

                  {/* FULL INFO */}
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <p>
                      <strong>Registration ID:</strong> {n.registrationId}
                    </p>
                    <p>
                      <strong>Domain:</strong> {n.domain}
                    </p>
                    <p>
                      <strong>Location:</strong> {n.location}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleApprove(n.name)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(n.name)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== AUDIT LOGS ===== */}
          {activeTab === "logs" && (
            <div className="bg-white p-6 rounded-xl shadow border">
              <p className="text-gray-600">Audit logs will appear here.</p>
            </div>
          )}

          {/* ===== SYSTEM CONTROLS ===== */}
          {activeTab === "system" && (
            <div className="bg-white p-6 rounded-xl shadow border space-y-4">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Generate System Report
              </button>
              <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Backup Database
              </button>
              <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Emergency Shutdown
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
