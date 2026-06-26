import { api } from "@/config/Api";
import type { Employee, EmployeeDetails } from "@/types/EmployeeTypes";
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

export const getEmployeeDetails = createAsyncThunk(
  "employee/getEmployeeDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/employee/profile`);
      console.log("response", response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch employee details",
      );
    }
  },
);



interface EmployeeState {
  employees: Employee[];
  employeeDetails: EmployeeDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  employeeDetails: null,
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
      })
      .addCase(getEmployeeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeDetails.fulfilled, (state, action) => {
        state.employeeDetails = action.payload;
        state.loading = false;
      })
      .addCase(getEmployeeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default employeeSlice.reducer;
