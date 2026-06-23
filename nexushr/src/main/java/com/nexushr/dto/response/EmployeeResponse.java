package com.nexushr.dto.response;

import com.nexushr.entity.EmployeeStatus;
import com.nexushr.entity.EmploymentType;
import com.nexushr.entity.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class EmployeeResponse {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String designation;

    private EmployeeStatus status;

    private EmploymentType employmentType;

    private LocalDate joiningDate;

    private LocalDate offboardingDate;

    private Long departmentId;

    private String departmentName;

    private Role role;
}