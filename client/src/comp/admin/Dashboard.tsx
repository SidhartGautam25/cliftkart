// components/dashboard/DashboardC.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const DashboardC: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Users");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <MainContent activeSection={activeSection} />
    </div>
  );
};

export default DashboardC;
