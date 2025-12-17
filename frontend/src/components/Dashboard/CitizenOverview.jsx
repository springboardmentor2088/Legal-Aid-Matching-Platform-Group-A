import React from "react";
import appLogo from "../../assets/LOGO.png";

export default function CitizenOverview() {
  return (
    <div className="space-y-10">
      {/* 🌿 WELCOME / BANNER */}
      <div className="bg-[#2F4F4F] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <img src={appLogo} alt="logo" className="w-48" />
        </div>

        <h2 className="text-3xl font-bold mb-3">
          A Safer Way to Begin Your Legal Journey
        </h2>
        <p className="text-gray-200 text-lg max-w-3xl leading-relaxed">
          From understanding your rights to finding the right lawyer, we’re here
          to support you at every step.
        </p>
      </div>

      {/* 🌳 CITIZEN ROLE & RIGHTS */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-teal-100">
        <h3 className="text-2xl font-semibold text-teal-800 mb-4">
          Your Role as a Citizen
        </h3>

        <p className="text-gray-700 leading-relaxed mb-6 max-w-4xl">
          As a citizen, you have the right to seek legal guidance, raise
          concerns, and access justice without fear or confusion. This platform
          empowers you to connect with verified legal professionals and track
          your cases transparently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RIGHT CARD */}
          <div className="p-5 rounded-xl bg-teal-50 hover:shadow-md transition duration-300">
            <h4 className="font-semibold text-teal-700 mb-2">🌿 Your Rights</h4>
            <ul className="text-gray-700 space-y-2 text-sm leading-relaxed">
              <li>• Right to legal representation</li>
              <li>• Right to confidentiality & privacy</li>
              <li>• Right to track your legal cases</li>
              <li>• Right to fair and transparent communication</li>
            </ul>
          </div>

          {/* ROLE CARD */}
          <div className="p-5 rounded-xl bg-teal-50 hover:shadow-md transition duration-300">
            <h4 className="font-semibold text-teal-700 mb-2">
              🌱 Your Responsibilities
            </h4>
            <ul className="text-gray-700 space-y-2 text-sm leading-relaxed">
              <li>• Provide accurate case information</li>
              <li>• Respect legal procedures and timelines</li>
              <li>• Communicate honestly with lawyers</li>
              <li>• Use the platform ethically and responsibly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
