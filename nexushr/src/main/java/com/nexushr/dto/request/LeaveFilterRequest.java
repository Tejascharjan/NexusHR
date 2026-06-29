package com.nexushr.dto.request;

import com.nexushr.entity.LeaveStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveFilterRequest {

    private LocalDate date;
    private Long employeeId;
    private LeaveStatus status;
    private Integer page=0;
    private Integer pageSize=10;
}
