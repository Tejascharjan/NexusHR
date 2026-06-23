package com.nexushr.dto.response;

import com.nexushr.entity.PayrollStatus;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PayrollResponse {

    private Long payrollId;
    private Long employeeId;
    private String employeeName;
    private Integer payrollMonth;
    private Integer payrollYear;
    private Double basicSalary;
    private Double grossSalary;
    private Double totalAllowances;
    private Double totalDeductions;
    private Double netSalary;
    private PayrollStatus status;
    private List<PayrollItemResponse> payrollItems;
}
