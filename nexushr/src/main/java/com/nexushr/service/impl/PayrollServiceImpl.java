package com.nexushr.service.impl;

import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.nexushr.dto.request.PayrollFilterRequest;
import com.nexushr.dto.request.PayrollRequest;
import com.nexushr.dto.response.PayrollPageResponse;
import com.nexushr.dto.response.PayrollResponse;
import com.nexushr.dto.response.PayrollStatisticsResponse;
import com.nexushr.entity.*;
import com.nexushr.repository.*;
import com.nexushr.service.PayrollService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

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
                } catch (Exception e) {
                    log.error("Exception while calculating payroll for employee {}", employee.getId());
                }
            }
        }
        return "month payroll generated successfully";
    }

    @Override
    public byte[] generateSalarySlip(Long payrollId) {
        Payroll payroll = payrollRepository.findById(payrollId).orElseThrow(() -> new RuntimeException("Payroll not found"));
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4,25,25,25,25);
            PdfWriter.getInstance(document,outputStream);
            document.open();

            BaseColor PRIMARY = new BaseColor(249,115,22);
            BaseColor LIGHT_ORANGE = new BaseColor(255,245,238);
            BaseColor HEADER_BG = new BaseColor(245,245,245);
            BaseColor BORDER = new BaseColor(220,220,220);
            BaseColor WHITE = BaseColor.WHITE;

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,20,WHITE);
            Font headingFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,13,PRIMARY);
            Font labelFont =FontFactory.getFont(FontFactory.HELVETICA_BOLD,10);
            Font valueFont =FontFactory.getFont(FontFactory.HELVETICA,10);
            Font tableHeaderFont =FontFactory.getFont(FontFactory.HELVETICA_BOLD,10,WHITE);
            Font totalFont =FontFactory.getFont(FontFactory.HELVETICA_BOLD,12,PRIMARY);
            Font footerFont =FontFactory.getFont(FontFactory.HELVETICA,9,BaseColor.GRAY);

            PdfPTable companyTable = new PdfPTable(1);
            companyTable.setWidthPercentage(100);
            PdfPCell companyCell = new PdfPCell();
            companyCell.setBackgroundColor(PRIMARY);
            companyCell.setBorder(Rectangle.NO_BORDER);
            companyCell.setPadding(15);
            Paragraph companyName =new Paragraph("NEXUSHR", titleFont);
            companyName.setAlignment(Element.ALIGN_CENTER);

            Paragraph salarySlip =new Paragraph("Salary Slip",FontFactory.getFont(FontFactory.HELVETICA_BOLD,12,WHITE));
            salarySlip.setAlignment(Element.ALIGN_CENTER);
            companyCell.addElement(companyName);
            companyCell.addElement(salarySlip);
            companyTable.addCell(companyCell);
            document.add(companyTable);
            document.add(new Paragraph(" "));

            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            infoTable.setSpacingAfter(15);
            infoTable.setWidths(new float[]{1,1});

            PdfPCell employeeCell = new PdfPCell();
            employeeCell.setBorder(Rectangle.NO_BORDER);
            employeeCell.addElement(new Phrase("Employee Name",labelFont));
            employeeCell.addElement(new Phrase(payroll.getEmployee().getFirstName()+" "+payroll.getEmployee().getLastName(),valueFont));
            infoTable.addCell(employeeCell);

            PdfPCell designationCell = new PdfPCell();
            designationCell.setBorder(Rectangle.NO_BORDER);
            designationCell.addElement(new Phrase("Designation",labelFont));
            designationCell.addElement(new Phrase(payroll.getEmployee().getDesignation(),valueFont));
            infoTable.addCell(designationCell);

            PdfPCell departmentCell = new PdfPCell();
            departmentCell.setBorder(Rectangle.NO_BORDER);
            departmentCell.addElement(new Phrase("Department",labelFont));
            departmentCell.addElement(new Phrase(payroll.getEmployee().getDepartment().getName() ,valueFont));
            infoTable.addCell(departmentCell);

            PdfPCell employeeIdCell = new PdfPCell();
            employeeIdCell.setBorder(Rectangle.NO_BORDER);
            employeeIdCell.addElement(new Phrase("Employee ID",labelFont));
            employeeIdCell.addElement(new Phrase(String.valueOf(payroll.getEmployee().getId()),valueFont));
            infoTable.addCell(employeeIdCell);

            String month = Month.of(payroll.getPayrollMonth()).getDisplayName(TextStyle.FULL,Locale.ENGLISH);
            PdfPCell monthCell = new PdfPCell();
            monthCell.setBorder(Rectangle.NO_BORDER);
            monthCell.addElement(new Phrase("Payroll Month",labelFont));
            monthCell.addElement(new Phrase(month+" "+payroll.getPayrollYear(),valueFont));
            infoTable.addCell(monthCell);

            PdfPCell dateCell = new PdfPCell();
            dateCell.setBorder(Rectangle.NO_BORDER);
            dateCell.addElement(new Phrase("Generated On",labelFont));
            dateCell.addElement(new Phrase(LocalDate.now().toString(),valueFont));
            infoTable.addCell(dateCell);

            document.add(infoTable);

            PdfPTable divider = new PdfPTable(1);

            divider.setWidthPercentage(100);

            PdfPCell dividerCell = new PdfPCell();

            dividerCell.setFixedHeight(2);

            dividerCell.setBackgroundColor(BORDER);

            dividerCell.setBorder(Rectangle.NO_BORDER);

            divider.addCell(dividerCell);

            document.add(divider);

            document.add(new Paragraph(" "));

            List<PayrollItem> allowances = payroll.getPayrollItems()
                    .stream()
                    .filter(item -> item.getItemType() == PayrollItemType.ALLOWANCE)
                    .toList();

            List<PayrollItem> deductions = payroll.getPayrollItems()
                    .stream()
                    .filter(item -> item.getItemType() == PayrollItemType.DEDUCTION)
                    .toList();

            PdfPTable salaryTable = new PdfPTable(4);

            salaryTable.setWidthPercentage(100);

            salaryTable.setSpacingBefore(10);

            salaryTable.setWidths(new float[]{3,2,3,2});

            PdfPCell earningsHeader = new PdfPCell(new Phrase("EARNINGS", tableHeaderFont));
            earningsHeader.setBackgroundColor(PRIMARY);
            earningsHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            earningsHeader.setPadding(8);

            PdfPCell earningsAmountHeader = new PdfPCell(new Phrase("AMOUNT", tableHeaderFont));
            earningsAmountHeader.setBackgroundColor(PRIMARY);
            earningsAmountHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            earningsAmountHeader.setPadding(8);

            PdfPCell deductionHeader = new PdfPCell(new Phrase("DEDUCTIONS", tableHeaderFont));
            deductionHeader.setBackgroundColor(PRIMARY);
            deductionHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            deductionHeader.setPadding(8);

            PdfPCell deductionAmountHeader = new PdfPCell(new Phrase("AMOUNT", tableHeaderFont));
            deductionAmountHeader.setBackgroundColor(PRIMARY);
            deductionAmountHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            deductionAmountHeader.setPadding(8);

            salaryTable.addCell(earningsHeader);
            salaryTable.addCell(earningsAmountHeader);
            salaryTable.addCell(deductionHeader);
            salaryTable.addCell(deductionAmountHeader);

            int maxRows = Math.max(
                    allowances.size(),
                    deductions.size()
            );

            BaseColor alternate = new BaseColor(248,248,248);

            for(int i=0;i<maxRows;i++){

                BaseColor rowColor =
                        (i%2==0)?BaseColor.WHITE:alternate;

                // Earnings Name

                if(i<allowances.size()){

                    PayrollItem item = allowances.get(i);

                    PdfPCell cell =
                            new PdfPCell(new Phrase(item.getItemName(),valueFont));

                    cell.setBackgroundColor(rowColor);

                    cell.setPadding(6);

                    salaryTable.addCell(cell);

                    PdfPCell amount =
                            new PdfPCell(new Phrase(
                                    String.format("₹ %,.2f",item.getAmount()),
                                    valueFont));

                    amount.setHorizontalAlignment(Element.ALIGN_RIGHT);

                    amount.setBackgroundColor(rowColor);

                    amount.setPadding(6);

                    salaryTable.addCell(amount);

                }else{

                    PdfPCell empty=new PdfPCell(new Phrase(""));

                    empty.setBackgroundColor(rowColor);

                    empty.setPadding(6);

                    salaryTable.addCell(empty);

                    PdfPCell emptyAmount=new PdfPCell(new Phrase(""));

                    emptyAmount.setBackgroundColor(rowColor);

                    emptyAmount.setPadding(6);

                    salaryTable.addCell(emptyAmount);

                }

                // Deduction

                if(i<deductions.size()){

                    PayrollItem item=deductions.get(i);

                    PdfPCell cell=
                            new PdfPCell(new Phrase(item.getItemName(),valueFont));

                    cell.setBackgroundColor(rowColor);

                    cell.setPadding(6);

                    salaryTable.addCell(cell);

                    PdfPCell amount=
                            new PdfPCell(new Phrase(
                                    String.format("₹ %,.2f",item.getAmount()),
                                    valueFont));

                    amount.setHorizontalAlignment(Element.ALIGN_RIGHT);

                    amount.setBackgroundColor(rowColor);

                    amount.setPadding(6);

                    salaryTable.addCell(amount);

                }else{

                    PdfPCell empty=new PdfPCell(new Phrase(""));

                    empty.setBackgroundColor(rowColor);

                    empty.setPadding(6);

                    salaryTable.addCell(empty);

                    PdfPCell emptyAmount=new PdfPCell(new Phrase(""));

                    emptyAmount.setBackgroundColor(rowColor);

                    emptyAmount.setPadding(6);

                    salaryTable.addCell(emptyAmount);

                }
                PdfPCell grossLabel=new PdfPCell(new Phrase("Gross Salary",labelFont));

                grossLabel.setBackgroundColor(HEADER_BG);

                grossLabel.setPadding(8);

                salaryTable.addCell(grossLabel);

                PdfPCell grossValue=new PdfPCell(new Phrase(
                        String.format("₹ %,.2f",payroll.getGrossSalary()),
                        labelFont));

                grossValue.setHorizontalAlignment(Element.ALIGN_RIGHT);

                grossValue.setBackgroundColor(HEADER_BG);

                grossValue.setPadding(8);

                salaryTable.addCell(grossValue);

                PdfPCell deductionLabel=new PdfPCell(new Phrase("Total Deduction",labelFont));

                deductionLabel.setBackgroundColor(HEADER_BG);

                deductionLabel.setPadding(8);

                salaryTable.addCell(deductionLabel);

                PdfPCell deductionValue=new PdfPCell(new Phrase(
                        String.format("₹ %,.2f",payroll.getTotalDeductions()),
                        labelFont));

                deductionValue.setHorizontalAlignment(Element.ALIGN_RIGHT);

                deductionValue.setBackgroundColor(HEADER_BG);

                deductionValue.setPadding(8);

                salaryTable.addCell(deductionValue);

                document.add(salaryTable);

                document.add(new Paragraph(" "));

                PdfPTable summaryTable = new PdfPTable(2);
                summaryTable.setWidthPercentage(100);
                summaryTable.setSpacingBefore(15);
                summaryTable.setWidths(new float[]{3,2});

                PdfPCell allowanceLabel = new PdfPCell(new Phrase("Total Allowances", labelFont));
                allowanceLabel.setBackgroundColor(HEADER_BG);
                allowanceLabel.setPadding(8);
                allowanceLabel.setBorderColor(BORDER);

                PdfPCell allowanceValue = new PdfPCell(
                        new Phrase(
                                String.format("₹ %,.2f", payroll.getTotalAllowances()),
                                labelFont));

                allowanceValue.setHorizontalAlignment(Element.ALIGN_RIGHT);
                allowanceValue.setBackgroundColor(HEADER_BG);
                allowanceValue.setPadding(8);
                allowanceValue.setBorderColor(BORDER);

                summaryTable.addCell(allowanceLabel);
                summaryTable.addCell(allowanceValue);

                document.add(summaryTable);

                document.add(new Paragraph(" "));

                PdfPTable netSalaryTable = new PdfPTable(1);
                netSalaryTable.setWidthPercentage(100);

                PdfPCell netCell = new PdfPCell();

                netCell.setBackgroundColor(PRIMARY);

                netCell.setPadding(12);

                netCell.setHorizontalAlignment(Element.ALIGN_CENTER);

                netCell.setBorder(Rectangle.NO_BORDER);

                Font netTitle =
                        FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                12,
                                BaseColor.WHITE);

                Font netAmount =
                        FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                18,
                                BaseColor.WHITE);

                Paragraph title =
                        new Paragraph("NET SALARY", netTitle);

                title.setAlignment(Element.ALIGN_CENTER);

                Paragraph amount =
                        new Paragraph(
                                String.format("₹ %,.2f", payroll.getNetSalary()),
                                netAmount);

                amount.setAlignment(Element.ALIGN_CENTER);

                netCell.addElement(title);
                netCell.addElement(amount);

                netSalaryTable.addCell(netCell);

                document.add(netSalaryTable);

                document.add(new Paragraph(" "));

                PdfPTable statusTable = new PdfPTable(2);

                statusTable.setWidthPercentage(100);

                statusTable.setWidths(new float[]{1,1});

                PdfPCell statusLabel = new PdfPCell(new Phrase("Payment Status", labelFont));
                statusLabel.setBorder(Rectangle.NO_BORDER);

                PdfPCell statusValue = new PdfPCell(
                        new Phrase(
                                payroll.getStatus().name(),
                                headingFont));

                statusValue.setBorder(Rectangle.NO_BORDER);
                statusValue.setHorizontalAlignment(Element.ALIGN_RIGHT);

                statusTable.addCell(statusLabel);
                statusTable.addCell(statusValue);

                document.add(statusTable);

                document.add(new Paragraph(" "));

                PdfPTable line = new PdfPTable(1);

                line.setWidthPercentage(100);

                PdfPCell lineCell = new PdfPCell();

                lineCell.setFixedHeight(2);

                lineCell.setBackgroundColor(BORDER);

                lineCell.setBorder(Rectangle.NO_BORDER);

                line.addCell(lineCell);

                document.add(line);

                document.add(new Paragraph(" "));

                Paragraph footer = new Paragraph(
                        "This is a computer generated salary slip.\n"
                                + "No signature is required.",
                        footerFont);

                footer.setAlignment(Element.ALIGN_CENTER);

                document.add(footer);

                document.add(new Paragraph(" "));

                Paragraph powered = new Paragraph(
                        "Powered by NexusHR",
                        FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                10,
                                PRIMARY));

                powered.setAlignment(Element.ALIGN_CENTER);

                document.add(powered);

                document.close();

                return outputStream.toByteArray();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate salary slip",e);
        }
        return new byte[0];
    }


    @Override
    public byte[] generateRtgsExcel(Integer month, Integer year) {
        List<Payroll> payrolls = payrollRepository.findByPayrollMonthAndPayrollYear(month, year);
        try {
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("RTGS");

            org.apache.poi.ss.usermodel.Font titleFont = workbook.createFont();
            ((org.apache.poi.ss.usermodel.Font) titleFont).setFontName("Calibri");
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 18);

            org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
            headerFont.setFontName("Calibri");
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            org.apache.poi.ss.usermodel.Font normalFont = workbook.createFont();
            normalFont.setFontName("Calibri");
            normalFont.setFontHeightInPoints((short) 11);

            org.apache.poi.ss.usermodel.Font totalFont = workbook.createFont();
            totalFont.setFontName("Calibri");
            totalFont.setBold(true);
            totalFont.setFontHeightInPoints((short) 11);

            CellStyle titleStyle = workbook.createCellStyle();
            titleStyle.setFont(titleFont);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            CellStyle infoStyle = workbook.createCellStyle();
            infoStyle.setFont(normalFont);
            infoStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            infoStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            infoStyle.setAlignment(HorizontalAlignment.CENTER);

            infoStyle.setBorderBottom(BorderStyle.THIN);
            infoStyle.setBorderTop(BorderStyle.THIN);
            infoStyle.setBorderLeft(BorderStyle.THIN);
            infoStyle.setBorderRight(BorderStyle.THIN);

            CellStyle rowStyle = workbook.createCellStyle();
            rowStyle.setFont(normalFont);

            rowStyle.setBorderBottom(BorderStyle.THIN);
            rowStyle.setBorderTop(BorderStyle.THIN);
            rowStyle.setBorderLeft(BorderStyle.THIN);
            rowStyle.setBorderRight(BorderStyle.THIN);

            CellStyle alternateRowStyle = workbook.createCellStyle();
            alternateRowStyle.cloneStyleFrom(rowStyle);
            alternateRowStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            alternateRowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle amountStyle = workbook.createCellStyle();
            amountStyle.cloneStyleFrom(rowStyle);
            amountStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            CellStyle alternateAmountStyle = workbook.createCellStyle();
            alternateAmountStyle.cloneStyleFrom(alternateRowStyle);
            alternateAmountStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            CellStyle totalStyle = workbook.createCellStyle();
            totalStyle.setFont(totalFont);
            totalStyle.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
            totalStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            totalStyle.setAlignment(HorizontalAlignment.RIGHT);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            totalStyle.setBorderBottom(BorderStyle.THIN);
            totalStyle.setBorderTop(BorderStyle.THIN);
            totalStyle.setBorderLeft(BorderStyle.THIN);
            totalStyle.setBorderRight(BorderStyle.THIN);

            CellStyle totalLabelStyle = workbook.createCellStyle();
            totalLabelStyle.cloneStyleFrom(totalStyle);
            totalLabelStyle.setAlignment(HorizontalAlignment.CENTER);

            Row titleRow = sheet.createRow(0);

            Cell title = titleRow.createCell(0);
            title.setCellValue("NEXUSHR SALARY RTGS");
            title.setCellStyle(titleStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));

            String monthName = Month.of(month).getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            String salaryMonth = "Month : "+monthName+" "+year;

            String generatedOn = "Generated on : "+LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

            Row infoRow = sheet.createRow(2);

            Cell monthCell = infoRow.createCell(0);
            monthCell.setCellValue(salaryMonth);
            monthCell.setCellStyle(infoStyle);
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 1));

            Cell generatedCell = infoRow.createCell(2);
            generatedCell.setCellValue(generatedOn);
            generatedCell.setCellStyle(infoStyle);
            Row header = sheet.createRow(4);
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 3));
            for (int i = 1; i <= 3; i++) {
                Cell cell = infoRow.getCell(i);
                if (cell == null) {
                    cell = infoRow.createCell(i);
                }
                cell.setCellStyle(infoStyle);
            }

            String[] columns = {
                    "Employee Name",
                    "IFSC Code",
                    "Account Number",
                    "Net Salary"
            };

            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 5;
            double totalAmount = 0;
            boolean alternate = false;

            for (Payroll payroll : payrolls) {
                Employee employee = payroll.getEmployee();
                EmployeeCompensation compensation = compensationRepository.findByEmployeeId(employee.getId()).orElseThrow(() -> new RuntimeException("Compensation not found"));

                Row row = sheet.createRow(rowNum++);
                CellStyle style = alternate ? alternateRowStyle : rowStyle;
                CellStyle salaryStyle = alternate ? alternateAmountStyle : amountStyle;

                Cell employeeCell = row.createCell(0);
                employeeCell.setCellValue(employee.getFirstName() + " " + employee.getLastName());
                employeeCell.setCellStyle(style);

                Cell ifscCell = row.createCell(1);
                ifscCell.setCellValue(compensation.getIfscCode());
                ifscCell.setCellStyle(style);

                Cell accountCell = row.createCell(2);
                accountCell.setCellValue(compensation.getAccountNumber());
                accountCell.setCellStyle(style);

                Cell salaryCell = row.createCell(3);
                salaryCell.setCellValue(payroll.getNetSalary());
                salaryCell.setCellStyle(salaryStyle);

                totalAmount += payroll.getNetSalary();

                alternate = !alternate;
            }

            Row totalRow = sheet.createRow(rowNum + 1);

            Cell totalLabel = totalRow.createCell(2);
            totalLabel.setCellValue("TOTAL");
            totalLabel.setCellStyle(totalLabelStyle);

            Cell totalCell = totalRow.createCell(3);
            totalCell.setCellValue(totalAmount);
            totalCell.setCellStyle(totalStyle);

            for (int i = 0; i < 4; i++) {
                sheet.autoSizeColumn(i);
            }

            sheet.createFreezePane(0, 5);
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
    public PayrollPageResponse filterPayroll(PayrollFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize(), Sort.by("employee.firstName"));

        Page<Payroll> payrollPage = payrollRepository.filterPayroll(request.getPayrollMonth(), request.getPayrollYear(), request.getDepartmentId(), request.getStatus(), pageable);

        PayrollStatisticsResponse statistics = payrollRepository.getStatistics(request.getPayrollMonth(), request.getPayrollYear());

        return PayrollPageResponse.builder()
                .payrolls(payrollPage.stream().map(this::mapToResponse).toList())
                .statistics(statistics)
                .page(payrollPage.getTotalPages())
                .size(payrollPage.getSize())
                .totalPages(payrollPage.getTotalPages())
                .totalElements(payrollPage.getTotalElements())
                .build();
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
