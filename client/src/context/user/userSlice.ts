import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosConfig";
import { StorageManager } from "../../utils/storageManager";

interface User {
  [key: string]: any;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean | null;
  isAuthenticated: boolean;
  message: string | null;
}

interface ApiResponse {
  success?: boolean;
  user?: User;
  message?: string;
  statusCode?: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface Address {
  pin: string;
  other: string;
}

interface ResetPasswordData {
  token: string;
  userData: any;
}

interface ApiError {
  message?: string;
  statusCode?: number;
}

export const register = createAsyncThunk<
  ApiResponse,
  User,
  { rejectValue: ApiError }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("userData is ", userData);
    console.log("trying to post /api/v1/register");
    const { data } = await axiosInstance.post(
      `/api/v1/register`,
      userData,
      config
    );
    console.log("data is ", data);
    return data;
  } catch (err) {
    console.log("error occured while doing this register things");
    // const axiosError = err as AxiosError<ApiError>;
    return rejectWithValue({ message: "Registration failed. Try again" });
  }
});

export const login = createAsyncThunk<
  ApiResponse,
  LoginCredentials,
  { rejectValue: ApiError }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("trying to post /api/v1/login");
    const { data } = await axiosInstance.post(
      "/api/v1/login",
      { email, password },
      config
    );
    console.log("data got is ", data);
    return data;
  } catch (err) {
    console.log("error occured while doing login thing");
    // const axiosError = err as ApiError;
    return rejectWithValue({ message: "Login Failed" });
  }
});

export const loadUser = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: ApiError }
>("user/loadUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/api/v1/profile");
    return data;
  } catch (err) {
    // const axiosError = err as AxiosError<ApiError>;
    return rejectWithValue({ message: "failed to load user data" });
  }
});

export const logout = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: ApiError }
>("user/logout", async (_, { rejectWithValue }) => {
  console.log("tring to logout user from client side");
  try {
    const { data } = await axiosInstance.post("/api/v1/logout", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    // const axiosError = err as AxiosError<ApiError>;
    return rejectWithValue({ message: "Logout failed. try again" });
  }
});

export const addPhone = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: ApiError }
>("user/addPhone", async (phone: string, { rejectWithValue }) => {
  console.log("trying to add phone to user profile");
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/addPhone",
      { phone },
      {
        withCredentials: true,
      }
    );
    console.log("data is ", data);
    return data;
  } catch (err) {
    // const axiosError = err as AxiosError<ApiError>;
    return rejectWithValue({
      message: "Failed to add Phone number to account",
    });
  }
});

export const addAddress = createAsyncThunk<
  ApiResponse,
  Address,
  { rejectValue: ApiError }
>("user/addAddress", async ({ pin, other }, { rejectWithValue }) => {
  console.log("trying to add address to user daata");
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/addAddress",
      { pin, other },
      {
        withCredentials: true,
      }
    );
    console.log("data is ", data);
    return data;
  } catch (err) {
    // const axiosError = err as AxiosError<ApiError>;
    return rejectWithValue({
      message: "Failed to add address to your account",
    });
  }
});

export const updateProfile = createAsyncThunk<
  ApiResponse,
  FormData,
  { rejectValue: ApiError }
>("user/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axiosInstance.put(
      "/api/v1/profile/update ",
      userData,
      config
    );
    return data;
  } catch (err) {
    // const axiosError = err as AxiosError<ApiError>;
    return rejectWithValue({ message: "failed to update the profile" });
  }
});

export const updatePassword = createAsyncThunk<
  ApiResponse,
  any,
  { rejectValue: ApiError }
>("user/updatePassword", async (formData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosInstance.put(
      "/api/v1/password/update",
      formData,
      config
    );
    return data;
  } catch (error) {
    // const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue({ message: "Password update failed" });
  }
});

export const forgotPassword = createAsyncThunk<
  ApiResponse,
  any,
  { rejectValue: ApiError }
>("user/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosInstance.post(
      "/api/v1/password/forgot",
      email,
      config
    );
    return data;
  } catch (error) {
    // const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue({ message: "Email sent Failed" });
  }
});

export const resetPassword = createAsyncThunk<
  ApiResponse,
  ResetPasswordData,
  { rejectValue: ApiError }
>("user/resetPassword", async ({ token, userData }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosInstance.post(
      `/api/v1/reset/${token}`,
      userData,
      config
    );
    return data;
  } catch (error) {
    // const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue({ message: "Email sent Failed" });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    // user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    user: StorageManager.getUser(),
    loading: false,
    error: null,
    success: false,
    // isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    isAuthenticated: StorageManager.isAuthenticated(),
    message: null,
  } as UserState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
    forceLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = "Session expired. Please login again.";
      StorageManager.clearAllData();
    },
  },
  extraReducers: (builder) => {
    // registration cases
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.error = null;
          state.success = action.payload.success || false;
          state.user = action.payload?.user || null;
          state.isAuthenticated = Boolean(action.payload?.user);

          // storing in local cases
          // localStorage.setItem('user', JSON.stringify(state.user));
          // localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
          StorageManager.setUser(action.payload?.user || null);
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "registration failed";
        state.user = null;
        state.isAuthenticated = false;
      })
      // login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success || false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);

        // saving to local storage
        // localStorage.setItem('user', JSON.stringify(state.user));
        // localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
        StorageManager.setUser(action.payload?.user || null);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "login failed";
        state.user = null;
        state.isAuthenticated = false;

        // if (action.payload?.statusCode === 401) {
        //     state.user = null;
        //     state.isAuthenticated = false;
        //     localStorage.removeItem('user');
        //     localStorage.removeItem('isAuthenticated');
        // }
        StorageManager.clearAuthData();
      })
      .addCase(addPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success || true;
        console.log("your request to add phone is fulfilled ",action.payload);
        if (action.payload?.user) {
          console.log("now we are updating state");
          state.user = { ...state.user, ...action.payload.user };
        }
        StorageManager.setUser(state.user);
      })
      .addCase(addPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add phone number";
        state.success = false;
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success || false;
        state.message = action.payload.message || "Address added successfully";

        // Update user data in state and storage if provided
        if (action.payload.user) {
          // Merge the updated data with existing user data
          state.user = { ...state.user, ...action.payload.user };
          StorageManager.setUser(state.user);
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add address";
        state.success = false;
      })
      // Logout User
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        logout.fulfilled,
        (state) => {
          state.loading = false;
          state.error = null;
          state.user = null;
          state.isAuthenticated = false;
          // localStorage.removeItem('user');
          // localStorage.removeItem('isAuthenticated');
          StorageManager.clearAllData();
        }
      )
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load user profile";
        state.user = null;
        state.isAuthenticated = false;
        StorageManager.clearAllData();
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadUser.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.error = null;

          if (action.payload.user) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            StorageManager.setUser(action.payload.user);
          }
        }
      )
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load user profile";

        if (action.payload?.statusCode === 401) {
          state.user = null;
          state.isAuthenticated = false;
          StorageManager.clearAuthData();
        }
      })
      // Update User Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload?.user || null;
          state.success = action.payload?.success || false;
          state.message = action.payload?.message || null;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Profile update failed. Please try again later";
      })
      // Update User Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.error = null;
          state.success = action.payload?.success || false;
        }
      )
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password update failed";
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.error = null;
          state.success = action.payload?.success || false;
          state.message = action.payload?.message || null;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Email sent failed";
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.error = null;
          state.success = action.payload?.success || false;
          state.user = null;
          state.isAuthenticated = false;
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Email sent failed";
      });
  },
});

export default userSlice.reducer;
export const { removeErrors, removeSuccess } = userSlice.actions;
