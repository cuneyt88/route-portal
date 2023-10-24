package com.cs.routeportal.exception;

public class CustomerNotFoundException extends BaseRuntimeException {

    public CustomerNotFoundException(String email) {
        super(formatMessage(email));
    }

    private static String formatMessage(String email) {
        return String.format("Customer email not found: %s", email);
    }
}
