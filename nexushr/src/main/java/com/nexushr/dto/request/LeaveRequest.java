package com.nexushr.dto.request;

import com.nexushr.entity.LeaveType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveRequest {
    private Long employeeId;
    private LeaveType leaveType;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;


}
