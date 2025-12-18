import React, { useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";

export default function AdminCases() {
  const [cases] = useState([
    {
      id: 1,
      caseNumber: "CASE-001",
      title: "Land Dispute Case",
      citizen: "John Doe",
      status: "SUBMITTED",
      submittedAt: "2025-12-10",
    },
    {
      id: 2,
      caseNumber: "CASE-002",
      title: "Property Rights Issue",
      citizen: "Jane Smith",
      status: "IN_PROGRESS",
      submittedAt: "2025-12-08",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = cases.filter(
    (c) =>
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-700";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Cases</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#AAAAAA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B227A]"
            />
          </div>
        </div>

        {filteredCases.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No cases found</p>
        ) : (
          <div className="space-y-3">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className="border border-[#AAAAAA] rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-600">
                        {c.caseNumber}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          c.status
                        )}`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{c.title}</h3>
                    <p className="text-sm text-gray-600">Citizen: {c.citizen}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted: {c.submittedAt}
                    </p>
                  </div>
                  <button
                    className="p-2 bg-[#4B227A] text-white rounded-lg hover:bg-[#3a1a5f] transition cursor-pointer"
                    title="View Details"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
