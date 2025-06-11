import React from "react";
import CropDiseaseDetector from "../components/CropDiseaseDetector";

const CropDiseasePage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-700 text-white p-4 text-center text-xl font-semibold shadow-md">
        🧪 AI Crop Disease Diagnosis
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <CropDiseaseDetector />
      </main>

    </div>
  );
};

export default CropDiseasePage;
