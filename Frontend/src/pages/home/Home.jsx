import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to our E-learning Platform
        </h1>
        <p className="text-gray-600 mt-2">Learn, Grow, Excel</p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-6 px-6 py-2 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
