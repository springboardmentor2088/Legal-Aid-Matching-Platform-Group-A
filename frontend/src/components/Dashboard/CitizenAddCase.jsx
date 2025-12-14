import React, { useState } from "react";

export default function CitizenAddCase() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-8">
      {/* HERO BOX */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 rounded-2xl shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-4">We Understand Your Concern</h2>
        <p className="text-lg opacity-90 max-w-3xl">
          Share your legal issue clearly. Our system will match you with the
          best, verified lawyer based on expertise, case domain, location, and
          urgency.
        </p>

        {!submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Submit Your Case
          </button>
        )}
      </div>

      {/* STATS — After Submit */}
      {submitted && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
            <h3 className="font-medium text-gray-600">Open Cases</h3>
            <p className="text-4xl font-bold mt-2 text-blue-600">1</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
            <h3 className="font-medium text-gray-600">Matched Lawyers</h3>
            <p className="text-4xl font-bold mt-2 text-green-600">1</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
            <h3 className="font-medium text-gray-600">Upcoming Appointments</h3>
            <p className="text-4xl font-bold mt-2 text-purple-600">1</p>
          </div>
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="mt-12 bg-white p-10 rounded-2xl shadow-2xl border">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Detailed Case Submission Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Case Title */}
            <div>
              <label className="block text-gray-700 font-medium">
                Case Title
              </label>
              <input
                required
                type="text"
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Short case title"
              />
            </div>

            {/* Case Category */}
            <div>
              <label className="block text-gray-700 font-medium">
                Case Category
              </label>
              <select
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Case Type</option>
                <option value="crime">Criminal Case</option>
                <option value="civil">Civil Dispute</option>
                <option value="family">Family / Divorce / Marriage</option>
                <option value="property">Property / Land Issue</option>
                <option value="financial">Financial Fraud</option>
                <option value="cyber">Cyber Crime</option>
                <option value="corporate">Corporate Legal Issue</option>
                <option value="consumer">Consumer Protection Complaint</option>
              </select>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-gray-700 font-medium">
                Urgency Level
              </label>
              <select
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose urgency</option>
                <option value="low">Low – Need guidance</option>
                <option value="medium">Medium – Need legal help</option>
                <option value="high">High – Immediate lawyer needed</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium">
                Your Location
              </label>
              <input
                required
                type="text"
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your city or district"
              />
            </div>

            {/* Age & Gender */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium">
                  Your Age
                </label>
                <input
                  required
                  type="number"
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                  placeholder="Age"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Gender
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Opponent Relationship */}
            <div>
              <label className="block text-gray-700 font-medium">
                Who is involved?
              </label>
              <select
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select option</option>
                <option>Family Member</option>
                <option>Neighbor</option>
                <option>Government Authority</option>
                <option>Police</option>
                <option>Company / Employer</option>
                <option>Unknown Person</option>
              </select>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-gray-700 font-medium">
                Explain Your Issue
              </label>
              <textarea
                required
                rows="6"
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the full situation with events, dates..."
              ></textarea>
            </div>

            {/* Evidence */}
            <div>
              <label className="block text-gray-700 font-medium">
                Do you have any evidence?
              </label>
              <select
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select option</option>
                <option>Yes (Documents)</option>
                <option>Yes (Photos / Videos)</option>
                <option>No</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition"
              >
                Submit Case
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-red-600 font-semibold hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

