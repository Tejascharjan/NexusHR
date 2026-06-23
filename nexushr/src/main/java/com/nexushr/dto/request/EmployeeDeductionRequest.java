package com.nexushr.dto.request;

import lombok.Data;

@Data
public class EmployeeDeductionRequest {

    private String deductionName;

    private Double amount;
}