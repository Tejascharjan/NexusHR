package com.nexushr.controller;

import com.nexushr.dto.request.EmployeeProfileRequest;
import com.nexushr.dto.request.EmployeeRequest;
import com.nexushr.dto.response.EmployeeProfileResponse;
import com.nexushr.dto.response.EmployeeResponse;
import com.nexushr.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/admin/employees")
    public ResponseEntity<EmployeeResponse> createEmployee(@RequestBody EmployeeProfileRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.createEmployee(request));
    }

    @GetMapping("/admin/employees")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/admin/employees/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }
}