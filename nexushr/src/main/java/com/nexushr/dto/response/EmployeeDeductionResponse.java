package com.nexushr.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeDeductionResponse {

    private Long id;

    private String deductionName;

    private Double amount;
}