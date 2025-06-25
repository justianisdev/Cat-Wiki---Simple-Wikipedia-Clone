import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./reusables/user/register.jsx";
import Login from "./reusables/user/login.jsx";
import Create from "./Create";
import Display from "./Display";
import Home from "./Home";
import NoPage from "./reusables/NoPage";
import Header from "./reusables/Header.jsx";
import Footer from "./reusables/Footer.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Loggedin") === "true"
  );

  // Allow other components (like login/logout) to trigger state change
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("Loggedin") === "true");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page/:id" element={<Display />} />
        {isLoggedIn ? (
          <Route path="/create" element={<Create />} />
        ) : (
          <Route path="/create" element={<Login />} /> // fallback if not logged in
        )}
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
