// import React, { useState } from "react";
// import crops from "./data/cropList"; // adjust path as needed

// const CropDiseaseDetector = () => {
//   const [selectedCrop, setSelectedCrop] = useState("");
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedCrop || !image) {
//       alert("Please select a crop and upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("crop", selectedCrop);
//     formData.append("image", image);

//     try {
//       const response = await fetch("http://localhost:5000/api/detect-disease", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setResult(`Predicted Disease: ${data.disease}`);
//     } catch (error) {
//       console.error(error);
//       setResult("Error detecting disease. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
//         🌿 Crop Disease Detection
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Select Crop</label>
//           <select
//             className="w-full p-2 border rounded-lg"
//             value={selectedCrop}
//             onChange={(e) => setSelectedCrop(e.target.value)}
//           >
//             <option value="">-- Choose Crop --</option>
//             {crops.map((crop) => (
//               <option key={crop.value} value={crop.value}>
//                 {crop.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-4">
//           {selectedCrop &&
//             crops
//               .filter((c) => c.value === selectedCrop)
//               .map((c) => (
//                 <img
//                   key={c.value}
//                   src={c.image}
//                   alt={c.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//               ))}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Upload Leaf Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Detect Disease
//         </button>

//         {result && (
//           <div className="mt-4 text-center text-green-800 font-semibold">
//             {result}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CropDiseaseDetector;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import crops from "./data/cropList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CropDiseaseDetector = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login to access this feature.");
      setMessageType("error");
      // Removed: setTimeout(() => navigate("/login"), 2000);
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCrop || !image) {
      setMessage("Please select a crop and upload an image.");
      setMessageType("error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized. Please login.");
      setMessageType("error");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const formData = new FormData();
    formData.append("crop", selectedCrop);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/detect-disease", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setResult(`Predicted Disease: ${data.disease}`);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Error detecting disease. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full mx-auto mt-24">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
            🌿 Crop Disease Detection
          </h2>

          {message && (
            <div
              className={`text-center mb-4 p-2 rounded-md font-medium ${
                messageType === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Select Crop</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                <option value="">-- Choose Crop --</option>
                {crops.map((crop) => (
                  <option key={crop.value} value={crop.value}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              {selectedCrop &&
                crops
                  .filter((c) => c.value === selectedCrop)
                  .map((c) => (
                    <img
                      key={c.value}
                      src={c.image}
                      alt={c.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
            </div>

            <div>
              <label className="block font-medium mb-1">Upload Leaf Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Detect Disease
            </button>

            {result && (
              <div className="mt-4 text-center text-green-800 font-semibold">
                {result}
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropDiseaseDetector;
