import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../user/userSlice";
import { clearCart } from "../cart/cartSlice";
import { toast } from "react-toastify";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.user
  );

  const handleLogout = useCallback(async () => {
    try {
      console.log("attempting to logout user using useAuth");
      await dispatch(logout()).unwrap();
      dispatch(clearCart());
      // Show success message
      toast.success("You have been successfully logged out!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Navigate to home page
      navigate("/");
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  }, [navigate, dispatch]);

  const checkAuthStatus = useCallback(() => {
    // This can be used to verify authentication status
    return isAuthenticated && user !== null;
  }, [isAuthenticated, user]);

  return {
    user,isAuthenticated,loading,handleLogout,checkAuthStatus
  }
};
