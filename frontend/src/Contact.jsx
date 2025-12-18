import React from "react";
import Navbar from "./pages/NavBar";
export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 px-4 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <h1 className="text-4xl font-bold text-center text-gray-900 drop-shadow-lg animate-slide-up">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mt-4 max-w-xl mx-auto text-base animate-slide-up-delay">
            We’re here to support you. Reach out anytime.
          </p>

          {/* CONTACT FORM + INFO */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* LEFT: Form */}
            <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Send Us a Message
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
                />

                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 hover:shadow-md resize-none"
                ></textarea>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                  Send Message
                </button>
              </form>
            </div>

            {/* RIGHT: Info */}
            <div className="p-6 bg-white shadow-lg hover:shadow-xl rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800">
                Contact Information
              </h2>

              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                For legal support and queries, feel free to connect with us.
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <p className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  <strong>Email:</strong> advocare503@gmail.com
                </p>
                <p className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  <strong>Phone:</strong> +91 9975474400
                </p>
                <p className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  <strong>Office:</strong> Pune, Maharashtra, India
                </p>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-800">
                  Follow Us
                </h3>
                <div className="flex gap-3 text-xl mt-2">
                  <span className="hover:scale-125 transition-transform duration-200 cursor-pointer hover:text-blue-600">
                    📘
                  </span>
                  <span className="hover:scale-125 transition-transform duration-200 cursor-pointer hover:text-blue-400">
                    🐦
                  </span>
                  <span className="hover:scale-125 transition-transform duration-200 cursor-pointer hover:text-pink-500">
                    📸
                  </span>
                  <span className="hover:scale-125 transition-transform duration-200 cursor-pointer hover:text-red-500">
                    🎥
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
