import { Link } from "react-router-dom";

function Header(isAuth) {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">E-Learning</h1>
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-400 transition">
            Courses
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          {isAuth ? (
            <Link to="/account" className="hover:text-blue-400 transition">
              Account
            </Link>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
