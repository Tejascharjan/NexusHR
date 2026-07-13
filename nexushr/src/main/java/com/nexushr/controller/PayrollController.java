package com.nexushr.controller;

import com.nexushr.dto.request.PayrollFilterRequest;
import com.nexushr.dto.request.PayrollRequest;
import com.nexushr.dto.response.PayrollPageResponse;
import com.nexushr.dto.response.PayrollResponse;
import com.nexushr.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payrolls")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/generate")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> generatePayroll(@RequestBody PayrollRequest request) {
        return ResponseEntity.ok(payrollService.generateMonthPayroll(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER')")
    public ResponseEntity<List<PayrollResponse>> getPayroll() {
        return ResponseEntity.ok(payrollService.getPayroll());
    }

    @PutMapping("/{id}/paid")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PayrollResponse> markAsPaid(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.markAsPaid(id));
    }

    @PostMapping("filter")
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER')")
    public ResponseEntity<PayrollPageResponse> filterPayroll(@RequestBody PayrollFilterRequest request) {
        return ResponseEntity.ok(payrollService.filterPayroll(request));
    }

    @GetMapping("/{payrollId}/salary-slip")
    public ResponseEntity<byte[]> downloadSalarySlip(@PathVariable Long payrollId) {
        byte[] pdf = payrollService.generateSalarySlip(payrollId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=salary-slip.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/export-rtgs")
    public ResponseEntity<byte[]> exportRtgs(@RequestParam Integer month,
                                             @RequestParam Integer year) {
        System.out.println("month: " + month + ", year: " + year);
        byte[] excel = payrollService.generateRtgsExcel(month, year);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment;filename=RTGS.xlsx").contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excel);
    }

    @PostMapping("/employee")
    public ResponseEntity<PayrollPageResponse> getEmployeePayrolls(@RequestBody PayrollFilterRequest request) {
        return ResponseEntity.ok(payrollService.getEmployeePayrolls(request));
    }
}
