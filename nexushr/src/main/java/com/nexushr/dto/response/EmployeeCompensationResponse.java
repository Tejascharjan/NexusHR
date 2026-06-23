package com.nexushr.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeCompensationResponse {

    private Long id;

    private Double basicSalary;

    private Double ctc;

    private String bankName;

    private String accountNumber;

    private String ifscCode;

    private String panNumber;

    private String uanNumber;

    private String pfNumber;

    private String esiNumber;
}