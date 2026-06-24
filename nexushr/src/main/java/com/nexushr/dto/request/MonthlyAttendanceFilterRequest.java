package com.nexushr.dto.request;

import lombok.Data;

@Data
public class MonthlyAttendanceFilterRequest {

    private Integer month;
    private Integer year;
    private Long departmentId;
    private Integer page=0;
    private Integer pageSize=10;
}
