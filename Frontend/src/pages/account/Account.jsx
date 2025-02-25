import React from "react";
import toast from "react-hot-toast";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-6">
      {user && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h2>
          <div className="text-lg text-gray-700 space-y-2">
            <p className="font-semibold">
              Name - <span className="font-normal">{user.name}</span>
            </p>
            <p className="font-semibold">
              Email - <span className="font-normal">{user.email}</span>
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <button onClick={()=>navigate(`${user._id}/dashboard`)} className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition">
              <MdOutlineDashboardCustomize className="text-xl" />
              Dashboard
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={logoutHandler}
            >
              <RiLogoutCircleLine className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
