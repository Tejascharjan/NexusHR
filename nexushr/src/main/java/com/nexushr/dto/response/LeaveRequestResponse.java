package com.nexushr.dto.response;

import com.nexushr.entity.Employee;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.entity.LeaveType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class LeaveRequestResponse {
    private Long id;
    private Long employeeId;
    private Long approverId;
    private String employeeName;
    private LeaveType leaveType;
    private LocalDate fromDate;
    private LocalDate toDate;
    private Integer totalDays;
    private String reason;
    private LeaveStatus status;
    private String approverName;
    private String approverRemarks;
    private LocalDateTime requestedAt;
    private LocalDateTime reviewedAt;
}
