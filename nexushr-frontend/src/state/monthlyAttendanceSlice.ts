import { api } from "@/config/Api";
import type { AttendanceFilters, AttendanceState } from "@/types/AttendanceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getMonthlyAttendance = createAsyncThunk(
     "attendance/getMonthlyAttendance",
     async (filters: AttendanceFilters, { rejectWithValue }) => {
          try {
               const response = await api.get(`/monthly/attendace`, { params: filters });
               return response.data;
          } catch (error: any) {
               return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch attendance",
               );
          }
     },
);




const initialState: AttendanceState = {
     attendance: [],
     loading: false,
     totalPages: 0,
     totalElements: 0,
     page: 0,
     error: null,
};



const monthlyAttendanceSlice = createSlice({
     name: "monthlyAttendance",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(getMonthlyAttendance.fulfilled, (state, action) => {
               state.loading = false;
               state.attendance = action.payload.content;
               state.totalPages = action.payload.totalPages;
               state.totalElements = action.payload.totalElements;
               state.page = action.payload.number;
          })
               .addCase(getMonthlyAttendance.pending, (state) => {
                    state.loading = true;
                    state.attendance = [];
                    state.totalPages = 0;
                    state.totalElements = 0;
                    state.page = 0;
               })
               .addCase(getMonthlyAttendance.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
               })
     },
});

export default monthlyAttendanceSlice.reducer;
