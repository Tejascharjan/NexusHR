    package com.nexushr.controller;

import com.nexushr.dto.request.DepartmentRequest;
import com.nexushr.dto.response.DepartmentResponse;
import com.nexushr.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    // =========================================================
    // ADMIN  →  /admin/departments/**
    // =========================================================

    @PostMapping("/admin/departments")
    public ResponseEntity<DepartmentResponse> createDepartment(@RequestBody DepartmentRequest department) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(departmentService.createDepartment(department));
    }

    @PutMapping("/admin/departments/{id}")
    public ResponseEntity<DepartmentResponse> updateDepartment(@PathVariable Long id,
                                                               @RequestBody DepartmentRequest department) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, department));
    }

    @DeleteMapping("/admin/departments/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/departments")
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/admin/departments/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    // =========================================================
    // MANAGER  →  /manager/departments/**
    // =========================================================

    @GetMapping("/manager/departments/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentByIdManager(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @GetMapping("/manager/departments/name/{name}")
    public ResponseEntity<DepartmentResponse> getDepartmentByName(@PathVariable String name) {
        return ResponseEntity.ok(departmentService.getDepartmentByName(name));
    }

    // =========================================================
    // EMPLOYEE  →  /employee/departments/**
    // =========================================================

    @GetMapping("/employee/departments/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentByIdEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }
}
