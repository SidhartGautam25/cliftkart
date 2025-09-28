// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { AiOutlineHeart } from "react-icons/ai";
// import { useAppDispatch, useAppSelector } from "../../context/hooks";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   addItemsToCart,
//   loadCartItems,
//   removeFromCart,
//   removeMessage,
//   updateItemProperties,
// } from "../../context/cart/cartSlice";
// import { toast } from "react-toastify";
// import {
//   getProductDetails,
//   removeErrors,
// } from "../../context/product/productSlice";

// interface CartItem {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   properties?:Record<string,any>;
// }

// const ProductInfo: React.FC = () => {
//   // Default options
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor , setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [isQuantityInitialized, setIsQuantityInitialized] = useState(false);
//   const { loading, error, product } = useAppSelector((state) => state.product);
//   const { isAuthenticated } = useAppSelector((state) => state.user);
//   const {
//     loading: cartLoading,
//     error: cartError,
//     success,
//     message,
//     cartItems,
//     updatingId
//   } = useAppSelector((state) => state.cart);
//   console.log("product in this section of product page is ",product);
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [isPropertiesInitialized, setIsPropertiesInitialized] = useState(false);


//   const cartItem = useMemo(
//     () => (id ? cartItems.find((item) => item.id === id) || null : null),
//     [cartItems, id]
//   );
//   const availSizes=product?.size || [];
//   const availColors=product?.colors  || [];
//   const sizeCase=availSizes.length > 0 ? true : false;
//   const colorCase=availColors.length > 0 ? true : false;
//   const isInCart = useMemo(() => !!cartItem, [cartItem]); 

//    useEffect(() => {
//     if (product && !isPropertiesInitialized && !isInCart) {
//       if (availSizes.length > 0 && !selectedSize) {
//         setSelectedSize(availSizes[0]);
//       }
//       if (availColors.length > 0 && !selectedColor) {
//         setSelectedColor(availColors[0]);
//       }
//       setIsPropertiesInitialized(true);
//     }
//   }, [product, availSizes, availColors, isInCart, selectedSize, selectedColor, isPropertiesInitialized]);



//   // Cart logic
//  // const cartItem = useMemo(
//  //    () => (id ? cartItems.find((item) => item.id === id) || null : null),
//  //    [cartItems, id]
//  //  );
//   // const isInCart = useMemo(() => !!cartItem, [cartItem]);

//   useEffect(() => {
//     dispatch(loadCartItems());
//   }, [dispatch]);

//   useEffect(() => {
//     if (cartItem && !isQuantityInitialized) {
//       setQuantity(cartItem.quantity);
//       setIsQuantityInitialized(true);
//       if(cartItem.properties){
//         if(cartItem.properties.size){
//           setSelectedSize(cartItem.properties.size);
//         }
//         if(cartItem.properties.color){
//           setSelectedColor(cartItem.properties.color);
//         }
//       }
//       setIsPropertiesInitialized(true);
//       setIsQuantityInitialized(true);
//     } else if (!cartItem && !isQuantityInitialized) {
//       setQuantity(1);
//       setIsQuantityInitialized(true);
//     }
//   }, [cartItem, isQuantityInitialized]);

//    // Update properties when size or color changes (only if item is in cart)
//     useEffect(() => {
//     // Only run this effect if properties are initialized and item is in cart
//     if (isInCart && cartItem && id && isPropertiesInitialized) {
//       const newProperties = {
//         ...(selectedSize && { size: selectedSize }),
//         ...(selectedColor && { color: selectedColor }),
//       };
      
//       // Get current properties from cart item (could be undefined/empty)
//       const currentProperties = cartItem.properties || {};
      
//       // Check if properties actually changed
//       const sizeChanged = currentProperties.size !== selectedSize;
//       const colorChanged = currentProperties.color !== selectedColor;
//       const hasChanged = sizeChanged || colorChanged;
      
//       console.log("=== Property Update Check ===");
//       console.log("hasChanged:", hasChanged);
//       console.log("sizeChanged:", sizeChanged, `(${currentProperties.size} !== ${selectedSize})`);
//       console.log("colorChanged:", colorChanged, `(${currentProperties.color} !== ${selectedColor})`);
//       console.log("currentProperties:", currentProperties);
//       console.log("newProperties:", newProperties);
//       console.log("updatingId:", updatingId);
      
//       if (hasChanged && updatingId !== id) {
//         console.log("🔄 Updating properties...");
//         dispatch(updateItemProperties({ 
//           id, 
//           properties: newProperties 
//         }));
//       }
//     }
//   }, [selectedSize, selectedColor, isInCart, cartItem, id, dispatch, isPropertiesInitialized, updatingId]);

//   const addToCart = useCallback(() => {
//     console.log("you are trying to add item in cart")
//     if (!isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     if (!id || !product) {
//       toast.error("Product information is not available");
//       return;
//     }
//     if (quantity > (product.stock || 0)) {
//       toast.error(`Only ${product.stock} items available in stock`);
//       return;
//     }

//     // Include selected properties
//     const properties = {
//       ...(selectedSize && { size: selectedSize }),
//       ...(selectedColor && { color: selectedColor }),
//     };


//     const item: CartItem = {
//       id,
//       name: product.name,
//       image: product.image,
//       price: product.price,
//       quantity,
//       properties
//     };
//     dispatch(addItemsToCart(item));
//   }, [isAuthenticated, id, product, quantity, dispatch]);

//   useEffect(() => {
//     if (!id) {
//       toast.error("Error while loading Product");
//     } else {
//       dispatch(getProductDetails(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error("Error while loading Product");
//       dispatch(removeErrors());
//     }
//     if (cartError) {
//       toast.error(cartError);
//     }
//   }, [dispatch, error, cartError]);

//   useEffect(() => {
//     if (success) {
//       toast.success(message);
//       dispatch(removeMessage());
//     }
//   }, [dispatch, success, message]);

//   const decreaseQuantity = useCallback(() => {
//     if (quantity === 1) {
//       toast.error("Quantity cannot be less than 1");
//       return;
//     }
//     const newQuantity = quantity - 1;
//     setQuantity(newQuantity);
//     if (cartItem && id) {
//       dispatch(
//         addItemsToCart({
//           id,
//           name: product?.name || "",
//           image: product?.image || "",
//           price: product?.price || 0,
//           quantity: newQuantity,
//         })
//       );
//     }
//   }, [quantity, cartItem, id, dispatch, product]);

//   const increaseQuantity = useCallback(() => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     if (cartItem && id) {
//       dispatch(
//         addItemsToCart({
//           id,
//           name: product?.name || "",
//           image: product?.image || "",
//           price: product?.price || 0,
//           quantity: newQuantity,
//         })
//       );
//     }
//   }, [quantity, cartItem, id, dispatch, product]);

//   const RemoveFromCart = useCallback(() => {
//     if (!id) return;
//     if (window.confirm(`Remove ${product?.name} from your cart?`)) {
//       dispatch(removeFromCart(id));
//     }
//   }, [id, product?.name, dispatch]);

//   // Dynamic render helpers
//   const renderDynamicColors = () => (
//     <div className="flex items-center gap-2 flex-wrap">
//       <span className="font-medium">Colours:</span>
//       {availColors.map((color: string, index: number) => (
//         <button
//           key={index}
//           onClick={() => setSelectedColor(color)} // Set the selected color on click
//           className={`w-6 h-6 rounded-full border shadow-sm transition-transform duration-200 ease-in-out
//             ${
//               selectedColor === color
//                 ? 'ring-2 ring-offset-2 ring-black scale-110' // Style for the selected color
//                 : 'border-gray-300' // Default style
//             }
//           `}
//           style={{ backgroundColor: color }}
//           title={color}
//         />
//       ))}
//     </div>
//   );
//   const renderSizeOptions = () => (
//     <div className="flex items-center gap-2 flex-wrap">
//       <span className="font-medium">Size:</span>
//       {availSizes.map((size : string) => (
//         <button
//           key={size}
//           className={`px-3 py-1 border rounded ${
//             selectedSize === size
//               ? "bg-black text-white"
//               : "text-black border-gray-300"
//           }`}
//           onClick={() => setSelectedSize(size)}
//         >
//           {size}
//         </button>
//       ))}
//     </div>
//   );

//   if (!id) {
//     return <div className="text-center text-red-500">Invalid product ID</div>;
//   }
//   if (loading) {
//     return <div className="animate-pulse text-gray-500">Loading...</div>;
//   }
//   if (!product) {
//     return <div className="text-center text-red-500">Product not found</div>;
//   }

//   return (
//     <div className="w-full md:w-1/2 px-4 py-6 space-y-4">
//       <h1 className="text-xl font-semibold">{product?.name}</h1>
//       <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
//         <span>⭐⭐⭐⭐☆</span>
//         <span>(150 Reviews)</span>
//         <span className="text-green-600 ml-2">In Stock</span>
//       </div>
//       <div className="text-xl font-bold">Rs {product?.price}</div>
//       <p className="text-sm text-gray-600">{product?.description}</p>
//       <hr />

//       {colorCase && (
//         <>
//           {renderDynamicColors()}
//         </>
//       )}
//        {sizeCase && (
//         <>
//           {renderSizeOptions()}
//         </>
//       )}

//       {/* Quantity & Cart */}
//       <div className="flex items-center gap-2 flex-wrap">
//         <button onClick={decreaseQuantity} className="px-3 py-1 border">−</button>
//         <span>{quantity}</span>
//         <button onClick={increaseQuantity} className="px-3 py-1 border">+</button>

//         {!isInCart ? (
//           <button
//             className={`ml-4 px-5 py-2 rounded ${
//               cartLoading || product.stock === 0
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-500 hover:bg-red-600 text-white"
//             }`}
//             onClick={addToCart}
//             disabled={cartLoading || product.stock === 0}
//           >
//             {cartLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add To Cart"}
//           </button>
//         ) : (
//           <div className="ml-4 flex items-center gap-2 flex-wrap">
//             <button className="bg-green-500 text-white px-5 py-2 rounded">
//               ✓ In Cart ({cartItem?.quantity})
//             </button>
//             <button
//               className="text-red-500 text-sm underline hover:text-red-700"
//               onClick={RemoveFromCart}
//             >
//               Remove
//             </button>
//           </div>
//         )}
//         <button className="ml-2 border p-2 rounded">
//           <AiOutlineHeart size={20} />
//         </button>
//       </div>

//       {/* Delivery Info */}
//       <div className="border mt-4 divide-y">
//         <div className="px-4 py-2 text-sm">
//           <strong>Free Delivery</strong>
//           <div className="text-gray-600 text-xs">
//             Enter your postal code for Delivery Availability
//           </div>
//         </div>
//         <div className="px-4 py-2 text-sm">
//           <strong>Return Delivery</strong>
//           <div className="text-gray-600 text-xs">
//             Free 30 Days Delivery Returns. Details
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  addItemsToCart,
  loadCartItems,
  removeFromCart,
  removeMessage,
  updateItemProperties,
} from "../../context/cart/cartSlice";
import { toast } from "react-toastify";
import {
  getProductDetails,
  removeErrors,
} from "../../context/product/productSlice";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  properties?: Record<string, any>;
}

const ProductInfo: React.FC = () => {
  // Default options
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isQuantityInitialized, setIsQuantityInitialized] = useState(false);
  const [isPropertiesInitialized, setIsPropertiesInitialized] = useState(false);
  
  const { loading, error, product } = useAppSelector((state) => state.product);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
    cartItems,
    updatingId,
  } = useAppSelector((state) => state.cart);
  
  console.log("product in this section of product page is ", product);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const availSizes = product?.size || [];
  const availColors = product?.colors || [];
  const sizeCase = availSizes.length > 0;
  const colorCase = availColors.length > 0;

  // Cart logic
  const cartItem = useMemo(
    () => (id ? cartItems.find((item) => item.id === id) || null : null),
    [cartItems, id]
  );
  const isInCart = useMemo(() => !!cartItem, [cartItem]);

  useEffect(() => {
    dispatch(loadCartItems());
  }, [dispatch]);

  // Initialize default selections from product (only once when product loads)
  useEffect(() => {
    if (product && !isPropertiesInitialized && !isInCart) {
      if (availSizes.length > 0 && !selectedSize) {
        setSelectedSize(availSizes[0]);
      }
      if (availColors.length > 0 && !selectedColor) {
        setSelectedColor(availColors[0]);
      }
      setIsPropertiesInitialized(true);
    }
  }, [product, availSizes, availColors, isInCart, selectedSize, selectedColor, isPropertiesInitialized]);

  // Initialize from cart item (restore saved properties)
  useEffect(() => {
    console.log("this use effect is running or not ")
    if (cartItem) {
      console.log("Initializing from cart item:", cartItem);
      console.log("cartItem quantity seeting from  ");
      console.log("cartitem quantities are ",cartItem.quantity);
      setQuantity(cartItem.quantity);
      
      // Restore properties from cart
      if (cartItem.properties) {
        console.log("Restoring properties:", cartItem.properties);
        if (cartItem.properties.size) {
          setSelectedSize(cartItem.properties.size);
        }
        if (cartItem.properties.color) {
          setSelectedColor(cartItem.properties.color);
        }
      }
      
      
      setIsPropertiesInitialized(true);
    } else if (!cartItem && !isQuantityInitialized) {
      setQuantity(1);
      
    }
  }, [cartItem]);

  // Handle property updates manually when size/color changes
  const handleSizeChange = useCallback((size: string) => {
    setSelectedSize(size);
    
    // If item is in cart, update properties immediately
    if (isInCart && cartItem && id) {
      const newProperties = {
        ...(size && { size }),
        ...(selectedColor && { color: selectedColor }),
      };
      
      // Only update if the size actually changed
      if (cartItem.properties?.size !== size) {
        dispatch(updateItemProperties({ 
          id, 
          properties: newProperties 
        }));
      }
    }
  }, [isInCart, cartItem, id, selectedColor, dispatch]);

  const handleColorChange = useCallback((color: string) => {
    setSelectedColor(color);
    
    // If item is in cart, update properties immediately
    if (isInCart && cartItem && id) {
      const newProperties = {
        ...(selectedSize && { size: selectedSize }),
        ...(color && { color }),
      };
      
      // Only update if the color actually changed
      if (cartItem.properties?.color !== color) {
        console.log("you are going to update the item color");
        dispatch(updateItemProperties({ 
          id, 
          properties: newProperties 
        }));
      }
    }
  }, [isInCart, cartItem, id, selectedSize, dispatch]);

  const addToCart = useCallback(() => {
    console.log("you are trying to add item in cart");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!id || !product) {
      toast.error("Product information is not available");
      return;
    }
    if (quantity > (product.stock || 0)) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }

    // Include selected properties
    const properties = {
      ...(selectedSize && { size: selectedSize }),
      ...(selectedColor && { color: selectedColor }),
    };

    console.log("Adding to cart with properties:", properties);

    const item: CartItem = {
      id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      properties
    };
    dispatch(addItemsToCart(item));
  }, [isAuthenticated, id, product, quantity, selectedSize, selectedColor, dispatch]);

  useEffect(() => {
    if (!id) {
      toast.error("Error while loading Product");
    } else {
      dispatch(getProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error while loading Product");
      dispatch(removeErrors());
    }
    if (cartError) {
      toast.error(cartError);
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const decreaseQuantity = useCallback(() => {
    if (quantity === 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    const newQuantity = Number(quantity) - 1;
    setQuantity(newQuantity);
    if (cartItem && id) {
      const properties = {
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
      };
      dispatch(
        addItemsToCart({
          id,
          name: product?.name || "",
          image: product?.image || "",
          price: product?.price || 0,
          quantity: newQuantity,
          properties,
        })
      );
    }
  }, [quantity, cartItem, id, dispatch, product, selectedSize, selectedColor]);

  const increaseQuantity = useCallback(() => {
    const newQuantity = Number(quantity) + 1;
    setQuantity(newQuantity);
    if (cartItem && id) {
      const properties = {
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
      };
      dispatch(
        addItemsToCart({
          id,
          name: product?.name || "",
          image: product?.image || "",
          price: product?.price || 0,
          quantity: newQuantity,
          properties,
        })
      );
    }
  }, [quantity, cartItem, id, dispatch, product, selectedSize, selectedColor]);

  const RemoveFromCart = useCallback(() => {
    if (!id) return;
    if (window.confirm(`Remove ${product?.name} from your cart?`)) {
      dispatch(removeFromCart(id));
      // Reset initialization flags so properties get reset to defaults
      setIsQuantityInitialized(false);
      setIsPropertiesInitialized(false);
    }
  }, [id, product?.name, dispatch]);

  // Dynamic render helpers
  const renderDynamicColors = () => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-medium">Colours:</span>
      {availColors.map((color: string, index: number) => (
        <button
          key={index}
          onClick={() => handleColorChange(color)}
          disabled={updatingId === id}
          className={`w-6 h-6 rounded-full border shadow-sm transition-transform duration-200 ease-in-out
            ${
              selectedColor === color
                ? 'ring-2 ring-offset-2 ring-black scale-110'
                : 'border-gray-300'
            }
            ${updatingId === id ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
      {updatingId === id && <span className="text-xs text-gray-500 ml-2">Updating...</span>}
    </div>
  );

  const renderSizeOptions = () => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-medium">Size:</span>
      {availSizes.map((size: string) => (
        <button
          key={size}
          className={`px-3 py-1 border rounded transition-colors
            ${
              selectedSize === size
                ? "bg-black text-white"
                : "text-black border-gray-300 hover:border-gray-500"
            }
            ${updatingId === id ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => handleSizeChange(size)}
          disabled={updatingId === id}
        >
          {size}
        </button>
      ))}
      {updatingId === id && <span className="text-xs text-gray-500 ml-2">Updating...</span>}
    </div>
  );

  if (!id) {
    return <div className="text-center text-red-500">Invalid product ID</div>;
  }
  if (loading) {
    return <div className="animate-pulse text-gray-500">Loading...</div>;
  }
  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="w-full md:w-1/2 px-4 py-6 space-y-4">
      <h1 className="text-xl font-semibold">{product?.name}</h1>
      <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        <span>⭐⭐⭐⭐☆</span>
        <span>(150 Reviews)</span>
        <span className="text-green-600 ml-2">In Stock</span>
      </div>
      <div className="text-xl font-bold">Rs {product?.price}</div>
      <p className="text-sm text-gray-600">{product?.description}</p>
      <hr />

      {/* Debug info - remove this in production */}
      

      {colorCase && renderDynamicColors()}
      {sizeCase && renderSizeOptions()}

      {/* Show selected properties for cart items */}
      {isInCart && cartItem?.properties && (
        <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded border">
          <strong>Currently Selected:</strong>
          {cartItem.properties.size && <span className="ml-2">Size: {cartItem.properties.size}</span>}
          {cartItem.properties.color && <span className="ml-2">Color: {cartItem.properties.color}</span>}
        </div>
      )}

      {/* Quantity & Cart */}
      <div className="flex items-center gap-2 flex-wrap">
        <button 
          onClick={decreaseQuantity} 
          className="px-3 py-1 border hover:bg-gray-100"
          disabled={updatingId === id}
        >
          −
        </button>
        <span>{quantity}</span>
        <button 
          onClick={increaseQuantity} 
          className="px-3 py-1 border hover:bg-gray-100"
          disabled={updatingId === id}
        >
          +
        </button>

        {!isInCart ? (
          <button
            className={`ml-4 px-5 py-2 rounded ${
              cartLoading || product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            onClick={addToCart}
            disabled={cartLoading || product.stock === 0}
          >
            {cartLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>
        ) : (
          <div className="ml-4 flex items-center gap-2 flex-wrap">
            <button className="bg-green-500 text-white px-5 py-2 rounded">
              ✓ In Cart ({cartItem?.quantity})
            </button>
            <button
              className="text-red-500 text-sm underline hover:text-red-700"
              onClick={RemoveFromCart}
            >
              Remove
            </button>
          </div>
        )}
        <button className="ml-2 border p-2 rounded hover:bg-gray-50">
          <AiOutlineHeart size={20} />
        </button>
      </div>

      {/* Delivery Info */}
      <div className="border mt-4 divide-y">
        <div className="px-4 py-2 text-sm">
          <strong>Free Delivery</strong>
          <div className="text-gray-600 text-xs">
            Enter your postal code for Delivery Availability
          </div>
        </div>
        <div className="px-4 py-2 text-sm">
          <strong>Return Delivery</strong>
          <div className="text-gray-600 text-xs">
            Free 30 Days Delivery Returns. Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
