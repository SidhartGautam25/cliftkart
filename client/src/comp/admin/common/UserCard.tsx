// components/dashboard/UserCard.tsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react"; // optional, use any icons you like
import {  ToastContainer } from "react-toastify";


interface UserCardProps {
  user: Record<string,any>;
  onDelete: (id: string) => void;
  onRoleChange: (id: string, role: "user" | "admin") => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onRoleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">(user.role);

  const handleRoleChange = (role: "user" | "admin") => {
    setSelectedRole(role);
    onRoleChange(user._id, role);
    setShowDropdown(false);
    onDelete(user._id);
  };

  const handleDeletion=()=>{
    console.log("toat should appear")
    onDelete(user._id);
   

  }

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* User Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <p className="text-gray-500 text-sm">Role : {user.role}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Edit Role Button */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Edit Role
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 mt-2 bg-white border rounded shadow w-28">
              <button
                onClick={() => handleRoleChange("user")}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedRole === "user" ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                User
              </button>
              <button
                onClick={() => handleRoleChange("admin")}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedRole === "admin" ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                Admin
              </button>
            </div>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDeletion}
          className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          <Trash2 className="w-4 h-4 inline mr-1" />
          Delete
        </button>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default UserCard;
