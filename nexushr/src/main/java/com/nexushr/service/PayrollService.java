package com.nexushr.service;

import com.nexushr.dto.request.PayrollRequest;
import com.nexushr.dto.response.PayrollResponse;

import java.util.List;

public interface PayrollService {

    String generatePayroll(PayrollRequest request);

    List<PayrollResponse> getPayroll();

    String generateMonthPayroll(PayrollRequest request);

    byte[] generateSalarySlip(Long payrollId);

    byte[] generateRtgsExcel(Integer month, Integer year);

    List<PayrollResponse> getEmployeePayrolls(Long employeeId);

    PayrollResponse markAsPaid(Long payrollId);
}
