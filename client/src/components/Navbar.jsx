import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white text-2xl font-extrabold">VoteChain</h1>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-gray-400 hover:text-white"
                } transition-all duration-300`
              }
            >
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
