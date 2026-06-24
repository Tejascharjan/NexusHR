package com.nexushr.controller;

import com.nexushr.dto.request.AttendanceRequest;
import com.nexushr.dto.request.MonthlyAttendanceFilterRequest;
import com.nexushr.dto.response.AttendanceResponse;
import com.nexushr.dto.response.MonthlyAttendanceResponse;
import com.nexushr.entity.Attendance;
import com.nexushr.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // =========================================================
    // ADMIN  →  /admin/attendance/**
    // =========================================================

    @PostMapping("/admin/attendance")
    public ResponseEntity<AttendanceResponse> markAttendance(@RequestBody AttendanceRequest attendance) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(attendanceService.markAttendance(attendance));
    }

    @GetMapping("/admin/attendance/date")
    public ResponseEntity<List<AttendanceResponse>> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }

    /*
     * common -> /attendance/**
     */
    @GetMapping("/monthly/attendace")
    public ResponseEntity<Page<MonthlyAttendanceResponse>> getMonthlyAttendance(@RequestParam(required = false) Integer month,
                                                                                @RequestParam(required = false) Integer year,
                                                                                @RequestParam(required = false) Long departmentId,
                                                                                @RequestParam(defaultValue = "0") Integer page,
                                                                                @RequestParam(defaultValue = "10") Integer size) {

        MonthlyAttendanceFilterRequest request = new MonthlyAttendanceFilterRequest();
        request.setMonth(month);
        request.setYear(year);
        request.setDepartmentId(departmentId);
        request.setPage(page);
        request.setPageSize(size);
        return ResponseEntity.ok(attendanceService.getMonthlyAttendance(request));
    }
}