import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Home from "./pages/home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={Home} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
