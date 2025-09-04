import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Types
interface Order {
  [key: string]: any; // Allow any order properties since the original doesn't specify
}

interface OrderState {
  success: boolean | null;
  loading: boolean;
  error: string | null;
  orders: Order[];
  order: Order;
}

interface CreateOrderResponse {
  order: Order;
  success: boolean;
}

interface GetAllMyOrdersResponse {
  orders: Order[];
  success: boolean;
}

interface GetOrderDetailsResponse {
  order: Order;
  success: boolean;
}

interface ApiError {
  message?: string;
  [key: string]: any;
}

// Creating Order
export const createOrder = createAsyncThunk<CreateOrderResponse, any, { rejectValue: ApiError }>(
  'order/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post('/api/v1/new/order', order, config);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data || { message: 'Order Creating Failed' });
    }
  }
);

// Get User Orders
export const getAllMyOrders = createAsyncThunk<GetAllMyOrdersResponse, void, { rejectValue: ApiError }>(
  'order/getAllMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/v1/orders/user');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data || { message: 'Failed to fetch orders' });
    }
  }
);

// Get Order Details
export const getOrderDetails = createAsyncThunk<GetOrderDetailsResponse, string, { rejectValue: ApiError }>(
  'order/getOrderDetails',
  async (orderID, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${orderID}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data || { message: 'Failed to fetch order details' });
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    success: false,
    loading: false,
    error: null,
    orders: [],
    order: {}
  } as OrderState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    }
  },
  extraReducers: (builder) => [
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderResponse>) => {
        state.loading = false;
        state.order = action.payload.order;
        state.success = action.payload.success;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Order Creating Failed';
      }),
    // Get All user Order
    builder
      .addCase(getAllMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMyOrders.fulfilled, (state, action: PayloadAction<GetAllMyOrdersResponse>) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.success = action.payload.success;
      })
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
      }),
    // Get Order Details
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action: PayloadAction<GetOrderDetailsResponse>) => {
        state.loading = false;
        state.order = action.payload.order;
        state.success = action.payload.success;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch order details';
      })
  ]
});

export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;