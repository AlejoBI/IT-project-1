import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

import { logoutUser } from "../../../server/services/authServices";

import logo from "../../../assets/img/ByteForge.webp";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutUser());

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Logout", action: logout },
  ];

  const handleNavigation = (href: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      navigate(href);
    }
    setMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-5">
        <div className="flex items-center space-x-3">
          <div
            onClick={() => navigate("/")}
            className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-400 dark:hover:text-gray-300 flex items-center cursor-pointer transition-colors duration-300"
          >
            <img
              src={logo}
              alt="Task Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="ml-2">ByteForge</span>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent pt-4 pl-4 md:pt-0 md:pl-0 flex flex-col md:flex-row md:items-center`}
        >
          {navigation.map((item) => {
            if (
              (item.name === "Login" && isAuthenticated) ||
              (item.name === "Logout" && !isAuthenticated)
            ) {
              return null;
            }

            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.href) {
                    handleNavigation(item.href);
                  }
                  setMenuOpen(false);
                }}
                className={`${
                  location.pathname === item.href
                    ? "text-blue-500 font-semibold underline"
                    : "text-gray-700 dark:text-gray-400"
                } hover:text-blue-400 dark:hover:text-gray-300 transition-colors duration-300 block md:inline-block`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
