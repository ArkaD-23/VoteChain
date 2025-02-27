import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";


const Navbar = () => {

  const {isRegistered, updateRegistrationStatus} = useGlobalContext();
  
  useEffect(() => {
    updateRegistrationStatus();
    console.log("Navbar: ", isRegistered);
  }, [updateRegistrationStatus]);

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-indigo-500 to-indigo-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white text-2xl font-extrabold">VoteChain</h1>
        </Link>
        {isRegistered && <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-gray-200 hover:text-white"
                } transition-all duration-300`
              }
            >
              Create
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cast"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-gray-200 hover:text-white"
                } transition-all duration-300`
              }
            >
              Cast
            </NavLink>
          </li>
        </ul>}
      </div>
    </nav>
  );
};

export default Navbar;
