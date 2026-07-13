package com.nexushr.controller;

import com.nexushr.dto.request.EmployeeProfileRequest;
import com.nexushr.dto.request.EmployeeRequest;
import com.nexushr.dto.response.AuthResponse;
import com.nexushr.dto.response.EmployeeProfileResponse;
import com.nexushr.dto.response.EmployeeResponse;
import com.nexushr.service.AuthService;
import com.nexushr.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@RequestBody EmployeeProfileRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.createEmployee(request));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/id")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@AuthenticationPrincipal UserDetails userDetails) {
        AuthResponse currentUser = authService.getCurrentUser(userDetails);
        return ResponseEntity.ok(employeeService.getEmployeeById(currentUser.getUser().getId()));
    }
}