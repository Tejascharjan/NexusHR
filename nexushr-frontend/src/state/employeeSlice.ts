import { api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employeeData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/employees", employeeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create employee",
      );
    }
  },
);

export const getAllEmployees = createAsyncThunk(
  "/employee/getAllEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/employees");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch employees",
      );
    }
  },
);

export interface Employee {
  id: number;
  departmentId: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentName: string;
  role: string;
  status: string;
  offboardingDate: string | null;
  joiningDate: string | null;
  phone: string | null;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
