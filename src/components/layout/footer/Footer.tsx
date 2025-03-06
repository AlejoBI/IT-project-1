import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 dark:bg-gray-900 dark:text-gray-400 py-6 transition-colors duration-1000">
      <div className="container mx-auto text-center space-y-4">
        <p className="text-sm">
          Built with{" "}
          <span className="text-blue-500 font-semibold dark:text-blue-400 transition-colors duration-1000">
            React
          </span>{" "}
          and{" "}
          <span className="text-blue-500 font-semibold dark:text-blue-400 transition-colors duration-1000">
            Tailwind CSS
          </span>
        </p>
        <p className="text-xs">
          © {new Date().getFullYear()} ByteForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
