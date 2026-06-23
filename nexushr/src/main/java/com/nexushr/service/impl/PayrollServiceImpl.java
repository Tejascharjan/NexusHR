package com.nexushr.service.impl;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.nexushr.dto.request.PayrollRequest;
import com.nexushr.dto.response.PayrollResponse;
import com.nexushr.entity.*;
import com.nexushr.repository.*;
import com.nexushr.service.PayrollService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;
    private final EmployeeCompensationRepository compensationRepository;
    private final EmployeeAllowanceRepository allowanceRepository;
    private final EmployeeDeductionRepository deductionRepository;

    @Override
    public String generatePayroll(PayrollRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId()).orElseThrow(() -> new RuntimeException("Employee not found"));
        if (payrollRepository.existsByEmployeeIdAndPayrollMonthAndPayrollYear(employee.getId(), request.getPayrollMonth(), request.getPayrollYear())) {
            throw new RuntimeException("Payroll already generated for this month");
        }
        calculatePayroll(request, employee);
        return "payroll generated successfully";
    }

    @Override
    public String generateMonthPayroll(PayrollRequest request) {
        List<Employee> employees = employeeRepository.findByStatus(EmployeeStatus.ACTIVE);
        for (Employee employee : employees) {
            boolean exists = payrollRepository.existsByEmployeeIdAndPayrollMonthAndPayrollYear(employee.getId(), request.getPayrollMonth(), request.getPayrollYear());
            if (!exists) {
                try {
                    calculatePayroll(request, employee);
                }catch (Exception e) {
                    log.error("Exception while calculating payroll for employee {}", employee.getId());
                }
            }
        }
        return "month payroll generated successfully";
    }

    @Override
    @Transactional
    public byte[] generateSalarySlip(Long payrollId) {
        Payroll payroll = payrollRepository.findById(payrollId).orElseThrow(() -> new RuntimeException("Payroll not found"));
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Document document = new Document();

            PdfWriter.getInstance(document, outputStream);
            document.open();
            document.add(new Paragraph("NexusHR Salary Slip"));
            document.add(new Paragraph(""));
            document.add(new Paragraph("Employee : " + payroll.getEmployee().getFirstName() + " " + payroll.getEmployee().getLastName()));
            document.add(new Paragraph("Month : " + payroll.getPayrollMonth() + " " + payroll.getPayrollYear()));
            document.add(new Paragraph(""));
            PdfPTable table = new PdfPTable(3);
            table.addCell("Item");
            table.addCell("Type");
            table.addCell("Amount");

            for(PayrollItem item : payroll.getPayrollItems()){
                table.addCell(item.getItemName());
                table.addCell(item.getItemType().name());
                table.addCell(String.valueOf(item.getAmount()));
            }
            document.add(table);
            document.add(new Paragraph(""));
            document.add(new Paragraph("Net Salary : " + payroll.getNetSalary()));

            document.close();
            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public byte[] generateRtgsExcel(Integer month, Integer year) {
        List<Payroll> payrolls = payrollRepository.findByPayrollMonthAndPayrollYear(month,year);
        try{
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Payrolls RTGS");

            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 16);
            titleFont.setFontName("Arial");

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            Font totalFont = workbook.createFont();
            totalFont.setBold(true);

            CellStyle titleStyle = workbook.createCellStyle();
            titleStyle.setFont(titleFont);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

            CellStyle amountStyle = workbook.createCellStyle();
            amountStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            CellStyle totalStyle = workbook.createCellStyle();
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("NEXUSHR - RTGS SALARY TRANSFER FILE");
            titleCell.setCellStyle(titleStyle);

            sheet.addMergedRegion(new CellRangeAddress(0,0,0,3));

            Row infoRow = sheet.createRow(2);
            infoRow.createCell(0).setCellValue("Salary Month");
            infoRow.createCell(1).setCellValue(month);
            infoRow.createCell(2).setCellValue("Salary Year");
            infoRow.createCell(3).setCellValue(year);

            Row header =  sheet.createRow(4);
            String[] columns = {"Employee Name","Account Number","IFSC Code","Net Salary"};

            for(int i = 0; i < columns.length; i++){
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 5;
            double totalAmount = 0;

            for(Payroll payroll: payrolls){
                Employee employee = payroll.getEmployee();
                EmployeeCompensation compensation = compensationRepository.findByEmployeeId(employee.getId()).orElseThrow(() -> new RuntimeException("Compensation not found"));

                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(employee.getFirstName()+" "+employee.getLastName());
                row.createCell(1).setCellValue(compensation.getAccountNumber());
                row.createCell(2).setCellValue(compensation.getIfscCode());
                Cell amountCell = row.createCell(3);
                amountCell.setCellValue(payroll.getNetSalary());
                amountCell.setCellStyle(amountStyle);
                totalAmount +=payroll.getNetSalary();
            }

            Row totalRow = sheet.createRow(rowNum+1);

            Cell labelCell = totalRow.createCell(2);
            labelCell.setCellValue("TOTAL");

            Cell totalCell = totalRow.createCell(3);
            totalCell.setCellValue(totalAmount);
            totalCell.setCellStyle(totalStyle);

            for(int i = 0; i < 4; i++){
                sheet.autoSizeColumn(i);
            }

            sheet.createFreezePane(0,5);
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            workbook.write(output);
            workbook.close();
            return output.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate rtgs file");
        }
    }

    private void calculatePayroll(PayrollRequest request, Employee employee) {
        EmployeeCompensation compensation = compensationRepository.findByEmployeeId(employee.getId()).orElseThrow(() -> new RuntimeException("Compensation not found"));

        /*
         * attendance implementation remaining
         */

        int totalWworkingDays = 30;
        int payableDays = 30;

        double ratio = (double) payableDays / totalWworkingDays;
        double basicSalary = compensation.getBasicSalary() * ratio;

        double totalAllowances = 0.0;
        double totalDeductions = 0.0;

        Payroll payroll = Payroll.builder()
                .employee(employee)
                .payrollMonth(request.getPayrollMonth())
                .payrollYear(request.getPayrollYear())
                .totalWorkingDays(totalWworkingDays)
                .payableDays(payableDays)
                .presentDays(payableDays)
                .absentDays(0)
                .leaveDays(0)
                .basicSalary(basicSalary)
                .processdDate(LocalDate.now())
                .status(PayrollStatus.PROCESSED)
                .build();

        /*
            Allowances
         */

        List<EmployeeAllowance> allowances = allowanceRepository.findByEmployeeId(employee.getId());
        List<EmployeeDeduction> deductions = deductionRepository.findByEmployeeId(employee.getId());

        for (EmployeeAllowance allowance : allowances) {
            double amount;
            if (allowance.getCalculationType() == CalculationType.PRO_RATED) {
                amount = allowance.getAmount() * ratio;
            } else {
                amount = allowance.getAmount();
            }

            totalAllowances += amount;

            PayrollItem item = PayrollItem.builder()
                    .itemName(allowance.getAllowanceName())
                    .amount(amount)
                    .itemType(PayrollItemType.ALLOWANCE)
                    .payroll(payroll)
                    .build();
            payroll.getPayrollItems().add(item);
        }

       /*
            Deductions
        */

        for (EmployeeDeduction deduction : deductions) {
            double amount;
            if (deduction.getCalculationType() == CalculationType.PRO_RATED) {
                amount = deduction.getAmount() * ratio;
            } else {
                amount = deduction.getAmount();
            }
            totalDeductions += amount;
            PayrollItem item = PayrollItem.builder()
                    .itemName(deduction.getDeductionName())
                    .amount(amount)
                    .itemType(PayrollItemType.DEDUCTION)
                    .payroll(payroll)
                    .build();
            payroll.getPayrollItems().add(item);
        }

        double grossSalary = basicSalary + totalAllowances;

        double netSalary = grossSalary - totalDeductions;

        payroll.setTotalAllowances(totalAllowances);
        payroll.setTotalDeductions(totalDeductions);
        payroll.setGrossSalary(grossSalary);
        payroll.setNetSalary(netSalary);
        payrollRepository.save(payroll);
    }

    @Override
    public List<PayrollResponse> getPayroll() {
        return payrollRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<PayrollResponse> getEmployeePayrolls(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PayrollResponse markAsPaid(Long payrollId) {
        Payroll payroll = payrollRepository.findById(payrollId).orElseThrow(() -> new RuntimeException("Payroll not found"));
        payroll.setStatus(PayrollStatus.PAID);
        payroll.setPaidDate(LocalDate.now());
        Payroll savedPayroll = payrollRepository.save(payroll);
        return mapToResponse(savedPayroll);
    }



    private PayrollResponse mapToResponse(Payroll payroll) {

        return PayrollResponse.builder()
                .payrollId(payroll.getId())
                .employeeId(payroll.getEmployee().getId())
                .employeeName(payroll.getEmployee().getFirstName() + " " + payroll.getEmployee().getLastName())
                .payrollMonth(payroll.getPayrollMonth())
                .payrollYear(payroll.getPayrollYear())
                .basicSalary(payroll.getBasicSalary())
                .grossSalary(payroll.getGrossSalary())
                .totalAllowances(payroll.getTotalAllowances())
                .totalDeductions(payroll.getTotalDeductions())
                .netSalary(payroll.getNetSalary())
                .status(payroll.getStatus())
                .build();
    }

}
