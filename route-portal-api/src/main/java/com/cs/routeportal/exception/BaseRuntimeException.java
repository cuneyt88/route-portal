package com.cs.routeportal.exception;

public class BaseRuntimeException extends RuntimeException {

    public BaseRuntimeException(String message) {
        super(message);
    }

    public BaseRuntimeException(String message, Exception ex) {
        super(message, ex);
    }
}
