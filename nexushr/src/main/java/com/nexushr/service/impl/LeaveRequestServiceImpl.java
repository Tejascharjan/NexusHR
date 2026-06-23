package com.nexushr.service.impl;

import com.nexushr.dto.request.LeaveRequestDTO;
import com.nexushr.dto.response.LeaveRequestResponse;
import com.nexushr.entity.Employee;
import com.nexushr.entity.LeaveRequest;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.LeaveRequestRepository;
import com.nexushr.service.LeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveRequestResponse applyLeave(LeaveRequestDTO leaveRequest) {
        if (leaveRequest.getFromDate().isAfter(leaveRequest.getToDate())) {
            throw new RuntimeException("From date must be before to date.");
        }
        int totalDays = (int) ChronoUnit.DAYS.between(leaveRequest.getFromDate(), leaveRequest.getToDate()) + 1;
        Employee employee = employeeRepository.findById(leaveRequest.getEmployeeId()).orElseThrow(() -> new RuntimeException("employee not found with id: " + leaveRequest.getEmployeeId()));
        LeaveRequest leave = new LeaveRequest();
        leave.setEmployee(employee);
        leave.setLeaveType(leaveRequest.getLeaveType());
        leave.setFromDate(leaveRequest.getFromDate());
        leave.setToDate(leaveRequest.getToDate());
        leave.setReason(leaveRequest.getReason());
        leave.setTotalDays(totalDays);
        leave.setStatus(LeaveStatus.PENDING);
        leave.setRequestedAt(LocalDateTime.now());
        LeaveRequest savedLeaveRequest = leaveRequestRepository.save(leave);
        return mapToLeaveRequestResponse(savedLeaveRequest);
    }

    @Override
    public LeaveRequestResponse getLeaveById(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found with id " + id));
        return mapToLeaveRequestResponse(leaveRequest);
    }

    @Override
    public List<LeaveRequestResponse> getLeavesByEmployee(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToLeaveRequestResponse)
                .toList();
    }

    @Override
    public List<LeaveRequestResponse> getLeavesByEmployeeAndStatus(Long employeeId, LeaveStatus status) {
        return leaveRequestRepository.findByEmployeeIdAndStatus(employeeId, status).stream()
                .map(this::mapToLeaveRequestResponse)
                .toList();
    }

    @Override
    public List<LeaveRequestResponse> getPendingLeavesByApprover(Long approverId) {
        return leaveRequestRepository.findByApproverIdAndStatus(approverId, LeaveStatus.PENDING).stream()
                .map(this::mapToLeaveRequestResponse)
                .toList();
    }

    @Override
    public List<LeaveRequestResponse> getAllPendingLeaves() {
        return leaveRequestRepository.findByStatus(LeaveStatus.PENDING).stream()
                .map(this::mapToLeaveRequestResponse)
                .toList();
    }

    @Override
    public LeaveRequestResponse approveLeave(Long leaveId, Long approverId, String remark) {
        LeaveRequest leave = leaveRequestRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave request not found with id " + leaveId));
        Employee approver = employeeRepository.findById(approverId).orElseThrow(() -> new RuntimeException("Approver not found with id " + approverId));
        leave.setStatus(LeaveStatus.APPROVED);
        leave.setApprover(approver);
        leave.setApproverRemarks(remark);
        leave.setReviewedAt(LocalDateTime.now());
        LeaveRequest updatedLR = leaveRequestRepository.save(leave);
        return mapToLeaveRequestResponse(updatedLR);
    }

    @Override
    public LeaveRequestResponse rejectLeave(Long leaveId, Long approverId, String remark) {
        LeaveRequest leave = leaveRequestRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave request not found with id " + leaveId));
        Employee approver = employeeRepository.findById(approverId).orElseThrow(() -> new RuntimeException("Approver not found with id " + approverId));
        leave.setStatus(LeaveStatus.REJECTED);
        leave.setApprover(approver);
        leave.setApproverRemarks(remark);
        leave.setReviewedAt(LocalDateTime.now());
        LeaveRequest updatedLR = leaveRequestRepository.save(leave);
        return mapToLeaveRequestResponse(updatedLR);
    }

    @Override
    public LeaveRequestResponse cancelLeave(Long leaveId) {
        LeaveRequest leave = leaveRequestRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave request not found with id " + leaveId));
        if (leave.getStatus() == LeaveStatus.APPROVED || leave.getStatus() == LeaveStatus.REJECTED) {
            throw new RuntimeException("Cannot cancel an already processed leave request.");
        }
        leave.setStatus(LeaveStatus.CANCELLED);
        LeaveRequest updatedLR = leaveRequestRepository.save(leave);
        return mapToLeaveRequestResponse(updatedLR);
    }

    @Override
    public List<LeaveRequestResponse> getApprovedLeavesOnDate(LocalDate date) {
        return leaveRequestRepository.findApprovedLeavesOnDate(date).stream()
                .map(this::mapToLeaveRequestResponse)
                .toList();
    }

    @Override
    public long countPendingLeavesByEmployee(Long employeeId) {
        return leaveRequestRepository.countPendingLeavesByEmployee(employeeId);
    }

    @Override
    public void deleteLeave(Long id) {
        if (!leaveRequestRepository.existsById(id)) {
            throw new RuntimeException("Leave request not found with id " + id);
        }
        leaveRequestRepository.deleteById(id);
    }

    private LeaveRequestResponse mapToLeaveRequestResponse(LeaveRequest leaveRequest) {
        LeaveRequestResponse response = new LeaveRequestResponse();
        response.setId(leaveRequest.getId());
        response.setEmployeeId(leaveRequest.getEmployee() != null ? leaveRequest.getEmployee().getId() : null);
        response.setApproverId(leaveRequest.getApprover() != null ? leaveRequest.getApprover().getId() : null);
        response.setEmployeeName(leaveRequest.getEmployee() != null ? leaveRequest.getEmployee().getFirstName() + " " + leaveRequest.getEmployee().getLastName() : null);
        response.setLeaveType(leaveRequest.getLeaveType());
        response.setFromDate(leaveRequest.getFromDate());
        response.setToDate(leaveRequest.getToDate());
        response.setTotalDays(leaveRequest.getTotalDays());
        response.setReason(leaveRequest.getReason());
        response.setStatus(leaveRequest.getStatus());
        response.setApproverName(leaveRequest.getApprover() != null ? leaveRequest.getApprover().getFirstName() + " " + leaveRequest.getApprover().getLastName() : null);
        response.setApproverRemarks(leaveRequest.getApproverRemarks());
        response.setRequestedAt(leaveRequest.getRequestedAt());
        response.setReviewedAt(leaveRequest.getReviewedAt());
        return response;
    }
}
