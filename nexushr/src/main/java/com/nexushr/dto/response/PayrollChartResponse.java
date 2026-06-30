package com.nexushr.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayrollChartResponse {
    private String month;
    private Double payrollAmount;
}
