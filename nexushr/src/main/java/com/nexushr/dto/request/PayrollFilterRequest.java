package com.nexushr.dto.request;

import com.nexushr.entity.PayrollStatus;
import lombok.Data;

@Data
public class PayrollFilterRequest {
    private Integer payrollMonth;
    private Integer payrollYear;
    private Long departmentId;
    private PayrollStatus status;
    private int page=0;
    private int pageSize=10;
}
