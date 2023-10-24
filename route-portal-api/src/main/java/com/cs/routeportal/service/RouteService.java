package com.cs.routeportal.service;

import com.cs.routeportal.dto.route.AddRouteDto;
import com.cs.routeportal.dto.route.UpdateRouteDto;
import com.cs.routeportal.exception.RouteAlreadyExistException;
import com.cs.routeportal.model.Route;

import java.util.List;

public interface RouteService {

    Route addRoute( AddRouteDto addRouteDto ) throws RouteAlreadyExistException;

    Route updateRoute( UpdateRouteDto updateRouteDto);

    Route findRouteByRouteId(String routeId);

    List<Route> findAllRoute();
}
