import { api } from "@/config/Api";
import type { Leave } from "@/types/LeaveTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LeaveState {
     leaves: Leave[];
     loading: boolean;
     error: string | null;
     totalPages: number;
     totalElements: number;
}

const initialState: LeaveState = {
     leaves: [],
     loading: false,
     error: null,
     totalPages: 0,
     totalElements: 0,
};


export const getLeaves = createAsyncThunk("leave/getLeaves", async (_, { rejectWithValue }) => {
     try {
          const response = await api.get("/api/leaves");
          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data || "Failed to fetch leaves");
     }
});

export const filterLeaves = createAsyncThunk("leave/filterLeaves", async (filters: any, { rejectWithValue }) => {
     try {
          const response = await api.post("/api/leaves/filter", filters);
          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data || "Failed to filter leaves");
     }
});

const leaveSlice = createSlice({
     name: "leave",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(getLeaves.pending, (state) => {
                    state.loading = true;
               })
               .addCase(getLeaves.fulfilled, (state, action) => {
                    state.loading = false;
                    state.leaves = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.totalElements = action.payload.totalElements;
               })
               .addCase(getLeaves.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
               })
               .addCase(filterLeaves.pending, (state) => {
                    state.loading = true;
               })
               .addCase(filterLeaves.fulfilled, (state, action) => {
                    state.loading = false;
                    state.leaves = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.totalElements = action.payload.totalElements;
               })
               .addCase(filterLeaves.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
               });
     },
});

export default leaveSlice.reducer;