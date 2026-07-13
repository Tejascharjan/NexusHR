import { api } from "@/config/Api";
import type { Department } from "@/types/DepartmentTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllDepartments = createAsyncThunk(
  "department/getAllDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/departments");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create department",
      );
    }
  },
);

export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (deptData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/departments", deptData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add department",
      );
    }
  },
);

export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async (
    { id, departmentData }: { id: number, departmentData: any }, { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/api/departments/${id}`, departmentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update department",
      )
    }
  });

export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/departments/${id}`);
      dispatch(getAllDepartments());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete department",
      )
    }
  }
);

export const getDepartmentsByManagerId = createAsyncThunk(
  "department/getDepartmentsByManagerId",
  async (managerId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/departments/manager/${managerId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get departments by manager id",
      )
    }
  }
);

interface DepartmentState {
  department: Department | null;
  departments: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  department: null,
  departments: [],
  loading: false,
  error: null,
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDepartmentsByManagerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentsByManagerId.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getDepartmentsByManagerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload;
        state.departments.unshift(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload;
        state.departments = state.departments.map((department) => department.id === action.payload.id ? action.payload : department);
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter((department) => department.id !== action.payload.id);
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default departmentSlice.reducer;
