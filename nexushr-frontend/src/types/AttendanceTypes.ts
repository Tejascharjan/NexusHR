export interface Attendance {
     id: number;
     employee: {
          id: number;
          firstName: string;
          lastName: string;
          departmentName: string;
     };
     date: string;
     checkIn: string;
     checkOut: string;
     status: string;
     biometricVerified: boolean;
     workedHours: number;
}


export interface MonthlyAttendance {
     employeeId: number;
     employeeName: string;
     departmentName: string;

     presentDays: number;
     absentDays: number;
     leaveDays: number;

     totalWorkingDays: number;

     attendancePercentage: number;
}

export interface AttendanceFilters {
     month?: number;
     year?: number;
     departmentId?: number;

     page?: number;
     size?: number;
}

export interface AttendanceState {
     attendance: MonthlyAttendance[];
     loading: boolean;
     totalPages: number;
     totalElements: number;
     page: number;
     error: string | null;
}
