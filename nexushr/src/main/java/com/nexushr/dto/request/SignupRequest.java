package com.nexushr.dto.request;

import com.nexushr.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

    private String name;
    private String email;
    private String password;
    private Role role;
}