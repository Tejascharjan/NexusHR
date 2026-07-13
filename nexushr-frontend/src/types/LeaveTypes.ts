export interface Leave {
     id: number;
     employeeId: number;
     employeeName: string;
     leaveType: string;
     fromDate: string;
     toDate: string;
     totalDays: number;
     reason: string;
     status: string;
     approverId: number;
     approverName: string;
     approverRemarks: string;
     requestedAt: string;
     reviewedAt: string;
     departmentName: string;
}

export interface LeaveApprovealRequest {
     leaveId: Number;
     approverId: Number;
     approverRemarks: string;
}