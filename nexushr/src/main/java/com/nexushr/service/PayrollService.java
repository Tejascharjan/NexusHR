package com.nexushr.service;

import com.nexushr.dto.request.PayrollFilterRequest;
import com.nexushr.dto.request.PayrollRequest;
import com.nexushr.dto.response.PayrollPageResponse;
import com.nexushr.dto.response.PayrollResponse;

import java.util.List;

public interface PayrollService {

    String generatePayroll(PayrollRequest request);

    List<PayrollResponse> getPayroll();

    PayrollPageResponse filterPayroll(PayrollFilterRequest request);

    String generateMonthPayroll(PayrollRequest request);

    byte[] generateSalarySlip(Long payrollId);

    byte[] generateRtgsExcel(Integer month, Integer year);

    PayrollPageResponse getEmployeePayrolls(PayrollFilterRequest request);

    PayrollResponse markAsPaid(Long payrollId);
}
