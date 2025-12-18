import React from "react";

export default function CitizenFindLawyer({
  lawyers,
  setActivePage,
  setSelectedRecipient,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Find Lawyers and NGOs</h2>
      <div className="grid gap-4">
        {lawyers.map((L) => (
          <div
            key={L.id}
            className="bg-white p-4 rounded-lg shadow border flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{L.name}</div>
              <div className="text-sm text-gray-600">
                {L.expertise} • {L.location}
              </div>
              <div className="text-sm text-gray-500 mt-1">{L.contact}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActivePage("messages");
                  setSelectedRecipient({
                    type: "lawyer",
                    id: L.id,
                    name: L.name,
                  });
                }}
                className="bg-teal-700 text-white px-3 py-1 rounded"
              >
                Message
              </button>
              <button className="border px-3 py-1 rounded">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
