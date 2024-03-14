import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

// Importar la página para el perfil de usuario individual

import HomePage from './pages/Home';
import DietForm from "./pages/DietForm";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><DietForm /></ProtectedRoute>} />

      </Routes>
    </div>
  );
};

export default App;
