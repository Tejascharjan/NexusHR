package com.nexushr.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceSummary {
    private int totalWorkingDays;

    private double payableDays;

    private int presentDays;

    private int absentDays;

    private int halfDays;

    private int paidLeaveDays;

    private int unpaidLeaveDays;

    private int holidayDays;

    private int weekendDays;
}
