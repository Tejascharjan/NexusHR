package com.nexushr.repository;

import com.nexushr.entity.LeaveRequest;
import com.nexushr.entity.LeaveStatus;
import com.nexushr.entity.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);

    List<LeaveRequest> findByEmployeeIdAndStatus(Long employeeId, LeaveStatus status);

    List<LeaveRequest> findByEmployeeIdAndLeaveType(Long employeeId, LeaveType leaveType);

    List<LeaveRequest> findByStatus(LeaveStatus status);

    List<LeaveRequest> findByApproverId(Long approverId);

    List<LeaveRequest> findByApproverIdAndStatus(Long approverId, LeaveStatus status);

    @Query("SELECT l FROM LeaveRequest l WHERE l.employee.id = :empId AND l.status='APPROVED' AND l.fromDate >= :from AND l.toDate <= :to")
    List<LeaveRequest> findApprovedLeavesInRange(@Param("empId") Long empId,
                                                 @Param("from") LocalDate from,
                                                 @Param("to") LocalDate to);

    @Query("SELECT l from LeaveRequest l WHERE l.fromDate <= :date AND l.toDate >=:date AND l.status='APPROVED'")
    List<LeaveRequest> findApprovedLeavesOnDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee.id = :empId AND l.status='PENDING'")
    long countPendingLeavesByEmployee(@Param("empId") Long empId);
}