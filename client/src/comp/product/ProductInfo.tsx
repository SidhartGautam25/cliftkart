import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  addItemsToCart,
  loadCartItems,
  removeFromCart,
  removeMessage,
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
}

const ProductInfo: React.FC = () => {
  // Default options
  const sizes = ["XS", "S", "M", "L", "XL"];
  const bookFormats = ["Paperback", "Hardcover"];
  const electronicsColors = ["black", "silver", "white"];
  const shoeSizes = ["6", "7", "8", "9", "10", "11"];
  const furnitureMaterials = ["Wood", "Metal", "Plastic"];
// for now
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFormat, setSelectedFormat] = useState("Paperback");
  const [quantity, setQuantity] = useState<number>(1);
  const [isQuantityInitialized, setIsQuantityInitialized] = useState(false);

  const { loading, error, product } = useAppSelector((state) => state.product);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
    cartItems,
  } = useAppSelector((state) => state.cart);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Cart logic
  const cartItem = useMemo(
    () => (id ? cartItems.find((item) => item.id === id) || null : null),
    [cartItems, id]
  );
  const isInCart = useMemo(() => !!cartItem, [cartItem]);

  useEffect(() => {
    dispatch(loadCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (cartItem && !isQuantityInitialized) {
      setQuantity(cartItem.quantity);
      setIsQuantityInitialized(true);
    } else if (!cartItem && !isQuantityInitialized) {
      setQuantity(1);
      setIsQuantityInitialized(true);
    }
  }, [cartItem, isQuantityInitialized]);

  const addToCart = useCallback(() => {
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
    const item: CartItem = {
      id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    };
    dispatch(addItemsToCart(item));
  }, [isAuthenticated, id, product, quantity, dispatch]);

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
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (cartItem && id) {
      dispatch(
        addItemsToCart({
          id,
          name: product?.name || "",
          image: product?.image || "",
          price: product?.price || 0,
          quantity: newQuantity,
        })
      );
    }
  }, [quantity, cartItem, id, dispatch, product]);

  const increaseQuantity = useCallback(() => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (cartItem && id) {
      dispatch(
        addItemsToCart({
          id,
          name: product?.name || "",
          image: product?.image || "",
          price: product?.price || 0,
          quantity: newQuantity,
        })
      );
    }
  }, [quantity, cartItem, id, dispatch, product]);

  const RemoveFromCart = useCallback(() => {
    if (!id) return;
    if (window.confirm(`Remove ${product?.name} from your cart?`)) {
      dispatch(removeFromCart(id));
    }
  }, [id, product?.name, dispatch]);

  // Dynamic render helpers
  const renderDynamicColors = (colors: string[]) => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-medium">Colours:</span>
      {colors.map((color, index) => (
        <button
          key={index}
          className="w-5 h-5 rounded-full border shadow-sm"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );

  const renderSizeOptions = (options: string[]) => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-medium">Size:</span>
      {options.map((size) => (
        <button
          key={size}
          className={`px-3 py-1 border rounded ${
            selectedSize === size
              ? "bg-black text-white"
              : "text-black border-gray-300"
          }`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );

  const renderBookFormats = () => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-medium">Format:</span>
      {bookFormats.map((format) => (
        <button
          key={format}
          className={`px-3 py-1 border rounded ${
            selectedFormat === format
              ? "bg-black text-white"
              : "text-black border-gray-300"
          }`}
          onClick={() => setSelectedFormat(format)}
        >
          {format}
        </button>
      ))}
    </div>
  );

  const renderMaterials = (materials: string[]) => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-medium">Material:</span>
      {materials.map((mat) => (
        <button
          key={mat}
          className="px-3 py-1 border rounded text-black border-gray-300"
        >
          {mat}
        </button>
      ))}
    </div>
  );

  const category = product?.category?.toLowerCase();

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

      {category === "fashion" && (
        <>
          {renderDynamicColors(["red", "blue", "black", "green"])}
          {renderSizeOptions(sizes)}
        </>
      )}
      {category === "watches" && renderDynamicColors(["black", "brown", "silver"])}
      {category === "books" && renderBookFormats()}
      {category === "electronics" && renderDynamicColors(electronicsColors)}
      {category === "shoes" && (
        <>
          {renderDynamicColors(["black", "white", "blue"])}
          {renderSizeOptions(shoeSizes)}
        </>
      )}
      {category === "furniture" && renderMaterials(furnitureMaterials)}

      {/* Quantity & Cart */}
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={decreaseQuantity} className="px-3 py-1 border">−</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} className="px-3 py-1 border">+</button>

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
        <button className="ml-2 border p-2 rounded">
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
