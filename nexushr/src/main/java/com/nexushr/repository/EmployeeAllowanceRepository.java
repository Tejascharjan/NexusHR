package com.nexushr.repository;

import com.nexushr.entity.EmployeeAllowance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeAllowanceRepository extends JpaRepository<EmployeeAllowance, Long> {

    List<EmployeeAllowance> findByEmployeeId(Long employeeId);
}
