package com.nexushr.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeAllowanceResponse {

    private Long id;

    private String allowanceName;

    private Double amount;

    private Boolean taxable;
}