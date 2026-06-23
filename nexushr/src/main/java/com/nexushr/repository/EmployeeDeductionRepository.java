package com.nexushr.repository;

import com.nexushr.entity.EmployeeDeduction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeDeductionRepository extends JpaRepository<EmployeeDeduction,Long> {

    List<EmployeeDeduction> findByEmployeeId(Long employeeId);
}
