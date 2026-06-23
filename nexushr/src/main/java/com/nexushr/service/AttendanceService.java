package com.nexushr.service;

import com.nexushr.dto.request.AttendanceRequest;
import com.nexushr.dto.response.AttendanceResponse;
import com.nexushr.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceResponse markAttendance(AttendanceRequest attendance);

    Attendance getAttendanceById(Long id);

    Attendance getAttendanceByEmployeeAndDate(Long employeeId, LocalDate date);

    List<Attendance> getAttendanceByEmployee(Long employeeId);

    List<Attendance> getAttendanceByEmployeeAndDateRange(Long employeeId, LocalDate from, LocalDate to);

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

    List<Attendance> getAttendanceByDepartmentAndDate(Long departmentId, LocalDate date);

    Attendance checkIn(Long employeeId);

    Attendance checkOut(Long employeeId);

    long countPresentDays(Long employeeId, LocalDate from, LocalDate to);

    List<Attendance> getUnverifiedBiometricByDate(LocalDate date);

    Attendance updateAttendance(Long id, Attendance attendance);

    void deleteAttendance(Long id);
}
