import { api } from "@/config/Api";
import type { DashboardResponse } from "@/types/DashboardTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/dashboard");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dashboard stats",
      );
    }
  },
);

interface DashboardState {
  dashboard: DashboardResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  dashboard: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
