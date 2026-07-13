package com.nexushr.service.impl;

import com.nexushr.dto.request.AttendanceRequest;
import com.nexushr.dto.request.MonthlyAttendanceFilterRequest;
import com.nexushr.dto.response.AttendanceResponse;
import com.nexushr.dto.response.EmployeeDetailsResponse;
import com.nexushr.dto.response.MonthlyAttendanceResponse;
import com.nexushr.entity.Attendance;
import com.nexushr.entity.Attendancestatus;
import com.nexushr.entity.Employee;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public AttendanceResponse markAttendance(AttendanceRequest attendance) {
        attendanceRepository.findByEmployeeIdAndDate(attendance.getEmployeeId(), attendance.getDate())
                .ifPresent(a -> {
                    throw new RuntimeException("Attendance already marked for this date.");
                });

        if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
            long minutes = ChronoUnit.MINUTES.between(attendance.getCheckIn(), attendance.getCheckOut());
            attendance.setWorkedHours(minutes / 60.0);
        }
        Employee employee = employeeRepository.findById(attendance.getEmployeeId()).orElseThrow(() -> new RuntimeException("Employee not found."));
        Attendance markAttendance = new Attendance();
        markAttendance.setEmployee(employee);
        markAttendance.setDate(attendance.getDate());
        markAttendance.setCheckIn(attendance.getCheckIn());
        markAttendance.setCheckOut(attendance.getCheckOut());
        markAttendance.setStatus(attendance.getStatus());
        markAttendance.setWorkedHours(attendance.getWorkedHours());
        Attendance attendance1 = attendanceRepository.save(markAttendance);
        return mapToAttendanceResponse(attendance1);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {

        return attendanceRepository.findByDate(date).stream()
                .map(this::mapToAttendanceResponse)
                .toList();
    }

    @Override
    public Page<MonthlyAttendanceResponse> getMonthlyAttendance(MonthlyAttendanceFilterRequest request) {
        Integer month = request.getMonth() != null ? request.getMonth() : LocalDate.now().getMonthValue();
        Integer year = request.getYear() != null ? request.getYear() : LocalDate.now().getYear();
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize(), Sort.by("employee.id"));
        return attendanceRepository.getMonthlyAttendance(month, year, request.getDepartmentId(), pageable);
    }

    @Override
    public Page<AttendanceResponse> getFilteredAttendance(AttendanceRequest request) {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("date").descending());
        Page<Attendance> attendances = attendanceRepository.filterAttendance(request.getDate(), request.getDepartmentId(), request.getEmployeeId(), request.getStatus(), pageable);
        return attendances.map(this::mapToAttendanceResponse);
    }

    private AttendanceResponse mapToAttendanceResponse(Attendance attendance) {
        Employee employee = attendance.getEmployee();
        EmployeeDetailsResponse response = new EmployeeDetailsResponse();
        response.setId(employee.getId());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setEmail(employee.getEmail());
        response.setPhone(employee.getPhone());
        response.setStatus(employee.getStatus());
        response.setJoiningDate(employee.getJoiningDate());
        response.setOffboardingDate(employee.getOffboardingDate());
        response.setDepartmentId(employee.getDepartment().getId());
        response.setDepartmentName(employee.getDepartment().getName());
        response.setRole(employee.getRole());

        return new AttendanceResponse(
                attendance.getId(),
                response,
                attendance.getDate(),
                attendance.getCheckIn(),
                attendance.getCheckOut(),
                attendance.getStatus(),
                attendance.getWorkedHours()
        );
    }
}
