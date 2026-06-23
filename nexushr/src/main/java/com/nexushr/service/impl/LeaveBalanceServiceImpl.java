package com.nexushr.service.impl;

import com.nexushr.entity.LeaveBalance;
import com.nexushr.entity.LeaveType;
import com.nexushr.repository.LeaveBalanceRepository;
import com.nexushr.service.LeaveBalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeaveBalanceServiceImpl implements LeaveBalanceService {

    private final LeaveBalanceRepository leaveBalanceRepository;


    @Override
    public LeaveBalance createLeaveBalance(LeaveBalance leaveBalance) {
        leaveBalance.setRemaining(leaveBalance.getTotalAllotted());
        leaveBalance.setUsed(0);
        leaveBalance.setPending(0);
        return leaveBalanceRepository.save(leaveBalance);
    }

    @Override
    public LeaveBalance getLeaveBalanceById(Long id) {
        return leaveBalanceRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Leavebalance not found with id " + id));
    }

    @Override
    public List<LeaveBalance> getLeaveBalancesByEmployee(Long employeeId) {
        return leaveBalanceRepository.findByEmployeeId(employeeId);
    }

    @Override
    public List<LeaveBalance> getLeaveBalancesByEmployeeAndYear(Long employeeId, Integer year) {
        return leaveBalanceRepository.findByEmployeeIdAndYear(employeeId, year);
    }

    @Override
    public Optional<LeaveBalance> getLeaveBalance(Long employeeId, LeaveType leaveType, Integer year) {
        return leaveBalanceRepository.findByEmployeeIdAndLeaveTypeAndYear(employeeId, leaveType, year);
    }

    @Override
    public LeaveBalance deductLeave(Long employeeId, LeaveType leaveType, Integer year, Integer days) {
        LeaveBalance balance = leaveBalanceRepository
                .findByEmployeeIdAndLeaveTypeAndYear(employeeId,leaveType,year)
                .orElseThrow(()->new RuntimeException("Leavebalance not found with id " + employeeId));
        if(balance.getRemaining() < days){
            throw new RuntimeException("Insufficient leave balance, Available: "+balance.getRemaining());
        }
        balance.setUsed(balance.getUsed() + days);
        balance.setRemaining(balance.getRemaining() - days);
        return leaveBalanceRepository.save(balance);
    }

    @Override
    public LeaveBalance restoreLeave(Long employeeId, LeaveType leaveType, Integer year, Integer days) {
        LeaveBalance balance = leaveBalanceRepository
                .findByEmployeeIdAndLeaveTypeAndYear(employeeId, leaveType, year)
                .orElseThrow(()->new RuntimeException("Leavebalance not found with id " + employeeId));
        balance.setUsed(Math.max(0, balance.getUsed() - days));
        balance.setRemaining(balance.getRemaining() + days);
        return leaveBalanceRepository.save(balance);
    }

    @Override
    public LeaveBalance updateLeaveBalance(Long id, LeaveBalance leaveBalance) {
        LeaveBalance existing =  getLeaveBalanceById(id);
        existing.setTotalAllotted(leaveBalance.getTotalAllotted());
        existing.setUsed(leaveBalance.getUsed());
        existing.setPending(leaveBalance.getPending());
        existing.setRemaining(leaveBalance.getRemaining());
        return leaveBalanceRepository.save(existing);
    }

    @Override
    public void deleteLeaveBalance(Long id) {
        if(!leaveBalanceRepository.existsById(id)){
            throw new RuntimeException("Leavebalance not found with id " + id);
        }
        leaveBalanceRepository.deleteById(id);
    }
}
