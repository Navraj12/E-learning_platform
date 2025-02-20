import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
const  {btnLoading,verifyOtp} =UserData()
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL query
  const navigate = useNavigate();

  const handleVerify = async(e) => {
    e.preventDefault();
await verifyOtp(Number(otp),navigate)
    if (otp === "123456") {
      // Simulated OTP
      alert("OTP Verified Successfully!");
      navigate("/login"); // Redirect to login page
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
        <p className="text-center mb-4 text-gray-600">
          We have sent a 6-digit OTP to <strong>{email}</strong>
        </p>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 mb-4 border rounded-md text-center"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button disabled={btnLoading}
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            {btnLoading?"Please Wait...":"Verify" }
          </button>
        </form>
        <p className="mt-4 text-center">
          Didn't receive OTP?{" "}
          <button className="text-blue-500 hover:underline">Resend</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </p>
      </div>
    </div>
  );
};

export default Verify;
