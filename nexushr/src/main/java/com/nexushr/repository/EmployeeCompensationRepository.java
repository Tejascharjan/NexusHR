package com.nexushr.repository;

import com.nexushr.entity.EmployeeCompensation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeCompensationRepository extends JpaRepository<EmployeeCompensation,Long> {
    Optional<EmployeeCompensation> findByEmployeeId(Long employeeId);
}
