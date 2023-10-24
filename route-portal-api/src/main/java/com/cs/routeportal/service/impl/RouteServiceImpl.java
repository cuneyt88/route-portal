package com.cs.routeportal.service.impl;

import com.cs.routeportal.service.RouteService;
import com.cs.routeportal.dto.route.AddRouteDto;
import com.cs.routeportal.dto.route.UpdateRouteDto;
import com.cs.routeportal.exception.RouteAlreadyExistException;
import com.cs.routeportal.exception.RouteNotFoundException;
import com.cs.routeportal.model.Route;
import com.cs.routeportal.repository.RouteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    @Transactional
    @Override
    public Route addRoute( AddRouteDto addRouteDto ) throws RouteAlreadyExistException {
        Optional<Route> optionalRoute = routeRepository.findRouteByName(addRouteDto.getName());
        if (optionalRoute.isPresent())
            throw new RouteAlreadyExistException(optionalRoute.get());
        Route route = new Route();
        BeanUtils.copyProperties(addRouteDto, route);

        return routeRepository.save(route);
    }

    @Transactional
    @Override
    public Route updateRoute( UpdateRouteDto updateRouteDto ) {
        Optional<Route> optionalRoute = routeRepository.findById(updateRouteDto.getRouteId());

        if (optionalRoute.isEmpty())
            throw new RouteNotFoundException(updateRouteDto.getRouteId());

        Route route = optionalRoute.get();
        route.setKml(updateRouteDto.getKml());

        return routeRepository.save(route);
    }


    @Transactional
    @Override
    public Route findRouteByRouteId(String routeId ) {
        return routeRepository
                .findById(routeId)
                .orElseThrow(() -> new RuntimeException(String.format("Invalid route id: %s", routeId)));
    }

    public List<Route> findAllRoute( ) {
        return routeRepository
                .findAll();
    }
}
