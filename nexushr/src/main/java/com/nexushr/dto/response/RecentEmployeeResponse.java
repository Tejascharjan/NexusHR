package com.nexushr.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentEmployeeResponse {
    private Long employeeId;
    private String employeeName;
    private String department;
    private String designation;
    private LocalDate joiningDate;
}
