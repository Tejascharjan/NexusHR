package com.nexushr.service.impl;

import com.nexushr.dto.request.DepartmentRequest;
import com.nexushr.dto.response.DepartmentResponse;
import com.nexushr.entity.Department;
import com.nexushr.entity.Employee;
import com.nexushr.repository.DepartmentRepository;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public DepartmentResponse createDepartment(DepartmentRequest department) {
        if (existsByName(department.getName())) {
            throw new RuntimeException("Department already exists: " + department.getName());
        }
        Department dept = new Department();
        dept.setName(department.getName());
        dept.setDescription(department.getDescription());

        if(department.getManagerId() == null) {
            dept.setManager(null);
        }else {
            Employee manager = employeeRepository.findById(department.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + department.getManagerId()));
            dept.setManager(manager);
        }
        dept.setIsActive(department.getIsActive());
        Department savedDepartment = departmentRepository.save(dept);
        return mapToDepartmentResponse(savedDepartment);
    }

    @Override
    public DepartmentResponse getDepartmentById(long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        return mapToDepartmentResponse(department);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findByIsActiveTrue().stream()
                .map(this::mapToDepartmentResponse)
                .toList();
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest request) {
        Department existing = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

        Employee manager = employeeRepository.findById(request.getManagerId())
                .orElseThrow(() -> new RuntimeException("Employee not found: " + request.getManagerId()));

        existing.setName(request.getName());
        existing.setDescription(request.getDescription());
        existing.setManager(manager);
        existing.setIsActive(request.getIsActive());

        Department updatedDepartment = departmentRepository.save(existing);
        return mapToDepartmentResponse(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        Department existing = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        existing.setIsActive(false);
        departmentRepository.save(existing);
    }

    @Override
    public boolean existsByName(String name) {
        return departmentRepository.existsByName(name);
    }

    @Override
    public List<DepartmentResponse> getDepartmentsByManagerId(Long managerId) {
        return departmentRepository.findByManager_Id(managerId).stream()
                .map(this::mapToDepartmentResponse)
                .toList();
    }

    private DepartmentResponse mapToDepartmentResponse(Department department) {
        DepartmentResponse response = new DepartmentResponse();
        response.setId(department.getId());
        response.setName(department.getName());
        response.setDescription(department.getDescription());
        response.setIsActive(department.getIsActive());
        response.setCreatedAt(department.getCreatedAt());
        response.setUpdatedAt(department.getUpdatedAt());

        if (department.getManager() != null) {
            response.setManagerId(department.getManager().getId());
            String managerName = department.getManager().getFirstName() + " " + department.getManager().getLastName();
            response.setManagerName(managerName.trim());
        }
        response.setEmployeeCount(department.getEmployees() != null ? department.getEmployees().size() : 0);
        return response;
    }
}
