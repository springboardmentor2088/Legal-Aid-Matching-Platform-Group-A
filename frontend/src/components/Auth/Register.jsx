import React, { useState } from "react";
import CitizenForm from "./CitizenForm";
import LawyerForm from "./LawyerForm";
import NGOForm from "./NGOForm";
import { useNavigate } from "react-router-dom";
const Register = () => {
  // Initialize state with 'Citizen' as the default role
  const [role, setRole] = useState("Citizen");
  const navigate = useNavigate();

  // Function to handle role change
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  // Function to render the correct form component
  const renderForm = () => {
    switch (role) {
      case "Citizen":
        return <CitizenForm />;
      case "Lawyer":
        return <LawyerForm />;
      case "NGO":
        return <NGOForm />;
      default:
        return <CitizenForm />; // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Account Registration
          </h1>
          <p className="text-gray-600 mt-2">
            Join us as a <span className="font-semibold">**Citizen**</span>,
            <span className="font-semibold"> **Lawyer**</span>, or
            <span className="font-semibold"> **NGO**</span>.
          </p>
        </header>

        {/* Role Selection */}
        <div className="mb-8 max-w-md mx-auto">
          <label
            htmlFor="select-role"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Role
          </label>
          <div className="relative">
            <select
              id="select-role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm border appearance-none cursor-pointer"
            >
              <option value="Citizen">Citizen</option>
              <option value="Lawyer">Lawyer</option>
              <option value="NGO">NGO</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Render the selected form */}
        {renderForm()}

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
