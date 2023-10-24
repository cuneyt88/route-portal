package com.cs.routeportal.exception;

public class RouteNotFoundException extends BaseRuntimeException{
    public RouteNotFoundException(String bookName) {
        super(bookName);
    }
    private static String formatMessage(String bookName) {
        return String.format("Book not found: %s", bookName);
    }

}
