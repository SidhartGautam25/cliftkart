// components/dashboard/UsersComponent.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { toast } from "react-toastify";
import { fetchUsers, updateUserRole } from "../../../context/admin/adminSlice";
import UserCard from "../common/UserCard";




const UsersComponent: React.FC = () => {
  const { users, error,updated} = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

   // Dummy delete handler
  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
    toast.info("Delete handler not implemented yet");
  };

  const handleRoleChange = (id: string, role: "user" | "admin") => {
    console.log("Change role for", id, "to", role);
    const userId=id;
    dispatch(updateUserRole({userId,role}))
    toast.success(`Role changed to ${role}`);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("need to update the state of admin")
    dispatch(fetchUsers());
  }, [updated]);

  useEffect(() => {
    if (error) {
      toast.error("Error while loading Product", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  });
  return <div className="text-gray-800 text-xl"><div className="space-y-4">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Users Management</h2> */}
      {users?.length === 0 ? (
        <p className="text-gray-500 italic">No users found.</p>
      ) : (
        users?.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
          />
        ))
      )}
    </div></div>;
};

export default UsersComponent;
