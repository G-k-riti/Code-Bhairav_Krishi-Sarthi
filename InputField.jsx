import React from "react";

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
      />
    </div>
  );
};

export default InputField;
