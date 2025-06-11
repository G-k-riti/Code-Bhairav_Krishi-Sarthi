import React from "react";

const Button = ({ text, onClick, type = "button", className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
