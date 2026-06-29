package com.nexushr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayrollStatisticsResponse {

    private Long totalEmployees;
    private Long paidEmployees;
    private Long pendingEmployees;
    private Double totalPayrollAmount;
    private Double totalPaidAmount;
}
