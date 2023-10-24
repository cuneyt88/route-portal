package com.cs.routeportal.repository;

import com.cs.routeportal.model.Route;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {

    Optional<Route> findRouteByName(String name);

}
