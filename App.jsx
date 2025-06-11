import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from "./pages/DashboardPage";
import WeatherPage from "./pages/WeatherPage";
import CropPricePage from "./pages/CropPricePage";
import CropDiseasePage from "./pages/CropDiseasePage";
import MyProfile from "./pages/MyProfile";
import EditProfilePage from "./pages/EditProfilePage";
import ChatBox from './components/ChatBox';
import FarmingNews from "./components/Farming";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/crop" element={<CropPricePage />} />
      <Route path="/detect-disease" element={<CropDiseasePage />} />
      <Route path="/profile" element={<MyProfile />} />
<Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/chat" element={<ChatBox />} />
      <Route path="/news" element={<FarmingNews />} />
      

    </Routes>
  );
};

export default App;
