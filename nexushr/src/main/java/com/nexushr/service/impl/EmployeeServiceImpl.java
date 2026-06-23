package com.nexushr.service.impl;

import com.nexushr.dto.request.EmployeeProfileRequest;
import com.nexushr.dto.request.EmployeeRequest;
import com.nexushr.dto.response.EmployeeResponse;
import com.nexushr.entity.*;
import com.nexushr.repository.*;
import com.nexushr.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeCompensationRepository compensationRepository;
    private final EmployeeAllowanceRepository allowanceRepository;
    private final EmployeeDeductionRepository deductionRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public EmployeeResponse createEmployee(EmployeeProfileRequest request) {
        EmployeeRequest employeeRequest = request.getEmployee();

        Department department = departmentRepository.findById(employeeRequest.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Employee employee = Employee.builder()
                .firstName(employeeRequest.getFirstName())
                .lastName(employeeRequest.getLastName())
                .email(employeeRequest.getEmail())
                .phone(employeeRequest.getPhone())
                .gender(employeeRequest.getGender())
                .dateOfBirth(employeeRequest.getDateOfBirth())
                .designation(employeeRequest.getDesignation())
                .joiningDate(employeeRequest.getJoiningDate())
                .probationEndDate(employeeRequest.getProbationEndDate())
                .confirmationDate(employeeRequest.getConfirmationDate())
                .emergencyContactName(employeeRequest.getEmergencyContactName())
                .emergencyContactNumber(employeeRequest.getEmergencyContactNumber())
                .employmentType(employeeRequest.getEmploymentType())
                .status(employeeRequest.getStatus())
                .role(employeeRequest.getRole())
                .department(department)
                .build();

        Employee savedEmployee = employeeRepository.save(employee);

        saveCompensation(savedEmployee, request);

        saveAllowances(savedEmployee, request);

        saveDeductions(savedEmployee, request);

        return mapToResponse(savedEmployee);
    }

    private void saveCompensation(Employee employee, EmployeeProfileRequest request) {
        if (request.getCompensation() == null) {
            return;
        }
        EmployeeCompensation compensation = EmployeeCompensation.builder()
                .basicSalary(request.getCompensation().getBasicSalary())
                .ctc(request.getCompensation().getCtc())
                .bankName(request.getCompensation().getBankName())
                .accountNumber(request.getCompensation().getAccountNumber())
                .ifscCode(request.getCompensation().getIfscCode())
                .panNumber(request.getCompensation().getPanNumber())
                .uanNumber(request.getCompensation().getUanNumber())
                .pfNumber(request.getCompensation().getPfNumber())
                .esiNumber(request.getCompensation().getEsiNumber())
                .employee(employee)
                .build();
        compensationRepository.save(compensation);
    }

    private void saveAllowances(Employee employee, EmployeeProfileRequest request) {
        if (request.getAllowances() == null || request.getAllowances().isEmpty()) {
            return;
        }
        List<EmployeeAllowance> allowances = request.getAllowances().stream()
                .map(item -> EmployeeAllowance.builder()
                        .allowanceName(item.getAllowanceName())
                        .amount(item.getAmount())
                        .taxable(item.getTaxable())
                        .employee(employee)
                        .build()
                ).toList();
        allowanceRepository.saveAll(allowances);
    }

    private void saveDeductions(Employee employee, EmployeeProfileRequest request) {
        if (request.getDeductions() == null || request.getDeductions().isEmpty()) {
            return;
        }
        List<EmployeeDeduction> deductions = request.getDeductions().stream()
                .map(item -> EmployeeDeduction.builder()
                        .deductionName(item.getDeductionName())
                        .amount(item.getAmount())
                        .employee(employee)
                        .build()
                )
                .toList();
        deductionRepository.saveAll(deductions);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        return mapToResponse(employee);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(() -> new RuntimeException("Department not found"));
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setStatus(request.getStatus());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setRole(request.getRole());
        employee.setDepartment(department);
        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employeeRepository.delete(employee);
    }

    @Override
    public EmployeeResponse updateEmployeeStatus(Long id, EmployeeStatus status) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setStatus(status);
        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToResponse(updatedEmployee);
    }

    private EmployeeResponse mapToResponse(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .status(employee.getStatus())
                .joiningDate(employee.getJoiningDate())
                .offboardingDate(employee.getOffboardingDate())
                .departmentId(employee.getDepartment() != null ? employee.getDepartment().getId() : null)
                .departmentName(employee.getDepartment() != null ? employee.getDepartment().getName() : null)
                .role(employee.getRole())
                .build();
    }


}
