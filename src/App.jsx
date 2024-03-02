import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './components/Profile';
import HomePage from './pages/Home';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/me" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
