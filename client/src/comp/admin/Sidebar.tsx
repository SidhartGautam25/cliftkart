// components/dashboard/Sidebar.tsx
import React from "react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const sections = ["Dashboard","Users", "Orders", "Create", "Products"];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="bg-gray-800 text-white w-full sm:w-60 flex-shrink-0 p-4 space-y-4">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
            activeSection === section ? "bg-gray-700 font-semibold" : ""
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
