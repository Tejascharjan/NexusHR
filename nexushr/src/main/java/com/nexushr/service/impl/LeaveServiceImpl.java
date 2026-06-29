package com.nexushr.service.impl;

import com.nexushr.dto.request.LeaveFilterRequest;
import com.nexushr.dto.request.LeaveRequest;
import com.nexushr.dto.response.LeaveResponse;
import com.nexushr.entity.Employee;
import com.nexushr.entity.Leave;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.LeaveRepository;
import com.nexushr.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public LeaveResponse applyLeave(LeaveRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId()).orElseThrow(() -> new RuntimeException("Employee not found"));

        Leave leave =Leave.builder()
                .employee(employee)
                .leaveType(request.getLeaveType())
                .fromDate(request.getFromDate())
                .toDate(request.getToDate())
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .requestedAt(LocalDateTime.now())
                .totalDays((int) ChronoUnit.DAYS.between(request.getFromDate(), request.getToDate())+1)
                .build();
        return mapToLeaveResponse(leaveRepository.save(leave));
    }

    @Override
    public Page<LeaveResponse> filterLeaves(LeaveFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize(), Sort.by("requestedAt").descending());

        Page<Leave> leaves = leaveRepository.filterLeaves(request.getDate(), request.getEmployeeId(),request.getStatus(), pageable);
        return leaves.map(this::mapToLeaveResponse);
    }

    @Override
    public LeaveResponse approveLeave(Long leaveId, Long approverId, String remark) {
        Leave leave = leaveRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave not found"));

        Employee approver = employeeRepository.findById(approverId).orElseThrow(() -> new RuntimeException("Employee not found"));

        leave.setStatus(LeaveStatus.APPROVED);
        leave.setApprover(approver);
        leave.setApproverRemarks(remark);
        leave.setReviewedAt(LocalDateTime.now());
        return mapToLeaveResponse(leaveRepository.save(leave));
    }

    @Override
    public LeaveResponse rejectLeave(Long leaveId, Long approverId, String remark) {
        Leave leave = leaveRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave not found"));

        Employee approver = employeeRepository.findById(approverId).orElseThrow(() -> new RuntimeException("Employee not found"));

        leave.setStatus(LeaveStatus.REJECTED);
        leave.setApprover(approver);
        leave.setApproverRemarks(remark);
        leave.setReviewedAt(LocalDateTime.now());
        return mapToLeaveResponse(leaveRepository.save(leave));
    }

    @Override
    public LeaveResponse cancelLeave(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus(LeaveStatus.CANCELLED);
        return mapToLeaveResponse(leaveRepository.save(leave));
    }

    private LeaveResponse mapToLeaveResponse(Leave leave) {
        LeaveResponse response = new LeaveResponse();
        response.setId(leave.getId());
        response.setEmployeeId(leave.getEmployee() != null ? leave.getEmployee().getId() : null);
        response.setApproverId(leave.getApprover() != null ? leave.getApprover().getId() : null);
        response.setEmployeeName(leave.getEmployee() != null ? leave.getEmployee().getFirstName() + " " + leave.getEmployee().getLastName() : null);
        response.setLeaveType(leave.getLeaveType());
        response.setFromDate(leave.getFromDate());
        response.setToDate(leave.getToDate());
        response.setTotalDays(leave.getTotalDays());
        response.setReason(leave.getReason());
        response.setStatus(leave.getStatus());
        response.setApproverName(leave.getApprover() != null ? leave.getApprover().getFirstName() + " " + leave.getApprover().getLastName() : null);
        response.setApproverRemarks(leave.getApproverRemarks());
        response.setRequestedAt(leave.getRequestedAt());
        response.setReviewedAt(leave.getReviewedAt());
        return response;
    }
}
