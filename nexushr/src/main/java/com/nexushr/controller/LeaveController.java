package com.nexushr.controller;

import com.nexushr.dto.request.LeaveFilterRequest;
import com.nexushr.dto.request.LeaveRequest;
import com.nexushr.dto.response.LeaveResponse;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.service.LeaveService;
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
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    public ResponseEntity<LeaveResponse> applyLeave(@RequestBody LeaveRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leaveService.applyLeave(request));
    }

    @PostMapping("/filter")
    public ResponseEntity<Page<LeaveResponse>> filterLeaves(@RequestBody LeaveFilterRequest request) {
        return ResponseEntity.ok(leaveService.filterLeaves(request));
    }

    @PutMapping("/{leaveId}/approve")
    public ResponseEntity<LeaveResponse> approveLeave(@PathVariable Long leaveId, @RequestParam Long approverId, @RequestParam(required = false) String remarks){
        return ResponseEntity.ok(leaveService.approveLeave(leaveId, approverId, remarks));
    }

    @PutMapping("/{leaveId}/reject")
    public ResponseEntity<LeaveResponse> rejectLeave(@PathVariable Long leaveId, @RequestParam Long approverId, @RequestParam(required = false) String remarks){
        return ResponseEntity.ok(leaveService.rejectLeave(leaveId, approverId, remarks));
    }

    @PutMapping("/{leaveId}/cancel")
    public ResponseEntity<LeaveResponse> cancelLeave(@PathVariable Long leaveId){
        return ResponseEntity.ok(leaveService.cancelLeave(leaveId));
    }
}
