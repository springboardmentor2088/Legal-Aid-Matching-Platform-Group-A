import React, { useState } from "react";
import { FiSearch, FiUsers, FiMapPin, FiFileText } from "react-icons/fi";

export default function AdminNGOs() {
  const [ngos] = useState([
    {
      id: 1,
      name: "Legal Aid Foundation",
      email: "contact@legalaid.org",
      type: "Legal Aid",
      location: "Delhi, NCR",
      status: "Verified",
    },
    {
      id: 2,
      name: "Justice for All",
      email: "info@justiceforall.org",
      type: "Human Rights",
      location: "Mumbai, Maharashtra",
      status: "Verified",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredNGOs = ngos.filter(
    (n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All NGOs</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search NGOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#AAAAAA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B227A]"
            />
          </div>
        </div>

        {filteredNGOs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No NGOs found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredNGOs.map((ngo) => (
              <div
                key={ngo.id}
                className="border border-[#AAAAAA] rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FDB415]/20 rounded-full flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-[#4B227A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{ngo.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{ngo.email}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FiFileText className="w-4 h-4" />
                      <span>{ngo.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{ngo.location}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {ngo.status}
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
