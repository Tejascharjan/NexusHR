import { api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signin = createAsyncThunk<any, any>(
  "/auth/login",
  async ({ loginRequest, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginRequest);
      localStorage.setItem("jwt", response.data.token);

      if (response.data?.user?.role === "MANAGER") {
        navigate("/manager/dashboard");
      } else if (response.data?.user?.role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else if (response.data?.user?.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      localStorage.setItem("jwt", response.data.token);
      return response.data;
    } catch (error: any) {
      console.log("error:-", error);
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  },
);

export const logout = createAsyncThunk<any, any>(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  "/auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error: any) {
      console.log("error:-", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch user profile",
      );
    }
  },
);

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  jwt: string | null;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  jwt: null,
  isLoggedIn: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.jwt = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.jwt = null;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.jwt = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = true;
        state.jwt = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.jwt = null;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
