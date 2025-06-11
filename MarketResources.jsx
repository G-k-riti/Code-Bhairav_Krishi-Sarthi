import React from "react";
import { FaTractor, FaFileAlt, FaSeedling } from "react-icons/fa";

const MarketResources = () => {
  const cards = [
    {
      title: "Govt. Schemes",
      icon: <FaFileAlt className="text-green-600 text-3xl mb-2" />,
      desc: "Stay updated with the latest government schemes and policies beneficial for farmers."
    },
    {
      title: "Best Practices",
      icon: <FaTractor className="text-green-600 text-3xl mb-2" />,
      desc: "Adopt modern techniques and traditional wisdom for higher yields and sustainability."
    },
    {
      title: "Subsidies Info",
      icon: <FaSeedling className="text-green-600 text-3xl mb-2" />,
      desc: "Explore available subsidies on seeds, equipment, irrigation, and more."
    }
  ];

  return (
    <section id="market" className="py-20 px-6 bg-gradient-to-br from-green-50 via-white to-green-100 text-center">
      <h2 className="text-4xl font-extrabold text-green-700 mb-4">Market & Resources</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
        Explore government schemes, modern farming techniques, and subsidy benefits to enhance your agricultural journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-green-600"
          >
            <div className="flex flex-col items-center">
              {card.icon}
              <h3 className="text-xl font-semibold text-green-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition">
        Learn More
      </button>
    </section>
  );
};

export default MarketResources;

