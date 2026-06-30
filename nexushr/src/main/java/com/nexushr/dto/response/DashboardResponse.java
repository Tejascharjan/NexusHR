package com.nexushr.dto.response;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DashboardResponse {

    // --- statistics ---
    private Long totalEmployees;
    private Long totalDepartments;
    private Long presentToday;
    private Long absentToday;
    private Long pendingLeaves;
    private Double currentMonthPayroll;

    // --- Charts ---
    private List<DepartmentChartResponse> departmentDistribution;
    private List<AttendanceChartResponse> attendanceTrend;
    private List<PayrollChartResponse> payrollTrend;

    // --- Tables ---
    private List<RecentEmployeeResponse> recentEmployees;
    private List<RecentLeaveResponse> pendingLeaveList;
    private List<ActivityResponse> recentActivities;


}
