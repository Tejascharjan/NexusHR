package com.nexushr.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentChartResponse {

    private String departmentName;
    private Long employeeCount;
}
