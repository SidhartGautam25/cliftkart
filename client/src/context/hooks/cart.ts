import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItemsToCart, clearCart, loadCartItems } from "../cart/cartSlice";
import { toast } from "react-toastify";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, loading, updatingId } = useAppSelector(
    (state) => state.cart
  );
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const addToCart=useCallback(async (item:{id:string;quantity:number,name:string,image:string,price:number})=>{
    if(isAuthenticated){
        return dispatch(addItemsToCart(item))
    }else{
        toast.error("please login to add items to your cart")
    }
  },[dispatch,isAuthenticated]);

  const updateQuantity = useCallback(async (item:{id:string,quantity:number,name:string,image:string,price:number})=>{
    if(isAuthenticated){
        return dispatch(addItemsToCart(item))
    }else{
         toast.error("please login to add items to your cart")

    }
  },[isAuthenticated,dispatch]);

  const loadCart=useCallback(async()=>{
    if(isAuthenticated){
        return dispatch(loadCartItems())
    }
  },[isAuthenticated,dispatch])

   const clearCartData = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {cartItems,loading,updatingId,addToCart,updateQuantity,loadCart,clearCartData};
};
