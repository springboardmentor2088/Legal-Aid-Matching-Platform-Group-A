import React, { useState } from "react";

export default function CitizenMyCases({ cases = [] }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const caseList = [
    {
      id: 1,
      title: "Land Encroachment Issue",
      victimName: "Ramesh Patil",
      relation: "Father",
      urgency: "High",
      victimGender: "Male",
      victimAge: 58,
      category: "Property",
      location: "Pune",
      description: "Neighbour has illegally occupied a portion of our land...",
      status: "Open",
      submittedDate: "12 Sep 2025",
    },
  ];

  return (
    <div className="p-6 bg-[#f3f6f5] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#234f4a]">
        My Submitted Cases
      </h2>

      {cases.length === 0 ? (
        <div className="text-gray-600">No cases found.</div>
      ) : (
        caseList.map((c) => (
          <div
            key={c.id}
            className="bg-white p-5 rounded-xl shadow mb-4 border
                       hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              {/* LEFT INFO */}
              <div>
                <h3 className="font-semibold text-lg text-[#234f4a]">
                  {c.title}
                </h3>

                <p className="text-sm text-gray-700 mt-1">
                  <b>Victim:</b> {c.victimName}
                </p>

                <p className="text-sm text-gray-700">
                  <b>Urgency:</b> {c.urgency}
                </p>

                <p className="text-sm text-gray-700">
                  <b>Gender:</b> {c.victimGender} | <b>Age:</b> {c.victimAge}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Submitted on: {c.submittedDate}
                </p>
              </div>

              {/* RIGHT ACTION */}
              <div className="text-right">
                <span className="block text-sm font-medium mb-3 text-[#234f4a]">
                  {c.status}
                </span>

                <button
                  onClick={() => setSelectedCase(c)}
                  className="text-sm bg-[#234f4a] text-white
                             px-4 py-1.5 rounded
                             hover:bg-[#1b3f3b] transition"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* VIEW MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-6 text-[#234f4a]">
              Case Details
            </h3>

            <Detail label="Case Title" value={selectedCase.title} />
            <Detail label="Victim Name" value={selectedCase.victimName} />
            <Detail
              label="Relation with Victim"
              value={selectedCase.relation}
            />
            <Detail label="Urgency Level" value={selectedCase.urgency} />
            <Detail label="Victim Gender" value={selectedCase.victimGender} />
            <Detail label="Victim Age" value={selectedCase.victimAge} />
            <Detail label="Location" value={selectedCase.location} />
            <Detail label="Case Category" value={selectedCase.category} />
            <Detail label="Submitted On" value={selectedCase.submittedDate} />

            <div className="mt-4">
              <p className="font-medium text-gray-700 mb-1">
                Detailed Description
              </p>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border">
                {selectedCase.description}
              </p>
            </div>

            <div className="mt-8 text-right">
              <button
                onClick={() => setSelectedCase(null)}
                className="bg-red-600 text-white px-6 py-2 rounded
                           hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SMALL HELPER ---------- */

function Detail({ label, value }) {
  return (
    <div className="mb-3">
      <span className="font-medium text-gray-700">{label}:</span>{" "}
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
