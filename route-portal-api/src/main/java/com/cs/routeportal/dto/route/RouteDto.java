package com.cs.routeportal.dto.route;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteDto {

    private String routeId;
    private String kml;
    private String createdBy;
    private LocalDate createdDate;
}
