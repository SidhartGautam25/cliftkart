
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createOrder,
  getAllMyOrders,
  getOrderDetails,
  getOrdersByDate,
  removeErrors,
  removeSuccess,
} from "../order/orderSlice"; // Adjust this import path to your orderSlice file

export const useOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Select relevant state from the order slice
  const { orders, order, loading, error, success } = useAppSelector(
    (state) => state.order
  );
  const totalPages=orders.length;

  /**
   * Dispatches the createOrder action.
   * Handles success and error cases with toast notifications.
   * @param orderData The data for the new order.
   */
  const handleCreateOrder = useCallback(
    async (orderData: any) => {
      try {
        const result = await dispatch(createOrder(orderData)).unwrap();
        toast.success("Order placed successfully!");
        navigate("/order/success"); // Navigate to a success page
        return result;
      } catch (err: any) {
        console.error("Failed to create order:", err);
        toast.error(err.message || "Failed to place order. Please try again.");
        throw err; // Re-throw error for component-level handling if needed
      }
    },
    [dispatch, navigate]
  );

  /**
   * Fetches all orders for the currently authenticated user.
   */
  const handleGetAllMyOrders = useCallback(async () => {
    try {
      await dispatch(getAllMyOrders()).unwrap();
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      toast.error(err.message || "Could not fetch your orders.");
    }
  }, [dispatch]);

  /**
   * Fetches the details for a single order by its ID.
   * @param orderId The ID of the order to fetch.
   */
  const handleGetOrderDetails = useCallback(
    async (orderId: string) => {
      try {
        await dispatch(getOrderDetails(orderId)).unwrap();
      } catch (err: any) {
        console.error(`Failed to fetch details for order ${orderId}:`, err);
        toast.error(err.message || "Could not fetch order details.");
      }
    },
    [dispatch]
  );


  const handleGetOrdersByDate = useCallback(
    async (date: string, page: number = 1) => {
        try {
            await dispatch(getOrdersByDate({ date, page })).unwrap();
        } catch (err: any) {
            toast.error(err.message || "Could not fetch orders for the selected date.");
        }
    },
    [dispatch]
  );




  
  /**
   * Clears any errors from the order state.
   */
  const handleRemoveErrors = useCallback(() => {
    dispatch(removeErrors());
  }, [dispatch]);

  /**
   * Clears the success flag from the order state.
   */
  const handleRemoveSuccess = useCallback(() => {
    dispatch(removeSuccess());
  }, [dispatch]);


  return {
    totalPages,
    orders,
    order,
    loading,
    error,
    success,
    handleCreateOrder,
    handleGetAllMyOrders,
    handleGetOrderDetails,
    handleRemoveErrors,
    handleRemoveSuccess,
    handleGetOrdersByDate,
  };
};
