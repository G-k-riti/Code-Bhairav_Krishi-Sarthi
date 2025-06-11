import React, { useState } from "react";

const ProfileForm = ({ initialData = {}, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || "",
    pinCode: initialData.pinCode || "",
    state: initialData.state || "",
    district: initialData.district || "",
    taluka: initialData.taluka || "Other",
    village: initialData.village || "Other",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-green-600">
          📷
        </div>
        <p className="text-green-600 font-medium">Upload your photo</p>
      </div>

      <input
        type="text"
        name="fullName"
        placeholder="Your full name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border-b border-gray-400 py-2 focus:outline-none"
      />

      <div>
        <p className="font-semibold">Address.</p>
        <input
          type="text"
          name="pinCode"
          placeholder="Enter your pin code"
          value={formData.pinCode}
          onChange={handleChange}
          className="w-full border-b border-gray-400 py-2 focus:outline-none"
          required
        />

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="text-sm">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-sm">District *</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="text-sm">Taluka</label>
            <select
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
            >
              <option>Other</option>
              <option>Taluka 1</option>
              <option>Taluka 2</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm">Village</label>
            <select
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
            >
              <option>Other</option>
              <option>Village 1</option>
              <option>Village 2</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-full mt-6 disabled:bg-gray-400"
        disabled={!formData.pinCode || !formData.state || !formData.district}
      >
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
