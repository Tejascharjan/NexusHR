package com.nexushr.dto.response;

import com.nexushr.entity.Attendancestatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {
    private Long id;
    private EmployeeDetailsResponse employee;
    private LocalDate date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private Attendancestatus status;
    private Boolean biometricVerified;
    private Double workedHours;
}
