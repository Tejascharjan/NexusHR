import { api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Payroll {
  payrollId: number;
  employeeId: number;
  employeeName: string;
  payrollMonth: number;
  payrollYear: number;
  basicSalary: number;
  grossSalary: number;
  netSalary: number;
  totalDeductions: number;
  totalAllowances: number;
  status: "PENDING" | "APPROVED" | "PAID";
}

export interface PayrollStats {
  totalPayroll: number;
  averageSalary: number;
  pendingPayrolls: number;
  paidPayrolls: number;
}

interface PayrollState {
  payroll: Payroll | null;
  payrolls: Payroll[];
  stats: PayrollStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: PayrollState = {
  payroll: null,
  payrolls: [],
  stats: null,
  loading: false,
  error: null,
};

export const generatePayroll = createAsyncThunk(
  "payroll/generatePayroll",
  async (payrollData: any, { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.post(`/api/payrolls/generate`, payrollData);
      dispatch(getPayrolls());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate payroll",
      );
    }
  },
);

export const getPayrolls = createAsyncThunk(
  "payroll/getPayrolls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/payrolls`);
      console.log('payrolls', response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payrolls",
      );
    }
  },
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
  })



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
      const response = await api.patch(`/admin/payroll/${id}/pay`);

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
      .addCase(getPayrolls.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPayrolls.fulfilled, (state, action) => {
        state.loading = false;
        state.payrolls = action.payload;
      })
      .addCase(getPayrolls.rejected, (state, action) => {
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
