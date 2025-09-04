import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

// type Product = Record<string, any>;
type User = Record<string, any>;
type Order = Record<string, any>;
type Review = Record<string, any>;

interface AdminState {
  products: Product[];
  success: boolean;
  loading: boolean;
  error: string | null;
  product: Product | {};
  deleting: Record<string, boolean>;
  users: User[];
  user: User | {};
  message: string | null;
  orders: Order[];
  totalAmount: number;
  order: Order | {};
  reviews: Review[];
  updated: boolean;
  eProduct: Product | null;
}

interface Product {
  [key: string]: any;
}

const initialState: AdminState = {
  products: [],
  success: false,
  loading: false,
  error: null,
  product: {},
  deleting: {},
  users: [],
  user: {},
  message: null,
  orders: [],
  totalAmount: 0,
  order: {},
  reviews: [],
  updated: false,
  eProduct: {},
};

interface GetProductDetailsResponse {
  product: Product;
}

// Fetch ALL Products
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/admin/products");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error While Fetching the products"
      );
    }
  }
);

// Create Product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData: Record<string, any>, { rejectWithValue }) => {
    try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   };
      console.log("productData ", productData);
      const { data } = await axiosInstance.post(
        "/api/v1/admin/product/create",
        productData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Product Creation Failed");
    }
  }
);

// Product Details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const link = `/api/v1/product/${id}`;
      const { data } = await axiosInstance.get(link);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Product Creation Failed");
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({id,productData}: {id:string, productData:Record<string, any>}, { rejectWithValue }) => {
    try {
      console.log("finally inside updateProduct thunk")
      console.log("id is ",id );
      console.log("productData is ",productData);
      // const id=productData.id;
      const { data } = await axiosInstance.put(
        `/api/v1/admin/product/${id}`,
        productData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Product Update Failed");
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/admin/product/${productId}`);
      return { productId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Product Deletion Failed");
    }
  }
);

// Fetch All Users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/admin/users`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

// Get single user
export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Single user"
      );
    }
  }
);

// Update User role
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async (
    { userId, role }: { userId: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.put(`/api/v1/admin/user/${userId}`, {
        role,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update user role"
      );
    }
  }
);

// Delete user profile
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/admin/user/${userId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to Delete User");
    }
  }
);

// Fetch All Orders
export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/admin/orders`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to Fetch Orders");
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/admin/order/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to Delete Order");
    }
  }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${orderId}`,
        { status },
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to Update Order status"
      );
    }
  }
);

// Fetch All Reviews
export const fetchProductReviews = createAsyncThunk(
  "admin/fetchProductReviews",
  async (productId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/reviews?id=${productId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to Fetch Product Reviews"
      );
    }
  }
);

// Delete Review
export const deleteReview = createAsyncThunk(
  "admin/deleteReview",
  async (
    { productId, reviewId }: { productId: string; reviewId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/admin/reviews?productId=${productId}&id=${reviewId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to Delete Product Review"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload.products;
        }
      )
      .addCase(
        fetchAdminProducts.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Error While Fetching the products";
        }
      )

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Product Creation Failed";
      })

      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductDetails.fulfilled,
        (state, action: PayloadAction<GetProductDetailsResponse>) => {
          state.loading = false;
          state.error = null;
          state.eProduct = action.payload.product;
        }
      )
      .addCase(getProductDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong, unable to fetch product right now";
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Product Update Failed";
      })

      .addCase(deleteProduct.pending, (state, action) => {
        const productId = action.meta.arg;
        state.deleting[productId] = true;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<{ productId: string }>) => {
          const productId = action.payload.productId;
          state.deleting[productId] = false;
          state.products = state.products.filter(
            (product) => product._id !== productId
          );
        }
      )
      //   .addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
      //     const productId = action.meta.arg;
      //     state.deleting[productId] = false;
      //     state.error = action.payload?.message || 'Product Deletion Failed';
      //   })

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.updated = false;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      })

      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch single users";
      })

      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = action.payload.success;
          state.updated = true;
        }
      )
      .addCase(updateUserRole.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update user role";
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Delete User";
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.totalAmount = action.payload.totalAmount;
        }
      )
      .addCase(fetchAllOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch Orders";
      })

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Delete Order";
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = action.payload.success;
          state.order = action.payload.order;
        }
      )
      .addCase(
        updateOrderStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Failed to Update Order status";
        }
      )

      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductReviews.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.reviews = action.payload.reviews;
        }
      )
      .addCase(
        fetchProductReviews.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Failed to Fetch Product Reviews";
        }
      )

      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteReview.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to Delete Product Review";
      });
  },
});

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
