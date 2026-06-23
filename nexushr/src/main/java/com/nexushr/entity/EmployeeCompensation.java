package com.nexushr.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_compensation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeCompensation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double basicSalary;

    private Double ctc;

    private String bankName;

    private String accountNumber;

    private String ifscCode;

    private String panNumber;

    private String uanNumber;

    private String pfNumber;

    private String esiNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", unique = true)
    private Employee employee;
}