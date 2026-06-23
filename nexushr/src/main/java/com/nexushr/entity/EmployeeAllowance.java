package com.nexushr.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_allowances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeAllowance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String allowanceName;

    private Double amount;

    private Boolean taxable;

    @Enumerated(EnumType.STRING)
    private CalculationType calculationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}