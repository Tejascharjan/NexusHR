package com.nexushr.repository;

import com.nexushr.entity.Leave;
import com.nexushr.entity.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    Page<Leave> findByEmployeeId(Long employeeId, Pageable pageable);

    Page<Leave> findByEmployeeIdAndStatus(Long employeeId, LeaveStatus status, Pageable pageable);

    @Query("""
            SELECT l FROM Leave l
            WHERE (cast(:employeeId AS long) IS NULL OR l.employee.id = :employeeId)
            AND (cast(:status AS string) IS NULL OR l.status = :status)
            AND (cast(:date AS date) IS NULL OR :date BETWEEN l.fromDate AND l.toDate)
            ORDER BY l.requestedAt DESC
            """)
    Page<Leave> filterLeaves(@Param("date") LocalDate date,
                             @Param("employeeId") Long employeeId,
                             @Param("status") LeaveStatus status,
                             Pageable pageable);

}