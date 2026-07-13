import { api } from "@/config/Api";
import type { Leave, LeaveApprovealRequest } from "@/types/LeaveTypes";
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

export const getEmployeeLeave = createAsyncThunk("leave/getEmployeeLeave", async (filters: any, { rejectWithValue }) => {
     try {
          const response = await api.post("/api/leaves/employee", filters);
          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data || "Failed to fetch employee leaves");
     }
});

export const applyLeave = createAsyncThunk("leave/applyLeave", async (data: any, { rejectWithValue }) => {
     try {
          const response = await api.post("/api/leaves", data);
          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data || "Failed to apply leave");
     }
});

export const approveLeave = createAsyncThunk("leave/approveLeave", async (request: LeaveApprovealRequest, { rejectWithValue }) => {
     try {
          const response = await api.put(`/api/leaves/approve`, request);
          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data || "Failed to approve leave");
     }
});

export const rejectLeave = createAsyncThunk("leave/rejectLeave", async (request: LeaveApprovealRequest, { rejectWithValue }) => {
     try {
          const response = await api.put(`/api/leaves/reject`, request);
          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data || "Failed to reject leave");
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
               })
               .addCase(getEmployeeLeave.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(getEmployeeLeave.fulfilled, (state, action) => {
                    state.loading = false;
                    state.leaves = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.totalElements = action.payload.totalElements;
               })
               .addCase(getEmployeeLeave.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
               })
               .addCase(applyLeave.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(applyLeave.fulfilled, (state, action) => {
                    state.loading = false;
                    state.leaves.unshift(action.payload);
               })
               .addCase(applyLeave.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
               })
               .addCase(approveLeave.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(approveLeave.fulfilled, (state, action) => {
                    state.loading = false;
                    state.leaves = state.leaves.map((leave) =>
                         leave.id === action.payload.id ? action.payload : leave,
                    );
               })
               .addCase(approveLeave.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
               })
               .addCase(rejectLeave.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(rejectLeave.fulfilled, (state, action) => {
                    state.loading = false;
                    state.leaves = state.leaves.map((leave) =>
                         leave.id === action.payload.id ? action.payload : leave,
                    );
               })
               .addCase(rejectLeave.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
               })
     },
});

export default leaveSlice.reducer;