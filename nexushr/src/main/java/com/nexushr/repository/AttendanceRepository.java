package com.nexushr.repository;

import com.nexushr.entity.Attendance;
import com.nexushr.entity.Attendancestatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeId(Long employeeId);

    Optional<Attendance> findByEmployeeIdAndDate(Long employeeId, LocalDate date);

    List<Attendance> findByEmployeeIdAndDateBetween(Long employeeId, LocalDate from, LocalDate to);

    List<Attendance> findByDateAndStatus(LocalDate date, Attendancestatus status);

    List<Attendance> findByDate(LocalDate date);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.employee.id = :empId AND a.status = 'PRESENT' AND a.date BETWEEN :from AND :to")
    long countPresentDays(@Param("empId") Long empId, @Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT a FROM Attendance a WHERE a.employee.department.id = :deptId AND a.date= :date")
    List<Attendance> findByDepartmentAndDate(@Param("deptId") Long deptId, @Param("date") LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.biometricVerified = false AND a.date = :date")
    List<Attendance> findUnverifiedBiometricByDate(@Param("date") LocalDate date);

}