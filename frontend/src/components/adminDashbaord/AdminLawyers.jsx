import React, { useState } from "react";
import { FiSearch, FiUser, FiMapPin, FiBriefcase } from "react-icons/fi";

export default function AdminLawyers() {
  const [lawyers] = useState([
    {
      id: 1,
      name: "Adv. Ramesh Kumar",
      email: "ramesh@example.com",
      specialization: "Property Law",
      location: "Pune, Maharashtra",
      status: "Verified",
    },
    {
      id: 2,
      name: "Adv. Priya Sharma",
      email: "priya@example.com",
      specialization: "Criminal Law",
      location: "Mumbai, Maharashtra",
      status: "Verified",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredLawyers = lawyers.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Lawyers</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search lawyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#AAAAAA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B227A]"
            />
          </div>
        </div>

        {filteredLawyers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No lawyers found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="border border-[#AAAAAA] rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FDB415]/20 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-[#4B227A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{lawyer.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{lawyer.email}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FiBriefcase className="w-4 h-4" />
                      <span>{lawyer.specialization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{lawyer.location}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {lawyer.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
