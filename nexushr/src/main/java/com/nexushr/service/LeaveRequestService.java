package com.nexushr.service;

import com.nexushr.dto.request.LeaveRequestDTO;
import com.nexushr.dto.response.LeaveRequestResponse;
import com.nexushr.entity.LeaveStatus;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRequestService {
    LeaveRequestResponse applyLeave(LeaveRequestDTO leaveRequest);

    LeaveRequestResponse getLeaveById(Long id);

    List<LeaveRequestResponse> getLeavesByEmployee(Long employeeId);

    List<LeaveRequestResponse> getLeavesByEmployeeAndStatus(Long employeeId, LeaveStatus status);

    List<LeaveRequestResponse> getPendingLeavesByApprover(Long approverId);

    List<LeaveRequestResponse> getAllPendingLeaves();

    LeaveRequestResponse approveLeave(Long leaveId, Long approverId, String remark);

    LeaveRequestResponse rejectLeave(Long leaveId, Long approverId, String remark);

    LeaveRequestResponse cancelLeave(Long leaveId);

    List<LeaveRequestResponse> getApprovedLeavesOnDate(LocalDate date);

    long countPendingLeavesByEmployee(Long employeeId);

    void deleteLeave(Long id);
}
