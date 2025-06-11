// import { useState } from "react";

// export default function CropPricePrediction() {
//   const [crop, setCrop] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [price, setPrice] = useState(null);

//   const handlePredict = async () => {
//     if (!crop) return;
//     setLoading(true);
//     setPrice(null);

//     // Simulate API call
//     setTimeout(() => {
//       setPrice(`₹${(Math.random() * 1000 + 1000).toFixed(2)} / quintal`);
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
//       <h2 className="text-2xl font-bold text-center mb-4">Crop Price Prediction</h2>
      
//       <input
//         type="text"
//         value={crop}
//         onChange={(e) => setCrop(e.target.value)}
//         placeholder="Enter crop name"
//         className="w-full border rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
//       />
      
//       <button
//         onClick={handlePredict}
//         className="bg-green-500 text-white px-4 py-2 rounded-xl w-full hover:bg-green-600 transition"
//         disabled={loading}
//       >
//         {loading ? "Predicting..." : "Predict Price"}
//       </button>

//       {price && (
//         <div className="mt-4 text-center text-lg text-green-700 font-semibold">
//           Predicted Price for <span className="underline">{crop}</span>: {price}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Adjust if needed
import Footer from "../components/Footer";

export default function CropPricePrediction() {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    }
  }, []);

  const handlePredict = () => {
    if (!crop) return;
    setLoading(true);
    setPrice(null);

    setTimeout(() => {
      setPrice(`₹${(Math.random() * 1000 + 1000).toFixed(2)} / quintal`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto mt-24 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Access Denied 🚫</h2>
            <p>Please login to access the Crop Price Prediction feature.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-24">
            <h2 className="text-2xl font-bold text-center mb-4">Crop Price Prediction</h2>

            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="Enter crop name"
              className="w-full border rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handlePredict}
              className="bg-green-500 text-white px-4 py-2 rounded-xl w-full hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Price"}
            </button>

            {price && (
              <div className="mt-4 text-center text-lg text-green-700 font-semibold">
                Predicted Price for <span className="underline">{crop}</span>: {price}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
