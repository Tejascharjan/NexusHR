package com.nexushr.service;

import com.nexushr.dto.request.AttendanceRequest;
import com.nexushr.dto.request.MonthlyAttendanceFilterRequest;
import com.nexushr.dto.response.AttendanceResponse;
import com.nexushr.dto.response.MonthlyAttendanceResponse;
import com.nexushr.entity.Attendance;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceResponse markAttendance(AttendanceRequest attendance);

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

    Page<MonthlyAttendanceResponse> getMonthlyAttendance(MonthlyAttendanceFilterRequest request);
}
