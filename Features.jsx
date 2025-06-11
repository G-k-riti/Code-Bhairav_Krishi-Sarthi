import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CloudRain,
  BarChart,
  BookOpen,
  PlayCircle,
  Briefcase,
  Search,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Real-Time Weather Updates",
    description: "Get instant weather forecasts tailored for your farm location.",
    icon: <CloudRain size={32} className="text-white" />,
  },
  {
    title: "Crop Price Analysis",
    description: "Track real-time market prices for your crops and plan better sales.",
    icon: <BarChart size={32} className="text-white" />,
  },
  {
    title: "Best Farming Practices",
    description: "Access expert farming techniques and soil health tips.",
    icon: <BookOpen size={32} className="text-white" />,
  },
  {
    title: "Learning Videos",
    description: "Watch latest agricultural techniques and expert guidance on YouTube.",
    icon: <PlayCircle size={32} className="text-white" />,
  },
  {
    title: "Govt. Schemes & Subsidies",
    description: "Stay updated with government support programs for farmers.",
    icon: <Briefcase size={32} className="text-white" />,
  },
  {
    title: "Crop Disease Detection",
    description: "Upload a leaf image and get AI-powered disease diagnosis & treatment suggestions.",
    icon: <Search size={32} className="text-white" />,
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none restart none",
        },
      }
    );
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-green-700">Our Key Features</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-lg">
          Explore cutting-edge tools and insights to boost your farming productivity.
        </p>
      </div>

      <div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-center mb-5">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-full shadow-md group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
