package com.nexushr.repository;

import com.nexushr.dto.response.MonthlyAttendanceResponse;
import com.nexushr.entity.Attendance;
import com.nexushr.entity.Attendancestatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeIdAndDate(Long employeeId, LocalDate date);

    List<Attendance> findByDate(LocalDate date);

    @Query("""
            SELECT new com.nexushr.dto.response.MonthlyAttendanceResponse(
                e.id, CONCAT(e.firstName, ' ',e.lastName),
                d.name,
                SUM(CASE WHEN a.status = 'PRESENT' THEN 1 ELSE 0 END),
                SUM(CASE WHEN a.status = 'ABSENT' THEN 1 ELSE 0 END),
                SUM(CASE WHEN a.status = 'LEAVE' THEN 1 ELSE 0 END)
            ) FROM Attendance a
            JOIN a.employee e
            LEFT JOIN e.department d
            WHERE MONTH(a.date) = :month AND YEAR(a.date) = :year
                 AND (
                        :departmentId IS NULL OR d.id = :departmentId
                      )
            GROUP BY e.id, e.firstName, e.lastName, d.name
            """)
    Page<MonthlyAttendanceResponse> getMonthlyAttendance(@Param("month") Integer month,
                                                         @Param("year") Integer year,
                                                         @Param("departmentId") Long departmentId,
                                                         Pageable pageable);

    @Query("""
            SELECT a FROM Attendance a
            WHERE (cast(:date as date) IS NULL OR a.date = :date)
            AND (cast(:departmentId as long) IS NULL OR a.employee.department.id = :departmentId)
            AND (cast(:employeeId as long) IS NULL OR a.employee.id = :employeeId)
            AND (cast(:status as string) IS NULL OR a.status = :status)
            """)
    Page<Attendance> filterAttendance(@Param("date") LocalDate date,
                                      @Param("departmentId") Long departmentId,
                                      @Param("employeeId") Long employeeId,
                                      @Param("status") Attendancestatus status,
                                      Pageable pageable);
}