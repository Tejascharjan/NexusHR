package com.nexushr.service.impl;

import com.nexushr.dto.request.AttendanceRequest;
import com.nexushr.dto.response.AttendanceResponse;
import com.nexushr.dto.response.EmployeeDetailsResponse;
import com.nexushr.entity.Attendance;
import com.nexushr.entity.Attendancestatus;
import com.nexushr.entity.Employee;
import com.nexushr.repository.AttendanceRepository;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public AttendanceResponse markAttendance(AttendanceRequest attendance) {
        attendanceRepository.findByEmployeeIdAndDate(attendance.getEmployeeId(), attendance.getDate())
                .ifPresent(a -> {
                    throw new RuntimeException("Attendance already marked for this date.");
                });

        if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
            long minutes = ChronoUnit.MINUTES.between(attendance.getCheckIn(), attendance.getCheckOut());
            attendance.setWorkedHours(minutes / 60.0);
        }
        Employee employee = employeeRepository.findById(attendance.getEmployeeId()).orElseThrow(() -> new RuntimeException("Employee not found."));
        Attendance markAttendance = new Attendance();
        markAttendance.setEmployee(employee);
        markAttendance.setDate(attendance.getDate());
        markAttendance.setCheckIn(attendance.getCheckIn());
        markAttendance.setCheckOut(attendance.getCheckOut());
        markAttendance.setStatus(attendance.getStatus());
        markAttendance.setBiometricVerified(attendance.getBiometricVerified());
        markAttendance.setWorkedHours(attendance.getWorkedHours());
        Attendance attendance1 = attendanceRepository.save(markAttendance);
        return mapToAttendanceResponse(attendance1);
    }

    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found with id : " + id));
    }

    @Override
    public Attendance getAttendanceByEmployeeAndDate(Long employeeId, LocalDate date) {
        return attendanceRepository.findByEmployeeIdAndDate(employeeId, date)
                .orElseThrow(() -> new RuntimeException("Attendance not found employee : " + employeeId + " on " + date));
    }

    @Override
    public List<Attendance> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    @Override
    public List<Attendance> getAttendanceByEmployeeAndDateRange(Long employeeId, LocalDate from, LocalDate to) {
        return attendanceRepository.findByEmployeeIdAndDateBetween(employeeId, from, to);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {

        return attendanceRepository.findByDate(date).stream()
                .map(this::mapToAttendanceResponse)
                .toList();
    }

    @Override
    public List<Attendance> getAttendanceByDepartmentAndDate(Long departmentId, LocalDate date) {
        return attendanceRepository.findByDepartmentAndDate(departmentId, date);
    }

    @Override
    public Attendance checkIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("Employee not found"));
        attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now()).ifPresent(a -> {
            throw new RuntimeException("Attendance checked in today.");
        });
        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(LocalDate.now());
        attendance.setCheckIn(LocalTime.now());
        attendance.setStatus(Attendancestatus.PRESENT);
        attendance.setBiometricVerified(true);
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance checkOut(Long employeeId) {
        Attendance attendance = getAttendanceByEmployeeAndDate(employeeId, LocalDate.now());
        attendance.setCheckOut(LocalTime.now());
        if (attendance.getCheckIn() != null) {
            double hours = ChronoUnit.MINUTES.between(attendance.getCheckIn(), attendance.getCheckOut()) / 60.0;
            attendance.setWorkedHours(hours);
            if (hours < 4.0) attendance.setStatus(Attendancestatus.HALF_DAY);
        }
        return attendanceRepository.save(attendance);
    }

    @Override
    public long countPresentDays(Long employeeId, LocalDate from, LocalDate to) {
        return attendanceRepository.countPresentDays(employeeId, from, to);
    }

    @Override
    public List<Attendance> getUnverifiedBiometricByDate(LocalDate date) {
        return attendanceRepository.findUnverifiedBiometricByDate(date);
    }

    @Override
    public Attendance updateAttendance(Long id, Attendance attendance) {
        Attendance existing = getAttendanceById(id);
        existing.setStatus(attendance.getStatus());
        existing.setCheckIn(attendance.getCheckIn());
        existing.setCheckOut(attendance.getCheckOut());
        existing.setWorkedHours(attendance.getWorkedHours());
        existing.setBiometricVerified(attendance.getBiometricVerified());
        return attendanceRepository.save(existing);
    }

    @Override
    public void deleteAttendance(Long id) {
        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException("Attendance not found with id : " + id);
        }
        attendanceRepository.deleteById(id);
    }

    private AttendanceResponse mapToAttendanceResponse(Attendance attendance) {
        Employee employee = attendance.getEmployee();
        EmployeeDetailsResponse response = new EmployeeDetailsResponse();
        response.setId(employee.getId());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setEmail(employee.getEmail());
        response.setPhone(employee.getPhone());
        response.setStatus(employee.getStatus());
        response.setJoiningDate(employee.getJoiningDate());
        response.setOffboardingDate(employee.getOffboardingDate());
        response.setDepartmentId(employee.getDepartment().getId());
        response.setDepartmentName(employee.getDepartment().getName());
        response.setRole(employee.getRole());

        return new AttendanceResponse(
                attendance.getId(),
                response,
                attendance.getDate(),
                attendance.getCheckIn(),
                attendance.getCheckOut(),
                attendance.getStatus(),
                attendance.getBiometricVerified(),
                attendance.getWorkedHours()
        );
    }
}
