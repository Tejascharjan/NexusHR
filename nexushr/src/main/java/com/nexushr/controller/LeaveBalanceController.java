package com.nexushr.controller;

import com.nexushr.entity.LeaveBalance;
import com.nexushr.entity.LeaveType;
import com.nexushr.service.LeaveBalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;

    // =========================================================
    // ADMIN  →  /admin/leave-balances/**
    // =========================================================

    @PostMapping("/admin/leave-balances")
    public ResponseEntity<LeaveBalance> createLeaveBalance(@RequestBody LeaveBalance leaveBalance) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(leaveBalanceService.createLeaveBalance(leaveBalance));
    }

    @GetMapping("/admin/leave-balances/{id}")
    public ResponseEntity<LeaveBalance> getById(@PathVariable Long id) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalanceById(id));
    }

    @GetMapping("/admin/leave-balances/employee/{employeeId}")
    public ResponseEntity<List<LeaveBalance>> getByEmployeeAdmin(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalancesByEmployee(employeeId));
    }

    @GetMapping("/admin/leave-balances/employee/{employeeId}/year/{year}")
    public ResponseEntity<List<LeaveBalance>> getByEmployeeAndYear(@PathVariable Long employeeId,
                                                                   @PathVariable Integer year) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalancesByEmployeeAndYear(employeeId, year));
    }

    @PutMapping("/admin/leave-balances/{id}")
    public ResponseEntity<LeaveBalance> updateLeaveBalance(@PathVariable Long id,
                                                           @RequestBody LeaveBalance leaveBalance) {
        return ResponseEntity.ok(leaveBalanceService.updateLeaveBalance(id, leaveBalance));
    }

    @PatchMapping("/admin/leave-balances/deduct")
    public ResponseEntity<LeaveBalance> deductLeave(@RequestParam Long employeeId,
                                                    @RequestParam LeaveType leaveType,
                                                    @RequestParam Integer year,
                                                    @RequestParam Integer days) {
        return ResponseEntity.ok(leaveBalanceService.deductLeave(employeeId, leaveType, year, days));
    }

    @PatchMapping("/admin/leave-balances/restore")
    public ResponseEntity<LeaveBalance> restoreLeave(@RequestParam Long employeeId,
                                                     @RequestParam LeaveType leaveType,
                                                     @RequestParam Integer year,
                                                     @RequestParam Integer days) {
        return ResponseEntity.ok(leaveBalanceService.restoreLeave(employeeId, leaveType, year, days));
    }

    @DeleteMapping("/admin/leave-balances/{id}")
    public ResponseEntity<Void> deleteLeaveBalance(@PathVariable Long id) {
        leaveBalanceService.deleteLeaveBalance(id);
        return ResponseEntity.noContent().build();
    }

    // =========================================================
    // MANAGER  →  /manager/leave-balances/**
    // =========================================================

    @GetMapping("/manager/leave-balances/employee/{employeeId}")
    public ResponseEntity<List<LeaveBalance>> getByEmployeeManager(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalancesByEmployee(employeeId));
    }

    @GetMapping("/manager/leave-balances/employee/{employeeId}/year/{year}")
    public ResponseEntity<List<LeaveBalance>> getByEmployeeAndYearManager(@PathVariable Long employeeId,
                                                                          @PathVariable Integer year) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalancesByEmployeeAndYear(employeeId, year));
    }

    // =========================================================
    // EMPLOYEE  →  /employee/leave-balances/**
    // =========================================================

    @GetMapping("/employee/leave-balances/my/{employeeId}")
    public ResponseEntity<List<LeaveBalance>> getMyBalances(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalancesByEmployee(employeeId));
    }

    @GetMapping("/employee/leave-balances/my/{employeeId}/year/{year}")
    public ResponseEntity<List<LeaveBalance>> getMyBalancesByYear(@PathVariable Long employeeId,
                                                                  @PathVariable Integer year) {
        return ResponseEntity.ok(leaveBalanceService.getLeaveBalancesByEmployeeAndYear(employeeId, year));
    }
}
