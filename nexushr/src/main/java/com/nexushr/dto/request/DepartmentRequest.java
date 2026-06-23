package com.nexushr.dto.request;

import lombok.Data;

@Data
public class DepartmentRequest {
    private String name;
    private String description;
    private Long managerId;
    private Boolean isActive;
}
