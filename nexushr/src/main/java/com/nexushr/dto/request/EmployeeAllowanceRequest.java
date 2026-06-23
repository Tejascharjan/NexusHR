package com.nexushr.dto.request;

import lombok.Data;

@Data
public class EmployeeAllowanceRequest {

    private String allowanceName;

    private Double amount;

    private Boolean taxable;
}