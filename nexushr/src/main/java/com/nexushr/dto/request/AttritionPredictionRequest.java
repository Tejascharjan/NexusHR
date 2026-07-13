package com.nexushr.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AttritionPredictionRequest {

    private Long employeeId;

    private String department;

    private String designation;

    private Integer tenureMonths;

    private Double attendancePercentage;

    private Integer absentDays;

    private Integer leaveCount;

    private Double performanceRating;

    private Double engagementScore;
}
