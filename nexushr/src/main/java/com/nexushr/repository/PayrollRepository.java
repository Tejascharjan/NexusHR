package com.nexushr.repository;

import com.nexushr.dto.response.PayrollChartResponse;
import com.nexushr.dto.response.PayrollStatisticsResponse;
import com.nexushr.entity.Payroll;
import com.nexushr.entity.PayrollStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    boolean existsByEmployeeIdAndPayrollMonthAndPayrollYear(Long employeeId, Integer payrollMonth, Integer payrollYear);

    Page<Payroll> findByEmployeeId(Long employeeId, Pageable pageable);

    List<Payroll> findByPayrollMonthAndPayrollYear(Integer payrollMonth, Integer payrollYear);

    @Query("""
                SELECT new com.nexushr.dto.response.PayrollStatisticsResponse(
                    COUNT(p), 
                    SUM(CASE WHEN p.status = com.nexushr.entity.PayrollStatus.PAID THEN 1L ELSE 0L END),
                    SUM(CASE WHEN p.status = com.nexushr.entity.PayrollStatus.DRAFT THEN 1L ELSE 0L END),
                    COALESCE(SUM(p.netSalary), 0.0),
                    COALESCE(SUM(CASE WHEN p.status = com.nexushr.entity.PayrollStatus.PAID THEN p.netSalary ELSE 0.0 END), 0.0)
                )
                FROM Payroll p
                WHERE (cast(:month as int) IS NULL OR p.payrollMonth=:month) 
                  AND (cast(:year as int) IS NULL OR p.payrollYear=:year)
            """)
    PayrollStatisticsResponse getStatistics(Integer month, Integer year);

    @Query("""
            SELECT p FROM Payroll p
            WHERE
            (cast(:month as int) IS NULL OR p.payrollMonth=:month)
            AND (cast(:year as int) IS NULL OR p.payrollYear=:year)
            AND (cast(:departmentId as long) IS NULL OR
                 p.employee.department.id=:departmentId)
            AND (cast(:status as string) IS NULL OR
                 p.status=:status)
            ORDER BY p.employee.firstName
            """)
    Page<Payroll> filterPayroll(Integer month, Integer year, Long departmentId, PayrollStatus status, Pageable pageable);


    @Query("""
        SELECT COALESCE(SUM(p.netSalary),0) FROM Payroll p
        WHERE p.payrollMonth =:month AND p.payrollYear =:year
    """)
    Double getCurrentPayroll(Integer month, Integer year);

    @Query("""
        SELECT new com.nexushr.dto.response.PayrollChartResponse(
            CONCAT(CAST(p.payrollMonth as string),'/',CAST(p.payrollYear as string)),
        SUM(p.netSalary)) FROM Payroll p
        GROUP BY p.payrollYear, p.payrollMonth
        ORDER BY p.payrollYear, p.payrollMonth
    """)
    List<PayrollChartResponse> getPayrollTrend();
}
