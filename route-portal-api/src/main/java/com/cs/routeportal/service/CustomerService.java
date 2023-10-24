package com.cs.routeportal.service;

import com.cs.routeportal.dto.customer.AddCustomerDto;
import com.cs.routeportal.exception.CustomerAlreadyExistException;
import com.cs.routeportal.model.Customer;

public interface CustomerService {

    Customer addCustomer(AddCustomerDto addCustomerDto) throws CustomerAlreadyExistException;

    Customer findCustomerByMail(String mail);

    Customer findCustomerByCustomerId(String customerId);

}
