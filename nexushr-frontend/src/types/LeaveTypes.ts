export interface Leave {
     id: number;
     employeeId: number;
     employeeName: string;
     departmentName: string;
     leaveType: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     reason: string;
     appliedDate: string;
     status: string;
}