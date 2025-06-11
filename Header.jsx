// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
  

//   return (
//     <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         {/* Logo */}
//         <h1 className="text-xl font-bold text-green-600">Krishi Setu</h1>

//         {/* Navigation (Visible on large screens) */}
//         <nav className="hidden md:flex space-x-6">
//           <Link to="/dashboard" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
//             Dashboard
//           </Link>
//           <Link to="/weather" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
//             Weather Forecast
//           </Link>
//           <Link to="/crop" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
//             Crop Price
//           </Link>
//           <Link to="/detect-disease" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
//           crop disease
//           </Link>
//           <Link to="/login" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
//            Login
//           </Link>
//         </nav>

//         {/* Mobile Menu Button (Hidden on large screens) */}
//         <button
//           className="md:hidden text-green-600 text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "✖" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Menu (Visible only when open) */}
//       <div
//         className={`absolute top-full left-0 w-full bg-white shadow-md p-4 transition-transform duration-300 transform ${
//           isOpen ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
//         } md:hidden`}
//       >
//         <Link to="/dashboard" className="block text-gray-700 hover:text-green-600 p-2">
//           Dashboard
//         </Link>
//         <Link to="/weather" className="block text-gray-700 hover:text-green-600 p-2">
//           Weather Forecast
//         </Link>
//         <Link to="/crop" className="block text-gray-700 hover:text-green-600 p-2">
//           Crop Price
//         </Link>
//         <Link to="/detect-disease" className="block text-gray-700 hover:text-green-600 p-2">
//         crop disease
//         </Link>
       
//         <Link to="/login" className="block text-gray-700 hover:text-green-600 p-2">
//           Login
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-green-600">Krishi Setu</h1>

        {/* Navigation (Visible on large screens) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
            Dashboard
          </Link>
          <Link to="/weather" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
            Weather Forecast
          </Link>
          <Link to="/crop" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
            Crop Price
          </Link>
          <Link to="/detect-disease" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
            Crop Disease
          </Link>
          <Link to="/chat" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
            KrishiAssistence
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
              Login
            </Link>
          ) : (
            <>
              <Link to="/profile" className="nav-item text-gray-800 font-semibold hover:text-green-500 transition-all duration-300">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-gray-800 font-semibold hover:text-red-500 transition-all duration-300">
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-600 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <Link to="/dashboard" className="block text-gray-700 hover:text-green-600 p-2">
          Dashboard
        </Link>
        <Link to="/weather" className="block text-gray-700 hover:text-green-600 p-2">
          Weather Forecast
        </Link>
        <Link to="/crop" className="block text-gray-700 hover:text-green-600 p-2">
          Crop Price
        </Link>
        <Link to="/detect-disease" className="block text-gray-700 hover:text-green-600 p-2">
          Crop Disease
        </Link>
        <Link to="/chat" className="block text-gray-700 hover:text-green-600 p-2">
          KrishiAssistence
        </Link>
        <Link to="/news" className="block text-gray-700 hover:text-green-600 p-2">
         Farming
        </Link>

        {!isLoggedIn ? (
          <Link to="/login" className="block text-gray-700 hover:text-green-600 p-2">
            Login
          </Link>
        ) : (
          <>
            <Link to="/profile" className="block text-gray-700 hover:text-green-600 p-2">
              Profile
            </Link>
            <button onClick={handleLogout} className="block text-left w-full text-gray-700 hover:text-red-500 p-2">
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

