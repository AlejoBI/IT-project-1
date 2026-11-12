import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./MainContent";
import Footer from "./footer/Footer";

import { ANIMATION_TIMINGS } from "../../../shared/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebar();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`flex flex-col min-h-screen dark:bg-gray-900 transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-white px-4 py-2 text-gray-900 focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Saltar al contenido principal
      </a>
      {!isLoginPage && (
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      )}
      <div className="flex flex-1 p-4">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <MainContent>{children}</MainContent>
      </div>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;
