package com.nexushr.controller;

import com.nexushr.dto.request.AttendanceRequest;
import com.nexushr.dto.response.AttendanceResponse;
import com.nexushr.entity.Attendance;
import com.nexushr.service.AttendanceService;
import lombok.RequiredArgsConstructor;
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

    @PutMapping("/admin/attendance/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id,
                                                       @RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, attendance));
    }

    @DeleteMapping("/admin/attendance/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/attendance/date")
    public ResponseEntity<List<AttendanceResponse>> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }

    @GetMapping("/admin/attendance/unverified-biometric")
    public ResponseEntity<List<Attendance>> getUnverifiedBiometric(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getUnverifiedBiometricByDate(date));
    }

    @GetMapping("/admin/attendance/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getByEmployeeAdmin(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping("/admin/attendance/employee/{employeeId}/range")
    public ResponseEntity<List<Attendance>> getByEmployeeAndRange(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeAndDateRange(employeeId, from, to));
    }

    @GetMapping("/admin/attendance/employee/{employeeId}/present-count")
    public ResponseEntity<Long> countPresentDays(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(attendanceService.countPresentDays(employeeId, from, to));
    }

    // =========================================================
    // MANAGER  →  /manager/attendance/**
    // =========================================================

    @GetMapping("/manager/attendance/department/{departmentId}")
    public ResponseEntity<List<Attendance>> getByDepartmentAndDate(
            @PathVariable Long departmentId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDepartmentAndDate(departmentId, date));
    }

    @GetMapping("/manager/attendance/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getByEmployeeManager(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping("/manager/attendance/employee/{employeeId}/range")
    public ResponseEntity<List<Attendance>> getByRangeManager(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeAndDateRange(employeeId, from, to));
    }

    @GetMapping("/manager/attendance/employee/{employeeId}/present-count")
    public ResponseEntity<Long> countPresentDaysManager(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(attendanceService.countPresentDays(employeeId, from, to));
    }

    // =========================================================
    // EMPLOYEE  →  /employee/attendance/**
    // =========================================================

    @PostMapping("/employee/attendance/check-in/{employeeId}")
    public ResponseEntity<Attendance> checkIn(@PathVariable Long employeeId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(attendanceService.checkIn(employeeId));
    }

    @PostMapping("/employee/attendance/check-out/{employeeId}")
    public ResponseEntity<Attendance> checkOut(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.checkOut(employeeId));
    }

    @GetMapping("/employee/attendance/my/{employeeId}")
    public ResponseEntity<List<Attendance>> getMyAttendance(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping("/employee/attendance/my/{employeeId}/range")
    public ResponseEntity<List<Attendance>> getMyAttendanceRange(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeAndDateRange(employeeId, from, to));
    }
}