package com.nexushr.dto.response;

import com.nexushr.entity.LeaveStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentLeaveResponse {
    private Long leaveId;
    private String employeeName;
    private String leaveType;
    private LeaveStatus status;
    private LocalDate fromDate;
    private LocalDate toDate;
    private Integer totalDays;
}
