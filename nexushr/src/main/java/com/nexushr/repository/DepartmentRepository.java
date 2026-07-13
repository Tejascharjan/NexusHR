package com.nexushr.repository;


import com.nexushr.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByName(String name);

    List<Department> findByIsActiveTrue();

    boolean existsByName(String name);

    @Query("""
            SELECT COUNT(d) FROM Department d
            WHERE d.isActive=true
        """)
    Long getActiveDepartments();

    List<Department> findByManager_Id(Long managerId);
}
