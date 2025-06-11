// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const cards = [
//     { 
//       title: "Weather Insights", 
//       icon: "🌦", 
//       path: "/weather",
//       description: "Get real-time weather updates and forecasts."
//     },
//     { 
//       title: "Crop Price Trends", 
//       icon: "📈", 
//       path: "/crop-prices",
//       description: "Check the latest market trends for crops."
//     },
//     { 
//       title: "Latest Farming News", 
//       icon: "🎥", 
//       path: "/news",
//       description: "Stay updated with the latest farming news."
//     },
//     { 
//       title: "Best Practices", 
//       icon: "📚", 
//       path: "/best-practices",
//       description: "Learn the best techniques for farming success."
//     },
//     { 
//       title: "Disease Detection", 
//       icon: "🦠", 
//       path: "/disease-detection",
//       description: "Identify and prevent crop diseases effectively."
//     },
//     { 
//       title: "Community Discussions", 
//       icon: "👥", 
//       path: "/community",
//       description: "Engage with other farmers and share insights."
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-green-100 via-white to-green-50 p-6 flex flex-col items-center">
//       <h1 className="text-4xl font-extrabold text-green-700 text-center mb-10 drop-shadow-md">
//         🌿 Welcome to KrishiSarthi Dashboard
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className="backdrop-blur-md bg-white/70 border border-green-100 shadow-xl rounded-2xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
//             onClick={() => navigate(card.path)}
//           >
//             <span className="text-5xl mb-4">{card.icon}</span>
//             <h2 className="text-xl font-bold text-green-800 mb-2 text-center">
//               {card.title}
//             </h2>
//             <p className="text-gray-600 text-center text-sm">{card.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      setLoginMessage("Please login to access this service.");
      setTimeout(() => {
        setLoginMessage("");
        navigate("/login");
      }, 2000);
    }
    setMenuOpen(false);
  };

  const cards = [
    {
      title: "Weather Insights",
      icon: "🌦",
      path: "/weather",
      description: "Get real-time weather updates and forecasts.",
    },
    {
      title: "Crop Price Trends",
      icon: "📈",
      path: "/crop",
      description: "Check the latest market trends for crops.",
    },
    {
      title: "Latest Farming News",
      icon: "📰",
      path: "/",
      description: "Stay updated with the latest farming news.",
    },
    {
      title: "Best Practices",
      icon: "📚",
      path: "/best-practices",
      description: "Learn the best techniques for farming success.",
    },
    {
      title: "Disease Detection",
      icon: "🦠",
      path: "/detect-disease",
      description: "Identify and prevent crop diseases effectively.",
    },
    {
      title: "Community Discussions",
      icon: "👥",
      path: "/community",
      description: "Engage with other farmers and share insights.",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-green-50">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:z-10`}
      >
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-white">🌱 KrishiSarthi</h1>
          <nav className="space-y-3">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(card.path)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600 cursor-pointer transition"
              >
                <span className="text-xl">{card.icon}</span>
                <span className="text-sm font-medium">{card.title}</span>
              </div>
            ))}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 mt-6 py-2 rounded-lg hover:bg-red-600 text-white text-sm"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b shadow px-4 py-3 flex items-center gap-4">
          <button
            className="text-green-700 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <h2 className="text-xl font-semibold text-green-800 truncate">
            Welcome, Farmer 👋
          </h2>
        </header>

        {/* Message */}
        {loginMessage && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm px-4 py-2 mx-4 mt-4 rounded">
            {loginMessage}
          </div>
        )}

        {/* Body */}
        <main className="p-4 space-y-4 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
          {user && (
            <div className="bg-white shadow rounded-lg p-4 text-green-800 max-w-xl mx-auto">
              <h2 className="text-lg font-semibold mb-2">👤 User Details</h2>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                {user.phone && (
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                )}
                {user.provider && (
                  <p>
                    <strong>Login Method:</strong> {user.provider}
                  </p>
                )}
                {user.role && (
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(card.path)}
                className="bg-white shadow border border-green-100 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="text-green-800 font-semibold text-lg">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
