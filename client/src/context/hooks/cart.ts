import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItemsToCart, clearCart, loadCartItems , updateItemProperties} from "../cart/cartSlice";
import { toast } from "react-toastify";


interface UpdatePropertiesParams {
    id: string;
    properties: Record<string, any>;
}


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


  const handleUpdateProperties = useCallback(async ({ id, properties }: UpdatePropertiesParams) => {
    if (isAuthenticated) {
        try {
            await dispatch(updateItemProperties({ id, properties })).unwrap();
            toast.success("Item properties updated successfully!");
        } catch (err: any) {
            console.error("Failed to update properties:", err);
            toast.error(err.message || "Failed to update item properties.");
        }
    } else {
        toast.error("Please login to update item properties.");
    }
  }, [isAuthenticated, dispatch]);

  const loadCart=useCallback(async()=>{
    if(isAuthenticated){
        return dispatch(loadCartItems())
    }
  },[isAuthenticated,dispatch])

   const clearCartData = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {cartItems,loading,updatingId,addToCart,updateQuantity,loadCart,clearCartData , handleUpdateProperties};
};
