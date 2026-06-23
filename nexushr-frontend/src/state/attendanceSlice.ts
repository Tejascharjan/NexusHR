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

export const getAttendanceByEmployee = createAsyncThunk(
  "attendance/getAttendanceByEmployee",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/attendance/employee/${employeeId}`,
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance",
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

export const updateAttendance = createAsyncThunk(
  "attendance/updateAttendance",
  async ({ id, attendanceData }: any, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/attendance/${id}`, attendanceData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update attendance",
      );
    }
  },
);

export const deleteAttendance = createAsyncThunk(
  "attendance/deleteAttendance",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/attendance/${id}`);

      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete attendance",
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
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //get
      .addCase(getAttendanceByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceByEmployee.fulfilled, (state, action) => {
        state.attendance = action.payload;
      })
      .addCase(getAttendanceByEmployee.rejected, (state, action) => {
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
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.attendances = state.attendances.map((attendance) =>
          attendance.id === action.payload.id ? action.payload : attendance,
        );
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //delete
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.attendances = state.attendances.filter(
          (attendance) => attendance.id !== action.payload,
        );
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attendanceSlice.reducer;
