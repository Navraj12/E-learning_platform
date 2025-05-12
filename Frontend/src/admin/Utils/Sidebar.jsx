import { AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaHome, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <ul className="space-y-6">
        <li>
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg transition"
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link
            to="/admin/course"
            className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg transition"
          >
            <FaBook className="text-xl" />
            <span>Courses</span>
          </Link>
        </li>

        <li>
          <Link
            to="/admin/user"
            className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg transition"
          >
            <FaUserAlt className="text-xl" />
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link
            to="/logout"
            className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg transition"
          >
            <AiOutlineLogout className="text-xl" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
