package com.nexushr.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceChartResponse {
    private String date;

    private Long present;

    private Long absent;

    private Long leaveCount;
}
