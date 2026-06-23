package com.nexushr.service;

import com.nexushr.dto.request.DepartmentRequest;
import com.nexushr.dto.response.DepartmentResponse;
import com.nexushr.entity.Department;

import java.util.List;

public interface DepartmentService {

    DepartmentResponse createDepartment(DepartmentRequest department);

    DepartmentResponse getDepartmentById(long id);

    DepartmentResponse getDepartmentByName(String name);

    List<DepartmentResponse> getAllDepartments();

    DepartmentResponse updateDepartment(Long id, DepartmentRequest department);

    void deleteDepartment(Long id);

    boolean existsByName(String name);
}
