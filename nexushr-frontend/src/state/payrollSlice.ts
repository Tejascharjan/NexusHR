import { api } from "@/config/Api";
import type { Payroll, PayrollFilterRequest, PayrollStatistics } from "@/types/PayrollTyepes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PayrollState {
  payroll: Payroll | null;
  payrolls: Payroll[];
  stats: PayrollStatistics | null;

  page: number;
  size: number;
  totalPages: number;
  totalElements: number;

  loading: boolean;
  error: string | null;
}

const initialState: PayrollState = {
  payroll: null,
  payrolls: [],
  stats: null,

  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,

  loading: false,
  error: null,
};

export const generatePayroll = createAsyncThunk(
  "payroll/generatePayroll",
  async (payrollData: any, { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.post(`/api/payrolls/generate`, payrollData);
      dispatch(filterPayroll({
        payrollMonth: payrollData.payrollMonth,
        payrollYear: payrollData.payrollYear,
        page: 0,
        size: 10,
      }));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate payroll",
      );
    }
  },
);


export const filterPayroll = createAsyncThunk(
  "payroll/filterPayroll",
  async (filter: PayrollFilterRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/payrolls/filter", filter);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to filter payrolls"
      )
    }
  }
);

export const getEmployeePayrolls = createAsyncThunk(
  "payroll/getEmployeePayrolls",
  async (filter: PayrollFilterRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/payrolls/employee", filter);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to filter payrolls"
      )
    }
  }
);

export const downloadSalarySlip = createAsyncThunk(
  "payroll/downloadSalarySlip",
  async (payrollId: number) => {
    const response = await api.get(`/api/payrolls/${payrollId}/salary-slip`, { responseType: "blob" });
    return response.data as Blob;
  },
);

export const downloadRtgs = createAsyncThunk(
  "payroll/downloadRtgs",
  async ({ month, year }: { month: number, year: number }) => {
    const response = await api.get(`/api/payrolls/export-rtgs`, { params: { month, year }, responseType: "blob" });
    return response.data as Blob;
  }
);

export const approvePayroll = createAsyncThunk(
  "payroll/approvePayroll",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/payroll/${id}/approve`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve payroll",
      );
    }
  },
);

export const markPayrollPaid = createAsyncThunk(
  "payroll/markPayrollPaid",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/payrolls/${id}/paid`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark payroll as paid",
      );
    }
  },
);

export const deletePayroll = createAsyncThunk(
  "payroll/deletePayroll",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/payroll/${id}`);

      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete payroll",
      );
    }
  },
);

export const getTotalSalary = createAsyncThunk(
  "payroll/getTotalSalary",
  async (
    {
      payMonth,
      payYear,
    }: {
      payMonth: number;
      payYear: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get("/admin/payroll/total-salary", {
        params: {
          payMonth,
          payYear,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getAverageSalary = createAsyncThunk(
  "payroll/getAverageSalary",
  async (year: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/payroll/avg-salary/${year}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterPayroll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterPayroll.fulfilled, (state, action) => {
        state.loading = false;

        state.payrolls = action.payload.payrolls;

        state.stats = action.payload.statistics;

        state.page = action.payload.page;

        state.size = action.payload.size;

        state.totalPages = action.payload.totalPages;

        state.totalElements = action.payload.totalElements;
      })
      .addCase(filterPayroll.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })
      .addCase(getEmployeePayrolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeePayrolls.fulfilled, (state, action) => {
        state.loading = false;

        state.payrolls = action.payload.payrolls;

        state.stats = action.payload.statistics;

        state.page = action.payload.page;

        state.size = action.payload.size;

        state.totalPages = action.payload.totalPages;

        state.totalElements = action.payload.totalElements;
      })
      .addCase(getEmployeePayrolls.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })
      .addCase(generatePayroll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePayroll.fulfilled, (state, action) => {
        state.loading = false;
        state.payroll = action.payload;
      })
      .addCase(generatePayroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default payrollSlice.reducer;
