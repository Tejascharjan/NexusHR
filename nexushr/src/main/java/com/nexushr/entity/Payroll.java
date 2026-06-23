package com.nexushr.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "payrolls", uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"employee_id", "payroll_month", "payroll_year"}
        )
})
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer payrollMonth;
    private Integer payrollYear;

    private Integer totalWorkingDays;
    private Integer payableDays;

    private Integer presentDays;
    private Integer absentDays;
    private Integer leaveDays;

    private Double basicSalary;
    private Double grossSalary;
    private Double totalAllowances;
    private Double totalDeductions;
    private Double netSalary;

    private LocalDate processdDate;
    private LocalDate paidDate;

    @Enumerated(EnumType.STRING)
    private PayrollStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Builder.Default
    @OneToMany(mappedBy = "payroll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PayrollItem> payrollItems = new ArrayList<>();
}
