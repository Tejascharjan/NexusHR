package com.nexushr.dto.request;

import com.nexushr.entity.Attendancestatus;
import com.nexushr.entity.Employee;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data

public class AttendanceRequest {
    private Long employeeId;
    private LocalDate date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private Attendancestatus status;
    private Boolean biometricVerified;
    private Double workedHours;
}
