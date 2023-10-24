package com.cs.routeportal.controller;

import com.cs.routeportal.exception.RouteAlreadyExistException;
import com.cs.routeportal.model.Property;
import com.cs.routeportal.service.RouteService;
import com.cs.routeportal.dto.route.AddRouteDto;
import com.cs.routeportal.dto.route.RouteDto;
import com.cs.routeportal.dto.route.UpdateRouteDto;
import com.cs.routeportal.model.Route;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/routes")
public class RouteController {

    private final RouteService routeService;

    @GetMapping("/get")
    public ResponseEntity<List<Route>> getAllRoute() {
        List<Route> routeList = routeService.findAllRoute();
        return ResponseEntity.ok(routeList);
    }

    @GetMapping("/getKMLByRoute")
    public ResponseEntity<String> getKMLByRoute(String routeId) {
        Route route = routeService.findRouteByRouteId(routeId);
        return ResponseEntity.ok(route.getKml());
    }

    @GetMapping("/getKMLByRouteProperty")
    public ResponseEntity<List<Route>> getKMLByRouteProperty( Property property ) {
        List<Route> routeList = routeService.findAllRoute();
       // Route route = routeService.findRouteByRouteId(routeId);
        return ResponseEntity.ok(null);
    }


    @PostMapping("/add")
    public ResponseEntity<RouteDto> addRoute(@RequestPart("file") MultipartFile file, String name )
            throws RouteAlreadyExistException, IOException {

        Route route = routeService.addRoute(new AddRouteDto(new String(file.getBytes()),name));
        RouteDto routeDto = new RouteDto();
        BeanUtils.copyProperties(route, routeDto);
        return ResponseEntity.ok(routeDto);
    }

    @PutMapping("/update")
    public ResponseEntity<RouteDto> updateRoute(@Valid @RequestBody UpdateRouteDto updateRouteDto ) {
        Route route = routeService.updateRoute(updateRouteDto);
        RouteDto routeDto = new RouteDto();
        BeanUtils.copyProperties(route, routeDto);
        return ResponseEntity.ok(routeDto);
    }
}
