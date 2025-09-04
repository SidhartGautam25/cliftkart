// components/dashboard/UsersComponent.tsx
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { fetchAdminProducts } from "../../../context/admin/adminSlice";
import AProductCard from "../common/AProductCard";

const ProductsComponent: React.FC = () => {
  const { products, error,updated} = useAppSelector((state) => state.admin);
  
    const dispatch = useAppDispatch();
  
     // Dummy delete handler
    // const handleDelete = (id: string) => {
    //   console.log("Delete user:", id);
    //   toast.info("Delete handler not implemented yet");
    // };
  
    
  
    useEffect(() => {
      dispatch(fetchAdminProducts());
    }, [dispatch]);
  
    useEffect(() => {
      console.log("need to update the state of admin")
      dispatch(fetchAdminProducts());
    }, [updated]);
  
    useEffect(() => {
      if (error) {
        toast.error("Error while loading Product", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    });
  return <div className="text-gray-800 text-xl">
    <div>
     {products?.length === 0 ? (
        <p className="text-gray-500 italic">No products found.</p>
      ) : (
        products?.map((product) => (
          <AProductCard product={product} id={product._id}/>
        ))
      )}
    </div></div>;
 
};

export default ProductsComponent;
