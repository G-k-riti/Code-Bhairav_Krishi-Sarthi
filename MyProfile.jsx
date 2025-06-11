import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error loading profile", err);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-green-600 text-white p-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl text-green-600 mb-2">
          📷
        </div>
        <h2 className="text-xl font-bold">{profile.fullName || "My name"}</h2>
        <p className="text-sm">{profile.phoneNumber || "+91-8077034652"}</p>
      </div>

      <div className="bg-white p-4 rounded-t-2xl -mt-4">
        <h3 className="font-semibold mb-2">Address</h3>
        <p><strong>Pin code:</strong> {profile.pinCode}</p>
        <p><strong>State:</strong> {profile.state}</p>
        <p><strong>District:</strong> {profile.district}</p>
        <p><strong>Taluka:</strong> {profile.taluka}</p>
        <p><strong>Village:</strong> {profile.village}</p>

        <button
          onClick={() => navigate("/edit-profile")}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-full"
        >
          ✏️ Edit profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
