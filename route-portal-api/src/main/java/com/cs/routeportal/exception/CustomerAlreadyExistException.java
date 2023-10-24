package com.cs.routeportal.exception;

import com.cs.routeportal.model.Customer;

public class CustomerAlreadyExistException extends BaseException{
    public CustomerAlreadyExistException(Customer customer) {
        super(formatMessage(customer));
    }

    private static String formatMessage(Customer customer){
        return String.format("%s email adresss already exist.",customer.getEmail());
    }


}
