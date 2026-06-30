package com.nexushr.service.impl;

import com.nexushr.dto.response.*;
import com.nexushr.entity.Employee;
import com.nexushr.entity.Leave;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.repository.*;
import com.nexushr.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final PayrollRepository payrollRepository;

    @Override
    public DashboardResponse getDashboard() {

        LocalDate today = LocalDate.now();

        Integer month = today.getMonthValue();
        Integer year = today.getYear();

        Long totalEmployees = employeeRepository.getTotalEmployees();

        Long totalDepartments = departmentRepository.getActiveDepartments();

        Long presentToday = attendanceRepository.getTodayPresent(today);

        Long absentToday = attendanceRepository.getTodayAbsent(today);

        Long pendingLeaves = leaveRepository.getPendingLeaves();

        Double currentPayroll = payrollRepository.getCurrentPayroll(month, year);

        List<DepartmentChartResponse> departmentChart = employeeRepository.getDepartmentDistribution();

        List<AttendanceChartResponse> attendanceTrend = attendanceRepository.getAttendanceTrend();

        List<PayrollChartResponse> payrollTrend = payrollRepository.getPayrollTrend();

        List<Employee> employees = employeeRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 5)).getContent();

        List<RecentEmployeeResponse> recentEmployees = employees.stream().map(this::mapRecentEmployee).toList();

        List<Leave> leaves = leaveRepository.findByStatusOrderByRequestedAtDesc(LeaveStatus.PENDING, PageRequest.of(0, 5)).getContent();

        List<RecentLeaveResponse> recentLeaves = leaves.stream().map(this::mapRecentLeave).toList();

        return DashboardResponse.builder()

                .totalEmployees(totalEmployees)

                .totalDepartments(totalDepartments)

                .presentToday(presentToday)

                .absentToday(absentToday)

                .pendingLeaves(pendingLeaves)

                .currentMonthPayroll(currentPayroll)

                .departmentDistribution(departmentChart)

                .attendanceTrend(attendanceTrend)

                .payrollTrend(payrollTrend)

                .recentEmployees(recentEmployees)

                .pendingLeaveList(recentLeaves)

                .recentActivities(List.of())

                .build();
    }

    private RecentEmployeeResponse mapRecentEmployee(Employee employee) {

        return RecentEmployeeResponse.builder()

                .employeeId(employee.getId())

                .employeeName(employee.getFirstName() + " " + employee.getLastName())

                .department(employee.getDepartment().getName())

                .designation(employee.getDesignation())

                .joiningDate(employee.getJoiningDate())

                .build();
    }

    private RecentLeaveResponse mapRecentLeave(Leave leave) {

        return RecentLeaveResponse.builder()

                .leaveId(leave.getId())

                .employeeName(leave.getEmployee().getFirstName() + " " + leave.getEmployee().getLastName())

                .leaveType(leave.getLeaveType().name())

                .status(leave.getStatus())

                .fromDate(leave.getFromDate())

                .toDate(leave.getToDate())

                .totalDays(leave.getTotalDays())

                .build();
    }
}