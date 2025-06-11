
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import WeatherWidget from "./WeatherWidget";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
});

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Fetching address...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });

          try {
            const geoRes = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            setAddress(geoRes.data.display_name || "Unknown Location");
          } catch (err) {
            setError("⚠ Unable to fetch location details.");
          }
          setLoading(false);
        },
        (err) => {
          setError("⚠ Location access denied. Please enable GPS.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("⚠ Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6 text-white">
      <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">📍 Live Weather & Location</h1>
      {loading ? (
        <p className="text-lg animate-pulse">⏳ Fetching location...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      ) : (
        <div className="w-full max-w-4xl shadow-2xl p-6 text-gray-900">
  <MapContainer
    center={[location.lat, location.lon]}
    zoom={14}
    className="w-full h-96 rounded-lg overflow-hidden"
    scrollWheelZoom={false} // optional
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[location.lat, location.lon]} icon={markerIcon}>
      <Popup>📍 {address}</Popup>
    </Marker>
  </MapContainer>

          <p className="mt-4 text-lg font-medium text-center">
            📍 You are in <strong>{address}</strong>
          </p>
        </div>
      )}
      {!loading && !error && <WeatherWidget location={location} />}
    </div>
  );
};

export default Weather;
