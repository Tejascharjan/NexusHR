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

export interface PayrollItem {
     payrollItemId: number;
     itemName: string;
     itemType: string;
     amount: number;
}

export interface PayrollStatistics {
     totalEmployees: number;
     processedEmployees: number;
     paidEmployees: number;
     pendingEmployees: number;
     totalPayrollAmount: number;
     totalPaidAmount: number;
     totalPendingAmount: number;
}

export interface PayrollPageResponse {
     payrolls: Payroll[];
     statistics: PayrollStatistics;
     page: number;
     size: number;
     totalPages: number;
     totalElements: number;
}

export interface PayrollFilterRequest {
     payrollMonth?: number;
     payrollYear?: number;
     departmentId?: number;
     status?: string;
     employeeId?: number;
     page: number;
     size: number;
}