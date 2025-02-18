import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Home from "./pages/home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
