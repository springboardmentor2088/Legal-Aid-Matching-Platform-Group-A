import React from "react";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900">
          About LegalAid Connect
        </h1>
        <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
          Our mission is simple — to make justice accessible for every citizen,
          regardless of their background or financial capacity.
        </p>

        {/* IMAGE BANNER */}
        <div className="mt-10 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=60"
            className="w-full h-72 object-cover"
            alt="justice"
          />
        </div>

        {/* SECTION */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-blue-700">Our Vision</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              We envision a world where legal support is not a luxury but a right.
              Through pro bono lawyers, NGOs, and verified legal professionals,
              we aim to bridge the gap between those who need help and those who can offer it.
            </p>
          </div>

          <div className="p-8 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-green-700">Why We Exist</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Millions remain unheard because they lack legal awareness or cannot
              afford representation. We created this platform to empower citizens,
              support communities, and unite legal helpers for a stronger society.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-3xl font-extrabold text-blue-700">500+</h3>
            <p className="text-gray-600">Cases Supported</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-3xl font-extrabold text-green-700">200+</h3>
            <p className="text-gray-600">Pro Bono Lawyers</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-3xl font-extrabold text-red-700">100+</h3>
            <p className="text-gray-600">Partner NGOs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
