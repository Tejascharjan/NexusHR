package com.nexushr.service;

import com.nexushr.dto.request.LeaveFilterRequest;
import com.nexushr.dto.request.LeaveRequest;
import com.nexushr.dto.response.LeaveResponse;
import com.nexushr.entity.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface LeaveService {
    LeaveResponse applyLeave(LeaveRequest request);

    Page<LeaveResponse> filterLeaves(LeaveFilterRequest request);

    LeaveResponse approveLeave(Long leaveId, Long approverId, String remark);

    LeaveResponse rejectLeave(Long leaveId, Long approverId, String remark);

    LeaveResponse cancelLeave(Long leaveId);
}
