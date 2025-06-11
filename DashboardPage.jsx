import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Dashboard Area */}
      <main className="flex-1 p-8 bg-green-50">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="bg-green-50 ">
        <Footer />
      </footer>
    </div>
  );
};

export default DashboardPage;
