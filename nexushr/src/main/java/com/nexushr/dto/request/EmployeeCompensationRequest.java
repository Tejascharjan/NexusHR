package com.nexushr.dto.request;

import lombok.Data;

@Data
public class EmployeeCompensationRequest {

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