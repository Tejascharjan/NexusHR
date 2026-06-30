package com.nexushr.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityResponse {

    private String title;
    private String description;
    private String type;
    private LocalDateTime createdAt;
}
