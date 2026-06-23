package com.nexushr.controller;

import com.nexushr.dto.request.LeaveRequestDTO;
import com.nexushr.dto.response.LeaveRequestResponse;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.service.LeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService  leaveRequestService;

    // =========================================================
    // ADMIN  →  /admin/leaves/**
    // =========================================================

    @GetMapping("/admin/leaves")
    public ResponseEntity<List<LeaveRequestResponse>> getAllPendingLeaves() {
        return ResponseEntity.ok(leaveRequestService.getAllPendingLeaves());
    }

    @GetMapping("/admin/leaves/{id}")
    public ResponseEntity<LeaveRequestResponse> getLeaveById(@PathVariable Long id) {
        return ResponseEntity.ok(leaveRequestService.getLeaveById(id));
    }

    @GetMapping("/admin/leaves/approved/date")
    public ResponseEntity<List<LeaveRequestResponse>> getApprovedOnDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(leaveRequestService.getApprovedLeavesOnDate(date));
    }

    @GetMapping("/admin/leaves/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequestResponse>> getByEmployeeAdmin(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.getLeavesByEmployee(employeeId));
    }

    @PatchMapping("/admin/leaves/{leaveId}/approve")
    public ResponseEntity<LeaveRequestResponse> approveLeaveAdmin(@PathVariable Long leaveId,
                                                          @RequestParam Long approverId,
                                                          @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(leaveRequestService.approveLeave(leaveId, approverId, remarks));
    }

    @PatchMapping("/admin/leaves/{leaveId}/reject")
    public ResponseEntity<LeaveRequestResponse> rejectLeaveAdmin(@PathVariable Long leaveId,
                                                         @RequestParam Long approverId,
                                                         @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(leaveRequestService.rejectLeave(leaveId, approverId, remarks));
    }

    @DeleteMapping("/admin/leaves/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable Long id) {
        leaveRequestService.deleteLeave(id);
        return ResponseEntity.noContent().build();
    }

    // =========================================================
    // MANAGER  →  /manager/leaves/**
    // =========================================================

    @GetMapping("/manager/leaves/pending")
    public ResponseEntity<List<LeaveRequestResponse>> getPendingByApprover(@RequestParam Long approverId) {
        return ResponseEntity.ok(leaveRequestService.getPendingLeavesByApprover(approverId));
    }

    @GetMapping("/manager/leaves/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequestResponse>> getByEmployeeManager(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.getLeavesByEmployee(employeeId));
    }

    @GetMapping("/manager/leaves/employee/{employeeId}/status/{status}")
    public ResponseEntity<List<LeaveRequestResponse>> getByEmployeeAndStatusManager(
            @PathVariable Long employeeId,
            @PathVariable LeaveStatus status) {
        return ResponseEntity.ok(leaveRequestService.getLeavesByEmployeeAndStatus(employeeId, status));
    }

    @PatchMapping("/manager/leaves/{leaveId}/approve")
    public ResponseEntity<LeaveRequestResponse> approveLeaveManager(@PathVariable Long leaveId,
                                                            @RequestParam Long approverId,
                                                            @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(leaveRequestService.approveLeave(leaveId, approverId, remarks));
    }

    @PatchMapping("/manager/leaves/{leaveId}/reject")
    public ResponseEntity<LeaveRequestResponse> rejectLeaveManager(@PathVariable Long leaveId,
                                                           @RequestParam Long approverId,
                                                           @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(leaveRequestService.rejectLeave(leaveId, approverId, remarks));
    }

    // =========================================================
    // EMPLOYEE  →  /employee/leaves/**
    // =========================================================

    @PostMapping("/employee/leaves")
    public ResponseEntity<LeaveRequestResponse> applyLeave(@RequestBody LeaveRequestDTO leaveRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(leaveRequestService.applyLeave(leaveRequest));
    }

    @GetMapping("/employee/leaves/my/{employeeId}")
    public ResponseEntity<List<LeaveRequestResponse>> getMyLeaves(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.getLeavesByEmployee(employeeId));
    }

    @GetMapping("/employee/leaves/my/{employeeId}/status/{status}")
    public ResponseEntity<List<LeaveRequestResponse>> getMyLeavesByStatus(@PathVariable Long employeeId,
                                                                  @PathVariable LeaveStatus status) {
        return ResponseEntity.ok(leaveRequestService.getLeavesByEmployeeAndStatus(employeeId, status));
    }

    @GetMapping("/employee/leaves/my/{employeeId}/pending-count")
    public ResponseEntity<Long> countMyPendingLeaves(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.countPendingLeavesByEmployee(employeeId));
    }

    @PatchMapping("/employee/leaves/{leaveId}/cancel")
    public ResponseEntity<LeaveRequestResponse> cancelLeave(@PathVariable Long leaveId) {
        return ResponseEntity.ok(leaveRequestService.cancelLeave(leaveId));
    }
}
