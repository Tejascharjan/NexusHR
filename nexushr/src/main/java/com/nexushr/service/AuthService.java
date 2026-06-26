package com.nexushr.service;

import com.nexushr.dto.response.AuthResponse;
import com.nexushr.dto.request.LoginRequest;
import com.nexushr.dto.request.SignupRequest;
import com.nexushr.dto.response.EmployeeDetailsResponse;
import com.nexushr.dto.response.EmployeeProfileResponse;
import com.nexushr.entity.Employee;
import com.nexushr.entity.User;
import com.nexushr.repository.UserRepository;
import com.nexushr.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse signup(SignupRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

    public AuthResponse getCurrentUser(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponse.builder()
                .user(user)
                .build();
    }

    public EmployeeProfileResponse getEmployeeProfile(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Employee employee = user.getEmployee();
        EmployeeDetailsResponse empDetails = new EmployeeDetailsResponse();
        empDetails.setId(employee.getId());
        empDetails.setEmployeeCode("dummy");
        empDetails.setFirstName(employee.getFirstName());
        empDetails.setLastName(employee.getLastName());
        empDetails.setEmail(employee.getEmail());
        empDetails.setPhone(employee.getPhone());
        empDetails.setGender(employee.getGender());
        empDetails.setDateOfBirth(employee.getDateOfBirth());
        empDetails.setEmergencyContactName(employee.getEmergencyContactName());
        empDetails.setEmergencyContactNumber(employee.getEmergencyContactNumber());
        empDetails.setDesignation(employee.getDesignation());
        empDetails.setStatus(employee.getStatus());
        empDetails.setEmploymentType(employee.getEmploymentType());
        empDetails.setRole(employee.getRole());
        empDetails.setJoiningDate(employee.getJoiningDate());
        empDetails.setProbationEndDate(employee.getProbationEndDate());
        empDetails.setConfirmationDate(employee.getConfirmationDate());
        empDetails.setOffboardingDate(employee.getOffboardingDate());
        empDetails.setDepartmentId(employee.getDepartment().getId());
        empDetails.setDepartmentName(employee.getDepartment().getName());
        return EmployeeProfileResponse.builder()
                .employee(empDetails)
                .build();
    }
}