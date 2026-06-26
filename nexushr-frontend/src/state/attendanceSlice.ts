import { api } from "@/config/Api";
import type { Attendance } from "@/types/AttendanceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createAttendance = createAsyncThunk(
  "attendance/createAttendance",
  async (attendanceData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/attendance", attendanceData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark attendance",
      );
    }
  },
);

export const filterAttendance = createAsyncThunk("/filter/attendance", async (filterData: any, { rejectWithValue }) => {
  try {
    const response = await api.post("/filter/attendance", filterData);
    console.log("attendance ", response);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch attendance",
    );
  }
});



interface AttendanceState {
  attendance: Attendance | null;
  attendances: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendance: null,
  attendances: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
        state.attendances.unshift(action.payload);
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(filterAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = action.payload.content;
      })
      .addCase(filterAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default attendanceSlice.reducer;
