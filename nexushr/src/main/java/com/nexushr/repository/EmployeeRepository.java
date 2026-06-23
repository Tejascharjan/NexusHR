package com.nexushr.repository;

import com.nexushr.entity.Employee;
import com.nexushr.entity.EmployeeStatus;
import com.nexushr.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    List<Employee> findByStatus(EmployeeStatus status);

    List<Employee> findByDepartmentId(Long departmentId);

    List<Employee> findByRole(Role role);

    @Query("SELECT e FROM Employee e WHERE e.department.id = :deptId AND e.status='ACTIVE'")
    List<Employee> findActiveByDepartment(@Param("deptId") Long deptId);

    @Query("SELECT count(e) FROM Employee e WHERE e.status='ACTIVE'")
    long countActiveEmployees();

    boolean existsByEmail(String email);
}