package com.cs.routeportal.dto.route;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
public class UpdateRouteDto {
    @NotEmpty(message = "routeId may not be empty")
    private String routeId;

    @NotEmpty(message = "KML may not be empty")
    private String kml;



}
