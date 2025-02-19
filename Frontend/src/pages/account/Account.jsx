import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Account = ({ user }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-6">
      {user && (
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">
            My Profile
          </h2>
          <div className="flex flex-col items-center text-lg text-gray-700 space-y-2">
            <p className="font-semibold">
              Name - <span className="font-normal">{user.name}</span>
            </p>
            <p className="font-semibold">
              Email - <span className="font-normal">{user.email}</span>
            </p>
          </div>
          <button className="mt-6 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition">
            <MdOutlineDashboardCustomize className="text-lg" />
            Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
