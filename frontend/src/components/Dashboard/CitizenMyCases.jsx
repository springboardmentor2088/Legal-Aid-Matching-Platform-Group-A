import React from "react";

export default function CitizenMyCases({ cases }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cases</h2>
      {cases.length === 0 ? (
        <div className="text-gray-600">No cases found.</div>
      ) : (
        cases.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-lg shadow mb-4 border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.summary}</p>
                <div className="text-xs text-gray-500 mt-2">Date: {c.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium mb-2">{c.status}</div>
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

