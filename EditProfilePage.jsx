import React, { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInitialData(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async (data) => {
    try {
      await axios.put("http://localhost:5000/api/profile/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/profile");
    } catch (err) {
      console.error("Error saving profile", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-green-600 text-white p-4">
        <h2 className="text-lg font-semibold">Edit profile</h2>
      </div>
      <ProfileForm initialData={initialData} onSave={handleSave} />
    </div>
  );
};

export default EditProfilePage;
