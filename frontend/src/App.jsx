import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import ProtectedRoute from "./routes/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import { ThemeProvider } from "./context/DarkMode";
import RecruterTab from "./pages/RecruterTab";
import StudentTab from "./pages/StudentTab";
import ApplyForm from "./pages/ApplyForm";

function App() {
  return (
    <Router>
      <ThemeProvider storageKey="vite-ui-theme" defaultTheme="system">
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recruters" element={<RecruterTab />} />
          <Route path="/jobs" element={<StudentTab />} />
          
        </Route>
      </Route>
        </Routes>
      </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
