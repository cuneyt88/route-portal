package com.cs.routeportal.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticDto {

    private Long totalOrderCount;
    private Long totalBookCount;
    private BigDecimal totalAmount;
}
