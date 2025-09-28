import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosConfig";
import { StorageManager } from "../../utils/storageManager";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  properties?: Record<string, any>;
}

interface ShippingInfo {
  [key: string]: any; // Allow any shipping properties
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  removingId: string | null;
  updatingId: string | null;
  shippingInfo: ShippingInfo;
}

interface AddItemParams {
  id: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  properties?: Record<string, any>;
}

interface UpdatePropertiesParams {
    id: string;
    properties: Record<string, any>;
}

interface ProductResponse {
  productId: string;
  quantity: string;
  properties?:Record<string , any>;
  success: boolean;
}

interface ApiError {
  message?: string;
  [key: string]: any;
}

// Add items to cart
export const addItemsToCart = createAsyncThunk<
  CartItem,
  AddItemParams,
  { rejectValue: ApiError }
>(
  "cart/addItemsToCart",
  async ({ id, quantity, name, image, price, properties }, { rejectWithValue }) => {
    try {
      const productId = id;
      console.log("going to add it to cart")
      const { data }: { data: ProductResponse } = await axiosInstance.post(
        `/api/v1/addToCart`,
        { productId, quantity , properties }
      );

      return {
        id: data.productId,
        quantity: quantity,
        name,
        image,
        price,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(
        axiosError.response?.data || { message: "An Error Occurred" }
      );
    }
  }
);

export const loadCartItems = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: ApiError }
>("cart/loadCartItems", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/api/v1/loadCart");
    return data.cartItems;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data || { message: "Failed to load cart Items" }
    );
  }
});


//  Update item properties in the cart **
export const updateItemProperties = createAsyncThunk<
    { id: string; properties: Record<string, any> },
    UpdatePropertiesParams,
    { rejectValue: ApiError }
>("cart/updateItemProperties", async ({ id, properties }, { rejectWithValue }) => {
    try {
        const productId = id;
        console.log("going to send the request for chnaging property to server");
        // Assuming a new endpoint for updating properties
        const { data } = await axiosInstance.put(`/api/v1/cart/updateItem`, {
            productId,
            properties,
        });
        return { id: data.productId, properties: data.properties };
    } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(
            axiosError.response?.data || { message: "Failed to update item properties" }
        );
    }
});

export const removeFromCart = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>("cart/removeFromCart", async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/api/v1/removeFromCart/${productId}`
    );

    return data.productId;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data || { message: "An Error Occurred" }
    );
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[],
    cartItems: StorageManager.getCartItems(),
    loading: false,
    error: null,
    success: false,
    message: null,
    removingId: null,
    // shippingInfo: JSON.parse(localStorage.getItem('shippingInfo') || '{}') as ShippingInfo
    shippingInfo: StorageManager.getShippingInfo(),
  } as CartState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.removingId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id != action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.removingId = null;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.shippingInfo = {};
      StorageManager.clearCartData();

      // localStorage.removeItem('cartItems');
      // localStorage.removeItem('shippingInfo');
    },
  },
  extraReducers: (builder) => {
    // Add items to cart
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemsToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          const item = action.payload;
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.quantity = item.quantity;
            state.message = `Updated ${existingItem.name} quantity in the cart`;
          } else {
            state.cartItems.push(item);
            state.message = `${item.name} is added to cart successfully`;
          }
          state.loading = false;
          state.error = null;
          state.success = true;
          // localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          StorageManager.setCartItems(state.cartItems);
        }
      )
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      })
      .addCase(loadCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          console.log("action.payload is ", action.payload);
          state.cartItems = action.payload;
          state.loading = false;
          state.error = null;
          // localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
          StorageManager.setCartItems(state.cartItems);
        }
      )
      .addCase(loadCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "An error Occured while loading cart items";
      })
       .addCase(updateItemProperties.pending, (state, action) => {
          state.updatingId = action.meta.arg.id;
          state.error = null;
      })
      .addCase(updateItemProperties.fulfilled, (state, action) => {
          const { id, properties } = action.payload;
          const itemToUpdate = state.cartItems.find((item) => item.id === id);
          if (itemToUpdate) {
              itemToUpdate.properties = properties;
              state.message = `Updated properties for ${itemToUpdate.name}`;
          }
          state.updatingId = null;
          state.success = true;
          StorageManager.setCartItems(state.cartItems);
      })
      .addCase(updateItemProperties.rejected, (state, action) => {
          state.updatingId = null;
          state.error = action.payload?.message || "Failed to update properties";
      })
      // .addCase(removeItemsToCart.pending, (state) => {
        
      //   state.error = null;
      // })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          const removedItemId = action.payload;
          const removedItem = state.cartItems.find(
            (item) => item.id === removedItemId
          );

          state.cartItems = state.cartItems.filter(
            (item) => item.id !== removedItemId
          );
          state.removingId = null;
          state.success = true;
          state.message = removedItem
            ? `${removedItem.name} removed from cart`
            : "Item removed from cart";

          StorageManager.setCartItems(state.cartItems);
        }
      )
      .addCase(removeFromCart.rejected, (state, action) => {
        state.removingId = null;
        state.error =
          action.payload?.message || "Failed to remove item from cart";
      });
  },
});

export const {
  removeErrors,
  removeMessage,
  removeItemFromCart,
  saveShippingInfo,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
