import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../context/hooks";
// import { useNavigate } from "react-router-dom";
import { addItemsToCart, removeFromCart } from "../../context/cart/cartSlice";

interface CartItem {
  [key: string]: any;
}



type Props = {
  item: CartItem;
  // onQuantityChange?: (id: string, qty: number) => void;
  // onRemove?: (id: string) => void;
  // onSaveForLater?: (id: string) => void;
};

const CartCard: React.FC<Props> = ({ item}) => {
  const subtotal = item.price * item.quantity;
  const savings = Math.max(0, (item.oldPrice || item.price) - item.price);
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
  // const [isQuantityInitialized, setIsQuantityInitialized] = useState(false);
  // const { loading, error, product } = useAppSelector((state) => state.product);
  // const { isAuthenticated } = useAppSelector((state) => state.user);
  // const {
  //   loading: cartLoading,
  //   error: cartError,
  //   success,
  //   message,
  // } = useAppSelector((state) => state.cart);
 
  const dispatch = useAppDispatch();
 


  const decreaseQuantity = useCallback((e:React.MouseEvent) => {
     e.stopPropagation(); 
    if (quantity === 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    const newQuantity = Number(quantity) - 1;
    
    if (item) {
      dispatch(
        addItemsToCart({
          id:item.id,
          name: item?.name || "",
          image: item?.image || "",
          price: item?.price || 0,
          quantity: newQuantity,
        })
      );
      setQuantity(newQuantity);
    }
  }, [quantity, item , dispatch]);

  const increaseQuantity = useCallback((e:React.MouseEvent) => {
    e.stopPropagation(); 
    const newQuantity = Number(quantity) + 1;
    
    if (item) {
      dispatch(
        addItemsToCart({
          id:item.id,
          name: item?.name || "",
          image: item?.image || "",
          price: item?.price || 0,
          quantity: newQuantity,
        })
      );
      setQuantity(newQuantity);
    }
  }, [quantity, item , dispatch]);

  const RemoveFromCart = useCallback((e:React.MouseEvent) => {
     e.stopPropagation(); 
    if (!item) return;
    if (window.confirm(`Remove ${item?.name} from your cart?`)) {
      dispatch(removeFromCart(item.id));
    }
  }, [item.id, item?.name, dispatch]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-full">
      {/* Top row: Image | Main info (name/price/qty-on-desktop) | Subtotal */}
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-16 h-20 sm:w-24 sm:h-28 object-cover rounded border border-gray-100"
          />
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          {/* Title, size, seller */}
          <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">
            {item.name}
          </h3>
          {item.size && <p className="text-xs sm:text-sm text-gray-600 mt-1">Size: {item.size}</p>}
          {item.seller && (
            <p className="text-xs sm:text-sm text-gray-600">
              Seller: <span className="text-blue-600">{item.seller}</span>
            </p>
          )}

          {/* Price row (unit price, old price, discount) */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {item.oldPrice > item.price && (
              <span className="text-gray-500 line-through text-xs sm:text-sm">₹{item.oldPrice}</span>
            )}
            <p className="text-xs text-gray-600">Price:</p><span className="text-base sm:text-lg font-semibold text-gray-900">₹{item.price}</span>
            {item.discountPercent > 0 && (
              <span className="text-green-600 font-medium text-xs sm:text-sm">{item.discountPercent}% Off</span>
            )}
            {savings > 0 && (
              <span className="text-xs text-gray-500 ml-1">You save ₹{savings}</span>
            )}
          </div>

          {/* Quantity - shown inline under price on desktop (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-3 mt-3">
            <label className="text-sm text-gray-600">Qty:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                aria-label="decrease quantity"
                className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                onClick={decreaseQuantity}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="px-4 text-sm">{quantity}</span>
              <button
                aria-label="increase quantity"
                className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Delivery info (mobile+desktop) */}
          {item.deliveryInfo && (
            <p className="text-xs sm:text-sm text-gray-700 mt-2">{item.deliveryInfo}</p>
          )}
        </div>

        {/* Subtotal - always aligned right */}
        <div className="ml-auto text-right flex-shrink-0">
          <p className="text-xs text-gray-600">Subtotal:</p>
          <p className="text-lg font-semibold text-gray-900">₹{subtotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Mobile quantity block (visible on mobile only) */}
      <div className="sm:hidden mt-3">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Qty:</label>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              aria-label="decrease quantity"
              className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="px-4 text-sm">{quantity}</span>
            <button
              aria-label="increase quantity"
              className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Actions (Save/Remove) */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        <button
          // onClick={() => onSaveForLater?.(item.id)}
          className="text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          ADD TO WISHLIST
        </button>

        <button
           onClick={RemoveFromCart}
          className="text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartCard;
