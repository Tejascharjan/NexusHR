package com.nexushr.repository;

import com.nexushr.entity.LeaveBalance;
import com.nexushr.entity.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Long> {

    List<LeaveBalance> findByEmployeeId(Long employeeId);
    List<LeaveBalance> findByEmployeeIdAndYear(Long employeeId, Integer year);
    Optional<LeaveBalance> findByEmployeeIdAndLeaveTypeAndYear(Long employeeId, LeaveType leaveType, Integer year);

    @Query("SELECT lb FROM LeaveBalance lb WHERE lb.employee.id=:empId AND lb.remaining > 0 AND lb.year = :year")
    List<LeaveBalance> findAvailableLeavesByEmployee(@Param("empId") Long empId, @Param("year") Integer year);

    @Query("SELECT SUM(lb.used) FROM LeaveBalance lb WHERE lb.employee.department.id = :deptId AND lb.year = :year")
    Long sumUsedLeavesByDepartmentAndYear(@Param("deptId") Long deptId, @Param("year") Integer year);
}
