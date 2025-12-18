import React, { useState } from "react";
import { FiCheck, FiX, FiUser, FiFileText } from "react-icons/fi";

export default function AdminUserVerifications() {
  const [verifications] = useState([
    {
      id: 1,
      type: "Lawyer",
      name: "Adv. Ramesh Kumar",
      email: "ramesh@example.com",
      submittedAt: "2025-12-15",
      documents: ["Aadhar Proof", "Bar Certificate"],
    },
    {
      id: 2,
      type: "NGO",
      name: "Legal Aid Foundation",
      email: "contact@legalaid.org",
      submittedAt: "2025-12-14",
      documents: ["Registration Certificate"],
    },
  ]);

  const handleApprove = (id) => {
    console.log("Approve:", id);
    // TODO: Implement approval logic
  };

  const handleReject = (id) => {
    console.log("Reject:", id);
    // TODO: Implement rejection logic
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>

        {verifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending verifications</p>
        ) : (
          <div className="space-y-4">
            {verifications.map((item) => (
              <div
                key={item.id}
                className="border border-[#AAAAAA] rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-[#FDB415]/20 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-[#4B227A]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{item.name}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted: {item.submittedAt}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <FiFileText className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {item.documents.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition cursor-pointer"
                      title="Approve"
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition cursor-pointer"
                      title="Reject"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
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
