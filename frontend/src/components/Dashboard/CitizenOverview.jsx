import React from "react";

export default function CitizenOverview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Overview</h2>
      <p className="text-gray-700 mb-4">
        This platform helps citizens submit legal issues and connect with
        verified lawyers and NGOs. It provides case tracking, lawyer matching,
        messaging and appointment scheduling. Your rights as a user include:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Right to confidential consultation with matched lawyers.</li>
        <li>Right to view status of submitted cases and appointments.</li>
        <li>Right to request escalation and updates.</li>
        <li>
          Right to update personal profile and control sharing preferences.
        </li>
      </ul>
    </div>
  );
}

