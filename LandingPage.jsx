import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";

import YouTubeSection from "../components/YoutubeSection";
import MarketResources from "../components/MarketResources";
import Footer from "../components/Footer";
import Header from "../components/Header";


const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <Features />
      
      
      {/* YouTube Videos */}
      <YouTubeSection />
      
      {/* Market Resources */}
      <MarketResources />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
