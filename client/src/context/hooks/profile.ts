import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback } from "react";
import { addAddress, addPhone } from "../user/userSlice";

interface Address {
  pin: string;
  other: string;
}

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error, success } = useAppSelector(
    (state) => state.user
  );

  const handleAddPhone = useCallback(
    async (phone: string) => {
      try {
        console.log("inside useProfile hook,trying to add phone number");
        if (!phone || phone.trim() === "") {
          toast.error("Phone number cannot be empty!", {
            position: "top-center",
            autoClose: 3000,
          });
          return;
        }
        await dispatch(addPhone(phone.trim())).unwrap();
        toast.success("Phone number added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err: any) {
        console.log("failed to add Phone number in useProfile hook");
        toast.error(error || "Failed to add phone number. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
    [dispatch]
  );

  const handleAddAddress = useCallback(
    async (address: Address) => {
      try {
        console.log("trying to add address in useProfile hook");
        if (!address.pin || !address.other) {
          toast.error("Both PIN code and address details are required!", {
            position: "top-center",
            autoClose: 3000,
          });
          return;
        }
        if (address.pin.trim() === "" || address.other.trim() === "") {
          toast.error("PIN code and address cannot be empty!", {
            position: "top-center",
            autoClose: 3000,
          });
          return;
        }
        await dispatch(
          addAddress({
            pin: address.pin.trim(),
            other: address.other.trim(),
          })
        ).unwrap();

        toast.success("Address added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err: any) {
        console.error("Failed to add address in useProfile hook", err);
        toast.error(error || "Failed to add address. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
    [dispatch]
  );

  const getPhone = useCallback(() => {
    return user?.phone || [];
  }, [user]);

  const getAddress = useCallback(() => {
    return user?.address || [];
  }, [user]);

  const hasPhone = useCallback(() => {
    return getPhone().length > 0;
  }, [getPhone]);

  const hasAddress = useCallback(() => {
    return getAddress().length > 0;
  }, [getAddress]);

  return {user,loading,error,success, handleAddAddress , handleAddPhone , getAddress , getPhone , hasAddress,hasPhone}
};
