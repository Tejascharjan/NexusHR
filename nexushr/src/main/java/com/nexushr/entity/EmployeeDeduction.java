package com.nexushr.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_deductions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDeduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deductionName;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private CalculationType calculationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}