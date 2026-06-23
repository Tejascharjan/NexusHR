package com.nexushr.dto.response;

import com.nexushr.entity.EmployeeStatus;
import com.nexushr.entity.EmploymentType;
import com.nexushr.entity.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data

public class EmployeeDetailsResponse {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String gender;

    private LocalDate dateOfBirth;

    private String emergencyContactName;

    private String emergencyContactNumber;

    private String designation;

    private EmployeeStatus status;

    private EmploymentType employmentType;

    private Role role;

    private LocalDate joiningDate;

    private LocalDate probationEndDate;

    private LocalDate confirmationDate;

    private LocalDate offboardingDate;

    private Long departmentId;

    private String departmentName;
}