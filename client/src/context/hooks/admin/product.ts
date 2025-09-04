import { useCallback } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductDetails, updateProduct } from "../../admin/adminSlice";


export const useAdminProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Select relevant state from the admin slice
  const { 
    eProduct: product, 
    loading, 
    error, 
    success 
  } = useAppSelector((state) => state.admin);

  /**
   * Fetch product details by ID
   */
  const fetchProductDetails = useCallback(async (id: string) => {
    try {
        console.log("checking how many times i get called")
      const resultAction = await dispatch(getProductDetails(id));
      if (getProductDetails.fulfilled.match(resultAction)) {
        return resultAction.payload.product;
      } else {
        throw new Error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
      throw error;
    }
  }, [dispatch]);

  /**
   * Update product with new data
   */
  const handleUpdateProduct = useCallback(async (pid:string,productData: Record<string,any>) => {
    try {
        console.log("you are inside of the function which you called to dispatch updateProduct")
      const resultAction = await dispatch(updateProduct({ id:pid,productData }));
      
      if (updateProduct.fulfilled.match(resultAction)) {
        toast.success("Product updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        return resultAction.payload.product;
      } else {
        throw new Error(resultAction.payload as string || "Product update failed");
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Failed to update product");
      throw error;
    }
  }, [dispatch]);

  /**
   * Navigate to product edit page
   */
  const navigateToEdit = useCallback((id: string) => {
    navigate(`/admin/products/edit/${id}`);
  }, [navigate]);

  /**
   * Navigate back to products list
   */
  const navigateToList = useCallback(() => {
    navigate("/admin/products");
  }, [navigate]);

  return {
    product,
    loading,
    error,
    success,
    fetchProductDetails,
    updateProduct: handleUpdateProduct,
    navigateToEdit,
    navigateToList,
  };
};