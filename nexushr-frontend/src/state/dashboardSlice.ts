import { api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGlobalAdminMetrics = createAsyncThunk(
  "dashboard/fetchGlobalAdminMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<any[]>("/admin/dashboard/global");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dashboard stats",
      );
    }
  },
);

interface DashboardState {
  stats: any;
  loading: boolean;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalAdminMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGlobalAdminMetrics.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchGlobalAdminMetrics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
