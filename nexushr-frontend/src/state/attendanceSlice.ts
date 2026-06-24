import { api } from "@/config/Api";
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

export const getAttendanceByDate = createAsyncThunk(
  "attendance/getAttendanceByDate",
  async (date: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/attendance/date?date=${date}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance",
      );
    }
  },
);


interface Attendance {
  id: number;
  employee: {
    id: number;
    firstName: string;
    lastName: string;
  };
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  biometricVerified: boolean;
  workedHours: number;
}

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
      .addCase(getAttendanceByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceByDate.fulfilled, (state, action) => {
        state.attendances = action.payload;
      })
      .addCase(getAttendanceByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default attendanceSlice.reducer;
