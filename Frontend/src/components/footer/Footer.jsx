import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebook, FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Your E-learning Platform. All rights
          reserved.
        </p>
        <p className="text-sm mt-1">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Navraj12"
            className="text-purple-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navraj Awasthi
          </a>
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-3">
          <a
            href="https://www.facebook.com/profile.php?id=100089304993611"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition text-2xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/navraj_awast"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition text-2xl"
          >
            <FaTwitterSquare />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition text-2xl"
          >
            <FaSquareInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/navraj-awasthi-b156a5261/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition text-2xl"
          >
            <CiLinkedin />
          </a>
          <a
            href="https://github.com/Navraj12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition text-2xl"
          >
            <FaGithubSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
