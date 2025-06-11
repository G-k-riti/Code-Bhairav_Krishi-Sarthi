import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBarChart2, FiSettings, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-green-700 text-white h-screen p-5 flex flex-col fixed top-0 left-0 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl mb-6 focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6">
          <Link to="/" className="flex items-center space-x-3 hover:bg-green-600 p-2 rounded-md">
            <FiHome className="text-xl" />
            {isOpen && <span>Home</span>}
          </Link>

          <Link to="/dashboard" className="flex items-center space-x-3 hover:bg-green-600 p-2 rounded-md">
            <FiBarChart2 className="text-xl" />
            {isOpen && <span>Analytics</span>}
          </Link>

          <Link to="/settings" className="flex items-center space-x-3 hover:bg-green-600 p-2 rounded-md">
            <FiSettings className="text-xl" />
            {isOpen && <span>Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Page Content (Shifts when sidebar is open) */}
      <div className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"} p-6`}>
        <h1 className="text-2xl font-bold">Dashboard Content Here</h1>
      </div>
    </div>
  );
};

export default Sidebar;
