package com.nexushr.repository;

import com.nexushr.dto.response.DepartmentChartResponse;
import com.nexushr.entity.Employee;
import com.nexushr.entity.EmployeeStatus;
import com.nexushr.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    boolean existsByEmail(String email);

    @Query(" SELECT COUNT(e) FROM Employee e ")
    Long getTotalEmployees();

    @Query("""
            SELECT e FROM Employee e 
            ORDER BY e.createdAt DESC
            LIMIT 5
        """)
    List<Employee> getRecentEmployees();

    @Query("""
        SELECT new com.nexushr.dto.response.DepartmentChartResponse(d.name, COUNT(e))
        FROM Employee e 
        JOIN e.department d
        GROUP BY d.id, d.name
        ORDER BY COUNT(e) DESC
    """)
    List<DepartmentChartResponse> getDepartmentDistribution();

    Page<Employee> findAllByOrderByCreatedAtDesc(Pageable pageable);
}