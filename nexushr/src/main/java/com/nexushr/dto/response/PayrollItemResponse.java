package com.nexushr.dto.response;

import lombok.Data;

@Data
public class PayrollItemResponse {

    private String itemName;
    private String itemType;
    private Double amount;
}
