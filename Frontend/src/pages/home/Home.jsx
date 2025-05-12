import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/testimonials/Testimonials";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-gray-125">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to our E-learning Platform
        </h1>
        <p className="text-gray-600 mt-2">Learn, Grow, Excel</p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-6 px-6 py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition"
        >
          Get Started
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <Testimonials />
      </div>
    </div>
  );
}

export default Home;
