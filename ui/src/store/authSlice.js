import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to get user-friendly error messages
const getUserFriendlyMessage = (errorMessage, errorCode, statusCode) => {
  // Handle 500 Internal Server Error
  if (statusCode === 500 || errorCode === "INTERNAL_SERVER_ERROR") {
    return "Something went wrong on our end. Please try again in a few moments. If the problem persists, contact support.";
  }

  // Handle network errors
  if (errorCode === "NETWORK_ERROR") {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  // For other errors, use the error message from API (it's usually user-friendly)
  return errorMessage;
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errorMessage || data.message || "Registration failed";
        const errorCode = data.errorCode || "UNKNOWN_ERROR";

        // Handle API error response format
        return rejectWithValue({
          errorMessage: getUserFriendlyMessage(
            errorMessage,
            errorCode,
            response.status
          ),
          errorCode: errorCode,
          validationErrors: data.validationErrors || null,
          apiPath: data.apiPath || "",
          statusCode: response.status,
        });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: getUserFriendlyMessage(
          error.message || "Network error occurred",
          "NETWORK_ERROR"
        ),
        errorCode: "NETWORK_ERROR",
        validationErrors: null,
        apiPath: "",
        statusCode: 0,
      });
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: Include cookies in request
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errorMessage || data.message || "Login failed";
        const errorCode = data.errorCode || "UNKNOWN_ERROR";

        // Handle API error response format
        return rejectWithValue({
          errorMessage: getUserFriendlyMessage(
            errorMessage,
            errorCode,
            response.status
          ),
          errorCode: errorCode,
          validationErrors: data.validationErrors || null,
          apiPath: data.apiPath || "",
          statusCode: response.status,
        });
      }

      // Store user data in localStorage (tokens are in HTTP-only cookies)
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: getUserFriendlyMessage(
          error.message || "Network error occurred",
          "NETWORK_ERROR"
        ),
        errorCode: "NETWORK_ERROR",
        validationErrors: null,
        apiPath: "",
        statusCode: 0,
      });
    }
  }
);

// Async thunk for refreshing access token
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send refresh_token cookie
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errorMessage || data.message || "Token refresh failed";
        const errorCode = data.errorCode || "UNKNOWN_ERROR";

        // Handle API error response format
        return rejectWithValue({
          errorMessage: getUserFriendlyMessage(
            errorMessage,
            errorCode,
            response.status
          ),
          errorCode: errorCode,
          validationErrors: data.validationErrors || null,
          apiPath: data.apiPath || "",
          statusCode: response.status,
        });
      }

      // Update user data if needed
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: getUserFriendlyMessage(
          error.message || "Network error occurred",
          "NETWORK_ERROR"
        ),
        errorCode: "NETWORK_ERROR",
        validationErrors: null,
        apiPath: "",
        statusCode: 0,
      });
    }
  }
);

// Async thunk for fetching user info
export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errorMessage || data.message || "Failed to fetch user info";
        const errorCode = data.errorCode || "UNKNOWN_ERROR";

        return rejectWithValue({
          errorMessage: getUserFriendlyMessage(
            errorMessage,
            errorCode,
            response.status
          ),
          errorCode: errorCode,
          validationErrors: data.validationErrors || null,
          apiPath: data.apiPath || "",
          statusCode: response.status,
        });
      }

      // Store user data in localStorage with timestamp
      const userData = {
        ...data.data,
        fetchedAt: Date.now(),
      };
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      return rejectWithValue({
        errorMessage: getUserFriendlyMessage(
          error.message || "Network error occurred",
          "NETWORK_ERROR"
        ),
        errorCode: "NETWORK_ERROR",
        validationErrors: null,
        apiPath: "",
        statusCode: 0,
      });
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Call logout endpoint to clear HTTP-only cookies
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies to be cleared
      });

      if (!response.ok) {
        console.error("Logout endpoint failed, clearing local data anyway");
      }

      // Clear local storage
      localStorage.removeItem("user");

      return null;
    } catch (error) {
      // Even if API fails, clear local data
      localStorage.removeItem("user");
      return null;
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  errorCode: null,
  validationErrors: null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.errorCode = null;
      state.validationErrors = null;
    },
    clearError: (state) => {
      state.isError = false;
      state.message = "";
      state.errorCode = null;
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.errorMessage || "Registration failed";
        state.errorCode = action.payload?.errorCode || null;
        state.validationErrors = action.payload?.validationErrors || null;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.errorMessage || "Login failed";
        state.errorCode = action.payload?.errorCode || null;
        state.validationErrors = action.payload?.validationErrors || null;
      })
      // Refresh Token
      .addCase(refreshAccessToken.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user || state.user;
        state.message = "Token refreshed successfully";
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isError = true;
        state.message = action.payload?.errorMessage || "Token refresh failed";
        state.errorCode = action.payload?.errorCode || null;
        state.validationErrors = action.payload?.validationErrors || null;
        // Clear user on refresh failure (session expired)
        state.user = null;
        localStorage.removeItem("user");
      })
      // Fetch User Info
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User info updated";
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.errorMessage || "Failed to fetch user info";
        state.errorCode = action.payload?.errorCode || null;
        state.validationErrors = action.payload?.validationErrors || null;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.message = "";
      });
  },
});

export const { reset, clearError } = authSlice.actions;
export default authSlice.reducer;
