import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png"; // OR use /LOGO.png if in public

export default function Navbar({ user }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-xl shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT: LOGO + TITLE */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 object-cover rounded-full shadow"
          />
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
              AdvoCare
            </span>
          </h1>
        </div>

        {/* RIGHT: LINKS + BUTTONS */}
        <div className="flex items-center space-x-10">
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-700 transition"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Contact
            </Link>
          </div>

          {!user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 border border-blue-600 text-blue-700 bg-white rounded-md shadow hover:bg-blue-50 transition font-semibold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
