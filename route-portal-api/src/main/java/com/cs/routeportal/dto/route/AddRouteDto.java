package com.cs.routeportal.dto.route;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddRouteDto {

    @NotEmpty(message="kml name may not be empty")
    private String kml;
    private String name;
}
