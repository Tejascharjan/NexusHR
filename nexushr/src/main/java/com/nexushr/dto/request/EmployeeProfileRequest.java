package com.nexushr.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeProfileRequest {

    private EmployeeRequest employee;

    private EmployeeCompensationRequest compensation;

    private List<EmployeeAllowanceRequest> allowances;

    private List<EmployeeDeductionRequest> deductions;
}