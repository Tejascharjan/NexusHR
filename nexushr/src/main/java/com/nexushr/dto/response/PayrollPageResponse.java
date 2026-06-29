package com.nexushr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayrollPageResponse {

    private List<PayrollResponse> payrolls;
    private PayrollStatisticsResponse statistics;
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;
}
