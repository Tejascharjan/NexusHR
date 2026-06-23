package com.nexushr.service;

import com.nexushr.dto.request.EmployeeProfileRequest;
import com.nexushr.dto.request.EmployeeRequest;
import com.nexushr.dto.response.EmployeeProfileResponse;
import com.nexushr.dto.response.EmployeeResponse;
import com.nexushr.entity.EmployeeStatus;
import com.nexushr.entity.Role;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeProfileRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);

    EmployeeResponse updateEmployeeStatus(Long id, EmployeeStatus status);

}