export interface DashboardResponse {
     totalEmployees: number;
     totalDepartments: number;
     presentToday: number;
     absentToday: number;
     pendingLeaves: number;
     currentMonthPayroll: number;

     departmentDistribution: DepartmentChart[];
     attendanceTrend: AttendanceChart[];
     payrollTrend: PayrollChart[];

     recentEmployees: RecentEmployee[];
     pendingLeavesList: RecentLeave[];
     recentActivities: Activity[];
}

export interface DepartmentChart {
     departmentName: string;
     employeeCount: number;
}

export interface AttendanceChart {
     date: string;
     present: number;
     absent: number;
     leaveCount: number;
}

export interface PayrollChart {
     month: string;
     payrollAmount: number;
}

export interface RecentEmployee {
     employeeId: number;
     employeeName: string;
     department: string;
     designation: string;
     joiningDate: string;
}

export interface RecentLeave {
     leaveId: number;
     employeeName: string;
     leaveType: string;
     status: string;
     fromDate: string;
     toDate: string;
     totalDays: number;
}

export interface Activity {
     title: string;
     description: string;
     type: string;
     createdAt: string;
}