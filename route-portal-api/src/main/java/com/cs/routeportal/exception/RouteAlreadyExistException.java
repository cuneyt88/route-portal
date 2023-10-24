package com.cs.routeportal.exception;

import com.cs.routeportal.model.Route;

public class RouteAlreadyExistException extends BaseException{
    public RouteAlreadyExistException( Route route ) {
        super(formatMessage(route));
    }

    private static String formatMessage( Route route ){
        return String.format("%s route already exist.", route.getRouteId());
    }


}