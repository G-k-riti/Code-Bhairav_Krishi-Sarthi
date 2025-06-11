import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-green-700 text-white py-10  md:px-30 mt-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Krishi Sarthi</h2>
          <p className="text-sm text-gray-200">
            Empowering farmers with tech-driven insights & support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#market" className="hover:underline">Market & Resources</a></li>
            <li><a href="#weather" className="hover:underline">Weather Forecast</a></li>
            <li><a href="#support" className="hover:underline">Get Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-yellow-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-300"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-sm text-gray-300 border-t border-green-500 ">
        &copy; 2025 <span className="font-semibold">Krishi Sarthi</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
