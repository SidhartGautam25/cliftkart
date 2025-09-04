import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import  { AxiosError } from 'axios';
import { findCategoryIndex } from '../../utils/categories';
import axiosInstance from '../../utils/axiosConfig';

// Types
interface Product {
    [key: string]: any; 
}
  
interface ProductState {
    products: Product[];
    productCount: number;
    loading: boolean;
    error: string | null;
    product: Product | null;
    resultsPerPage: number;
    totalPages: number;
    reviewSuccess: boolean;
    reviewLoading: boolean;
}
  
interface GetProductParams {
    keyword?: string;
    page?: number;
    category?: string;
    tag?:string;
}
  

interface GetProductResponse {
    products: Product[];
    productCount: number;
    resultsPerPage: number;
    totalPages: number;
}
  

interface GetProductDetailsResponse {
    product: Product;
}
  
interface CreateReviewParams {
    rating: number;
    comment: string;
    productId: string;
}
  
interface CreateReviewResponse {
    [key: string]: any;
}
  
interface ApiError {
    message?: string;
    [key: string]: any;
}
  

export const getProduct = createAsyncThunk<GetProductResponse, GetProductParams, { rejectValue: ApiError }>(
    'product/getProduct',
    async ({ page = 1, category }, { rejectWithValue }) => {
      console.log("tring to fetch product");
      try {
        let link = '/api/v1/products?page=' + page;
        if (category) {
          const cat=findCategoryIndex(category);
          link += `&category=${cat}`;
        }
      
       console.log("tring to get products");
        const { data } = await axiosInstance.get(link);
        console.log("data is ",data);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'An error occurred' });
      }
    }
);


export const getProductByTags = createAsyncThunk<GetProductResponse, GetProductParams, { rejectValue: ApiError }>(
    'product/getProductBytags',
    async ({ page = 1, tag }, { rejectWithValue }) => {
      console.log("tring to fetch product");
      try {
        let link = '/api/v1/productsByTag?page=' + page;
        if (tag) {
          const cat=findCategoryIndex(tag);
          link += `&category=${cat}`;
        }
      
       console.log("tring to get products");
        const { data } = await axiosInstance.get(link);
        console.log("data is ",data);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'An error occurred' });
      }
    }
);



  

// Product Details
export const getProductDetails = createAsyncThunk<GetProductDetailsResponse, string, { rejectValue: ApiError }>(
    'product/getProductDetails',
    async (id, { rejectWithValue }) => {
      try {
        const link = `/api/v1/product/${id}`;
        const { data } = await axiosInstance.get(link);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'An error occurred' });
      }
    }
);
  
// Submit Review
export const createReview = createAsyncThunk<CreateReviewResponse, CreateReviewParams, { rejectValue: ApiError }>(
    'product/createReview',
    async ({ rating, comment, productId }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
  
        const { data } = await axiosInstance.put('/api/v1/review', { rating, comment, productId }, config);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'An error occurred' });
      }
    }
  );
  

  
const productSlice = createSlice({
    name: 'product',
    initialState: {
      products: [],
      productCount: 0,
      loading: false,
      error: null,
      product: null,
      resultsPerPage: 4,
      totalPages: 0,
      reviewSuccess: false,
      reviewLoading: false
    } as ProductState,
    reducers: {
      removeErrors: (state) => {
        state.error = null;
      },
      removeSuccess: (state) => {
        state.reviewSuccess = false;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProduct.fulfilled, (state, action: PayloadAction<GetProductResponse>) => {
          state.loading = false;
          state.error = null;
          state.products = action.payload.products;
          state.productCount = action.payload.productCount;
          state.resultsPerPage = action.payload.resultsPerPage;
          state.totalPages = action.payload.totalPages;
        })
        .addCase(getProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Something went wrong';
          state.products = [];
        })
       
  
      builder
        .addCase(getProductDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProductDetails.fulfilled, (state, action: PayloadAction<GetProductDetailsResponse>) => {
          state.loading = false;
          state.error = null;
          state.product = action.payload.product;
        })
        .addCase(getProductDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Something went wrong';
        });
  
      builder
        .addCase(createReview.pending, (state) => {
          state.reviewLoading = true;
          state.error = null;
        })
        .addCase(createReview.fulfilled, (state) => {
          state.reviewLoading = false;
          state.reviewSuccess = true;
        })
        .addCase(createReview.rejected, (state, action) => {
          state.reviewLoading = false;
          state.error = action.payload?.message || 'Something went wrong';
        });
    }
  });
  
export const { removeErrors, removeSuccess } = productSlice.actions;
export default productSlice.reducer;
