import React, { useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./MainContent";
import Footer from "./footer/Footer";

import {
  ANIMATION_TIMINGS,
} from "../../utils/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`flex flex-col min-h-screen dark:bg-gray-900 transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 p-4">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}/>
        <MainContent>{children}</MainContent>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
