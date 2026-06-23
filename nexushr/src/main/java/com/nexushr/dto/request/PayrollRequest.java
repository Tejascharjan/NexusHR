package com.nexushr.dto.request;

import lombok.Data;

@Data
public class PayrollRequest {

    private Long employeeId;
    private Integer payrollMonth;
    private Integer payrollYear;
}
