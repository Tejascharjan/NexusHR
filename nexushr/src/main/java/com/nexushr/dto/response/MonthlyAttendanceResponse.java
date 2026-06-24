package com.nexushr.dto.response;

import lombok.Data;

@Data
public class MonthlyAttendanceResponse {

    private Long employeeId;
    private String employeeName;
    private String departmentName;
    private Long presentDays;
    private Long absentDays;
    private Long leaveDays;
    private Long totalWorkingDays;
    private Double attendancePercentage;

    public MonthlyAttendanceResponse(
            Long employeeId,
            String employeeName,
            String departmentName,
            Long presentDays,
            Long absentDays,
            Long leaveDays
    ) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.departmentName = departmentName;
        this.presentDays = presentDays;
        this.absentDays = absentDays;
        this.leaveDays = leaveDays;
        this.totalWorkingDays = presentDays + absentDays + leaveDays;
        this.attendancePercentage = totalWorkingDays == 0 ? 0 : (presentDays * 100.0) / totalWorkingDays;
    }

}
