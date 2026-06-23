package com.nexushr.repository;

import com.nexushr.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    boolean existsByEmployeeIdAndPayrollMonthAndPayrollYear(Long employeeId, Integer payrollMonth, Integer payrollYear);

    List<Payroll> findByEmployeeId(Long employeeId);

    Optional<Payroll> findByEmployeeIdAndPayrollMonthAndPayrollYear(Long employeeId, Integer payrollMonth, Integer payrollYear);

    List<Payroll> findByPayrollMonthAndPayrollYear(Integer payrollMonth, Integer payrollYear);
}
