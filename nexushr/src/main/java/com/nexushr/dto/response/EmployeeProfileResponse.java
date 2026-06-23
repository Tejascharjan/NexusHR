package com.nexushr.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class EmployeeProfileResponse {

    private EmployeeDetailsResponse employee;

    private EmployeeCompensationResponse compensation;

    private List<EmployeeAllowanceResponse> allowances;

    private List<EmployeeDeductionResponse> deductions;
}