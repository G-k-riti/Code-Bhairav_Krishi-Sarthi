import React from "react";
import Weather from "../components/Weather";
import WeatherWidget from "../components/WeatherWidget";
import Header from "../components/Header"; // ✅ Header component added

const WeatherPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      {/* ✅ Header Component */}
      <Header />

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Live Weather & Location Map ☁️
      </h1>

      {/* Map Component */}
      <div className="w-full max-w-4xl mb-6">
        <Weather />
      </div>

      {/* Weather Widget */}
      <div className="w-full max-w-4xl">
        <WeatherWidget />
      </div>
    </div>
  );
};

export default WeatherPage;
