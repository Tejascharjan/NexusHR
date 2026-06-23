package com.nexushr.service;

import com.nexushr.entity.LeaveBalance;
import com.nexushr.entity.LeaveType;

import java.util.List;
import java.util.Optional;

public interface LeaveBalanceService {
    LeaveBalance createLeaveBalance(LeaveBalance leaveBalance);

    LeaveBalance getLeaveBalanceById(Long id);

    List<LeaveBalance> getLeaveBalancesByEmployee(Long employeeId);

    List<LeaveBalance> getLeaveBalancesByEmployeeAndYear(Long employeeId, Integer year);

    Optional<LeaveBalance> getLeaveBalance(Long employeeId, LeaveType leaveType, Integer year);

    LeaveBalance deductLeave(Long employeeId, LeaveType leaveType, Integer year, Integer days);

    LeaveBalance restoreLeave(Long employeeId, LeaveType leaveType, Integer year, Integer days);

    LeaveBalance updateLeaveBalance(Long id, LeaveBalance leaveBalance);

    void deleteLeaveBalance(Long id);
}
