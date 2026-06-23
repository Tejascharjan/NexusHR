package com.nexushr.dto.request;

import com.nexushr.entity.EmployeeStatus;
import com.nexushr.entity.EmploymentType;
import com.nexushr.entity.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    private String gender;
    private LocalDate dateOfBirth;

    private String emergencyContactName;
    private String emergencyContactNumber;

    private Long departmentId;

    private String designation;

    private LocalDate joiningDate;

    private LocalDate probationEndDate;

    private LocalDate confirmationDate;

    private EmployeeStatus status;

    private Role role;

    private EmploymentType employmentType;
}